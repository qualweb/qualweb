import { QWElement } from '@qualweb/qw-element';

class QWPage {

  private readonly document: Document;
  private readonly window: Window;

  private defaultWidth: number;
  private defaultHeight: number;

  private elementsCSSRules?: Map<Element, any>;

  constructor(document: Document, window: Window, addCSSRulesToElements?: boolean) {
    this.document = document;
    this.window = window;

    this.defaultWidth = this.window.innerWidth;
    this.defaultHeight = this.window.innerHeight;

    if (!!addCSSRulesToElements) {
      this.elementsCSSRules = new Map<Element, any>();

      this.mapExternalStylesheets();
      this.mapHeadStyles();
      this.mapInlineStyles();
    }
  }

  private mapExternalStylesheets(): void {
    for (const stylesheet of this.document.styleSheets || []) {
      const rules = stylesheet.rules || stylesheet.cssRules;
      for (const rule of rules || []) {
        const selector = rule['selectorText'];
        if (!!selector) {
          const properties = rule.cssText.replace(selector, '').replace('{', '').replace('}', '').trim().split(';').map(p => p.trim()).filter(p => p !== '');
          const elements = this.document.querySelectorAll(selector);
          for (const element of elements || []) {
            if (this.elementsCSSRules?.has(element)) {
              this.addElementCSSRules(element, properties, 'file', stylesheet.href || '');
            } else {
              this.createElementCSSMapping(element, properties, 'file', stylesheet.href || '');
            }
          }
        }
      }
    }
  }

  private mapHeadStyles(): void {
    const styles = this.document.querySelectorAll('style');
    for (const style of styles || []) {
      const rules = style.sheet?.rules || style.sheet?.cssRules;
      for (const rule of rules || []) {
        const selector = rule['selectorText'];
        if (!!selector) {
          const properties = rule.cssText.replace(selector, '').replace('{', '').replace('}', '').trim().split(';').map(p => p.trim()).filter(p => p !== '');
          const elements = this.document.querySelectorAll(selector);
          for (const element of elements || []) {
            if (this.elementsCSSRules?.has(element)) {
              this.addElementCSSRules(element, properties, 'head', new QWElement(style).getElementSelector() || '');
            } else {
              this.createElementCSSMapping(element, properties, 'head', new QWElement(style).getElementSelector() || '');
            }
          }
        }
      }
    }
  }

  private mapInlineStyles(): void {
    const elements = this.document.querySelectorAll('[style]');
    for (const element of elements || []) {
      const style = element.getAttribute('style');
      if (style) {
        const properties = style?.split(';').map(p => p.trim()).filter(p => p !== '') || [style.trim()];
        if (this.elementsCSSRules?.has(element)) {
          this.addElementCSSRules(element, properties, 'inline', new QWElement(element).getElementSelector() || '');
        } else {
          this.createElementCSSMapping(element, properties, 'inline', new QWElement(element).getElementSelector() || '');
        }
      }
    }
  }

  private createElementCSSMapping(element: Element, properties: string[], location: 'file' | 'head' | 'inline', pointer: string): void {
    const cssProperties = {};
    for (const property of properties || []) {
      const propertyName = property.split(':')[0].trim();
      cssProperties[propertyName] = this.createPropertyObject(property, location, pointer);
    }
    this.elementsCSSRules?.set(element, cssProperties);
  }

  private addElementCSSRules(element: Element, properties: string[], location: 'file' | 'head' | 'inline', pointer: string): void {
    const cssProperties = this.elementsCSSRules?.get(element);

    for (const property of properties || []) {
      const propertyName = property.split(':')[0].trim();
      if (cssProperties[property] === undefined) {
        cssProperties[propertyName] = this.createPropertyObject(property, location, pointer);
      } else {
        if (!cssProperties[propertyName].important) {
          cssProperties[propertyName] = this.createPropertyObject(property, location, pointer);
        } else if (property.includes('!important')) {
          cssProperties[propertyName] = this.createPropertyObject(property, location, pointer);
        }
      }
    }

    this.elementsCSSRules?.set(element, cssProperties);
  }

  private createPropertyObject(property: string, location: string, pointer: string): any {
    const hasImportant = property.includes('!important');
    const split = property.split(':');
    const propertyName = split[0].trim();
    const propertyValue = hasImportant ? split[1].replace('!important', '').trim() : split[1].trim();

    return {
      important: hasImportant,
      name: propertyName,
      value: propertyValue,
      location,
      pointer
    };
  }

  private addCSSRulesPropertyToElement(element: Element | null): void {
    if (element && this.elementsCSSRules?.has(element)) {
      element.setAttribute('_cssRules', JSON.stringify(this.elementsCSSRules?.get(element)));
    }
  }

  public getURL(): string {
    return this.document.URL;
  }

  public getElement(selector: string): QWElement | null {
    const element = this.document.querySelector(selector);
    this.addCSSRulesPropertyToElement(element);
    return element ? new QWElement(element) : null;
  }

  public getElements(selector: string): Array<QWElement> {
    const elements = this.document.querySelectorAll(selector);
    const qwList: Array<QWElement> = [];

    for (const element of elements || []) {
      this.addCSSRulesPropertyToElement(element);
      qwList.push(new QWElement(element));
    }

    return qwList;
  }

  public getElementByID(id: string, elementQW: QWElement): QWElement | null {
    const treeSelector = elementQW.getTreeSelector();
    const element = this.document.querySelector(`#${id}` + treeSelector);
    this.addCSSRulesPropertyToElement(element);
    return element ? new QWElement(element) : null;
  }

  public getElementByAttributeName(name: string): QWElement | null {
    const element = this.document.querySelector(`[name="${name}"]`);
    this.addCSSRulesPropertyToElement(element);
    return element ? new QWElement(element) : null;
  }

  public processShadowDom(): void {
    const listElements = this.document.querySelectorAll('*');
    let shadowCounter = 0;

    for (const element of listElements || []) {
      if (element.shadowRoot !== null) {
        element.innerHTML = element.shadowRoot.innerHTML;
        const elementsFromShadowDom = element.querySelectorAll('*');
        this.setShadowAttribute(elementsFromShadowDom, shadowCounter);
        shadowCounter++;
      }
    }
  }

  private setShadowAttribute(elements: NodeListOf<Element>, counter: number): void {
    for (const element of elements || []) {
      element.setAttribute('shadowTree', counter + '');
    }
  }
  
  public getPageRootElement(): QWElement | null {
    const documentElement = this.document.documentElement;
    this.addCSSRulesPropertyToElement(documentElement);
    return documentElement ? new QWElement(documentElement) : null;
  }

  public getHTMLContent(): string {
    return this.document.documentElement.outerHTML;
  }

  public getFocusedElement(): QWElement | null {
    const activeElement = this.document.activeElement;
    this.addCSSRulesPropertyToElement(activeElement);
    return activeElement ? new QWElement(activeElement) : null
  }

  public changeToDefaultViewport(): void {
    this.window.resizeTo(this.defaultWidth, this.defaultHeight);
  }

  public changeViewport(width: number, height: number): void {
    this.window.resizeTo(width, height);
  }
}
export { QWPage };
