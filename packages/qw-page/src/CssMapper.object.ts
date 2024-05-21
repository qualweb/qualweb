import { CSSProperties, CSSProperty, PseudoSelectorProperty, QWElement } from '@packages/qw-element/src';

export class CSSMapper {
  private readonly pseudoSelectors = [
    'focus',
    'hover',
    'before',
    'after',
    'active',
    'disabled',
    'checked',
    'empty',
    'enabled',
    'in-range',
    'invalid',
    'lang',
    'link',
    'optional',
    'out-of-range',
    'read-only',
    'read-write',
    'required',
    'target',
    'valid',
    'visited',
    'first-letter',
    'first-line',
    'selection'
  ];
  private readonly document: Document | ShadowRoot;
  private readonly elementsCSSRules = new Map<Element, CSSProperties>();

  constructor(document: Document | ShadowRoot) {
    this.document = document;
  }

  public map(): Map<Element, CSSProperties> {
    this.mapExternalStylesheets();
    this.mapHeadStyles();
    this.mapInlineStyles();
    return this.elementsCSSRules;
  }

  private mapExternalStylesheets(): void {
    for (let i = 0; i < this.document.styleSheets.length; i++) {
      const stylesheet = this.document.styleSheets.item(i);
      if (stylesheet && (<CSSStyleSheet>stylesheet).ownerNode?.nodeName.toLowerCase() === 'link') {
        const rules = this.getCSSRules(stylesheet);
        if (rules) {
          for (let j = 0; j < rules.length; j++) {
            const rule = rules.item(j);
            if (rule?.type === 1) {
              this.mapNormalCSSRule(<CSSStyleRule>rule, undefined, 'file', stylesheet.href);
            } else if (rule?.type === 4) {
              this.mapMediaCSSRule(<CSSMediaRule>rule, 'file', stylesheet.href);
            }
          }
        }
      }
    }
  }

  private mapHeadStyles(): void {
    const styles = this.document.querySelectorAll('style');
    for (let i = 0; i < styles.length; i++) {
      const style = styles.item(i);
      const rules = this.getCSSRules(style.sheet);
      if (rules) {
        for (let j = 0; j < rules.length; j++) {
          const rule = rules.item(j);
          if (rule) {
            if (rule.type === 1) {
              this.mapNormalCSSRule(<CSSStyleRule>rule, undefined, 'head', new QWElement(style).getElementSelector());
            } else if (rule.type === 4) {
              this.mapMediaCSSRule(<CSSMediaRule>rule, 'head', new QWElement(style).getElementSelector());
            }
          }
        }
      }
    }
  }

  private mapInlineStyles(): void {
    const elements = this.document.querySelectorAll('[style]');
    for (let i = 0; i < elements.length; i++) {
      const element = elements.item(i);
      const style = element.getAttribute('style');
      if (style) {
        const properties = style
          .split(';')
          .map((p) => p.trim())
          .filter((p) => p !== '') || [style.trim()];
        if (this.elementsCSSRules.has(element)) {
          this.addElementCSSRules(
            element,
            properties,
            undefined,
            undefined,
            'inline',
            new QWElement(element).getElementSelector() || ''
          );
        } else {
          this.createElementCSSMapping(
            element,
            properties,
            undefined,
            undefined,
            'inline',
            new QWElement(element).getElementSelector() || ''
          );
        }
      }
    }
  }

  private mapMediaCSSRule(rule: CSSMediaRule, location: 'file' | 'head' | 'inline', pointer: string | null): void {
    const subRules = rule['cssRules'] || new CSSRuleList();
    for (let i = 0; i < subRules.length; i++) {
      const subRule = subRules.item(i);
      if (subRule?.type === 1) {
        this.mapNormalCSSRule(<CSSStyleRule>subRule, rule['conditionText'], location, pointer);
      }
    }
  }

  private mapNormalCSSRule(
    rule: CSSStyleRule,
    media: string | undefined,
    location: 'file' | 'head' | 'inline',
    pointer: string | null
  ): void {
    const selectorText = rule['selectorText'].trim();
    const properties = rule.cssText
      .replace(selectorText, '')
      .replace('{', '')
      .replace('}', '')
      .trim()
      .split(';')
      .map((p) => p.trim())
      .filter((p) => p !== '');
    const selectors = selectorText.split(',') || [selectorText];
    for (let selector of selectors || []) {
      let pseudoSelector: string | undefined;
      if (selector.includes('::')) {
        const split = selector.split('::');
        if (this.pseudoSelectors.includes(split[1])) {
          selector = split[0].trim();
          pseudoSelector = '::' + split[1].trim();
        }
      } else if (selector.includes(':')) {
        const split = selector.split(':');
        //TODO: fix pseudo selectors
        /*if (split[1].trim().includes(' ')) {
          selector = split[0].trim();
          const selectorAfterPseudo = split[1].substring(split[1].indexOf(' '), split[1].length - 1);
        } else if (this.pseudoSelectors.includes(split[1])) {
          selector = split[0].trim();
          pseudoSelector = ':' + split[1].trim();
        }*/
        selector = split[0].trim();
        pseudoSelector = ':' + split[1].trim();
      }
      const elements = this.getElements(selector);
      if (elements) {
        for (let i = 0; i < elements.length; i++) {
          const element = elements.item(i);
          if (this.elementsCSSRules.has(element)) {
            this.addElementCSSRules(element, properties, media, pseudoSelector, location, pointer || '');
          } else {
            this.createElementCSSMapping(element, properties, media, pseudoSelector, location, pointer || '');
          }
        }
      }
    }
  }

  private createElementCSSMapping(
    element: Element,
    properties: Array<string>,
    media: string | undefined,
    pseudoSelector: string | undefined,
    location: 'file' | 'head' | 'inline',
    pointer: string
  ): void {
    const cssProperties: CSSProperties = {
      media: {}
    };

    if (media) {
      cssProperties.media[media] = {};

      if (pseudoSelector) {
        cssProperties.media[media][pseudoSelector] = {};
      }
    }
    for (const property of properties || []) {
      const propertyName = property.split(':')[0].trim();
      if (media) {
        if (pseudoSelector) {
          (<PseudoSelectorProperty>cssProperties.media[media][pseudoSelector])[propertyName] =
            this.createPropertyObject(property, location, pointer);
        } else {
          cssProperties.media[media][propertyName] = this.createPropertyObject(property, location, pointer);
        }
      } else if (cssProperties[propertyName] === undefined) {
        cssProperties[propertyName] = this.createPropertyObject(property, location, pointer);
      } else {
        if (!cssProperties[propertyName].important || property.includes('!important')) {
          cssProperties[propertyName] = this.createPropertyObject(property, location, pointer);
        }
      }
    }
    this.elementsCSSRules.set(element, cssProperties);
  }

  private addElementCSSRules(
    element: Element,
    properties: string[],
    media: string | undefined,
    pseudoSelector: string | undefined,
    location: 'file' | 'head' | 'inline',
    pointer: string
  ): void {
    for (const property of properties || []) {
      const cssProperties = <CSSProperties>this.elementsCSSRules.get(element);
      const propertyName = property.split(':')[0].trim();
      if (media) {
        if (cssProperties.media === undefined) {
          cssProperties.media = {};
        }

        if (cssProperties.media[media] === undefined) {
          cssProperties.media[media] = {};

          if (pseudoSelector) {
            cssProperties.media[media][pseudoSelector] = {};
            (<PseudoSelectorProperty>cssProperties.media[media][pseudoSelector])[propertyName] =
              this.createPropertyObject(property, location, pointer);
          } else {
            cssProperties.media[media][propertyName] = this.createPropertyObject(property, location, pointer);
          }
        } else {
          if (pseudoSelector) {
            if (cssProperties.media[media][pseudoSelector] === undefined) {
              cssProperties.media[media][pseudoSelector] = {};
              (<PseudoSelectorProperty>cssProperties.media[media][pseudoSelector])[propertyName] =
                this.createPropertyObject(property, location, pointer);
            } else if (
              (<PseudoSelectorProperty>cssProperties.media[media][pseudoSelector])[propertyName] === undefined
            ) {
              (<PseudoSelectorProperty>cssProperties.media[media][pseudoSelector])[propertyName] =
                this.createPropertyObject(property, location, pointer);
            } else {
              if (!(<PseudoSelectorProperty>cssProperties.media[media][pseudoSelector])[propertyName].important) {
                (<PseudoSelectorProperty>cssProperties.media[media][pseudoSelector])[propertyName] =
                  this.createPropertyObject(property, location, pointer);
              } else if (property.includes('!important')) {
                (<PseudoSelectorProperty>cssProperties.media[media][pseudoSelector])[propertyName] =
                  this.createPropertyObject(property, location, pointer);
              }
            }
          } else if (cssProperties.media[media][propertyName] === undefined) {
            cssProperties.media[media][propertyName] = this.createPropertyObject(property, location, pointer);
          } else {
            if (!cssProperties.media[media][propertyName].important) {
              cssProperties.media[media][propertyName] = this.createPropertyObject(property, location, pointer);
            } else if (property.includes('!important')) {
              cssProperties.media[media][propertyName] = this.createPropertyObject(property, location, pointer);
            }
          }
        }
      } else if (pseudoSelector) {
        if (cssProperties[pseudoSelector] === undefined) {
          cssProperties[pseudoSelector] = {};
          (<PseudoSelectorProperty>cssProperties[pseudoSelector])[propertyName] = this.createPropertyObject(
            property,
            location,
            pointer
          );
        } else if ((<PseudoSelectorProperty>cssProperties[pseudoSelector])[propertyName] === undefined) {
          (<PseudoSelectorProperty>cssProperties[pseudoSelector])[propertyName] = this.createPropertyObject(
            property,
            location,
            pointer
          );
        } else {
          if (!(<PseudoSelectorProperty>cssProperties[pseudoSelector])[propertyName].important) {
            (<PseudoSelectorProperty>cssProperties[pseudoSelector])[propertyName] = this.createPropertyObject(
              property,
              location,
              pointer
            );
          } else if (property.includes('!important')) {
            (<PseudoSelectorProperty>cssProperties[pseudoSelector])[propertyName] = this.createPropertyObject(
              property,
              location,
              pointer
            );
          }
        }
      } else if (cssProperties[propertyName] === undefined) {
        cssProperties[propertyName] = this.createPropertyObject(property, location, pointer);
      } else {
        if (!cssProperties[propertyName].important) {
          cssProperties[propertyName] = this.createPropertyObject(property, location, pointer);
        } else if (property.includes('!important')) {
          cssProperties[propertyName] = this.createPropertyObject(property, location, pointer);
        }
      }
      this.elementsCSSRules.set(element, cssProperties);
    }
  }

  private createPropertyObject(property: string, location: string, pointer: string): CSSProperty {
    const hasImportant = property.includes('!important');
    const split = property.split(':');
    const propertyName = split[0].trim();
    const value = split.splice(1).join('');
    const propertyValue = hasImportant ? value.replace('!important', '').trim() : value.trim();

    return {
      important: hasImportant,
      name: propertyName,
      value: propertyValue,
      location,
      pointer
    };
  }

  private getCSSRules(sheet: CSSStyleSheet | null): CSSRuleList | null {
    try {
      return sheet?.rules || sheet?.cssRules || null;
    } catch (err) {
      return null;
    }
  }

  private getElements(selector: string): NodeListOf<Element> | null {
    try {
      return this.document.querySelectorAll(selector);
    } catch (err) {
      return null;
    }
  }
}
