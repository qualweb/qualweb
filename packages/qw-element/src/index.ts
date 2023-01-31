import {
  CSSProperties,
  CSSProperty,
  MediaProperty,
  MediaProperties,
  PseudoSelectorProperty
} from '@qualweb/qw-element';

class QWElement {
  private readonly element: Element;
  private readonly elementsCSSRules?: Map<Element, CSSProperties>;
  private selector: string;

  constructor(element: Element, elementsCSSRules?: Map<Element, CSSProperties>) {
    this.element = element;
    this.elementsCSSRules = elementsCSSRules;
    this.selector = '';
    const selector = element.getAttribute('_selector');
    if (selector) {
      this.selector = selector;
    }
  }

  private addCSSRulesPropertyToElement(element: Element | null): void {
    if (element && this.elementsCSSRules?.has(element)) {
      element.setAttribute('_cssRules', 'true');
    }
  }

  public hasCSSRules(): boolean {
    return this.element.getAttribute('_cssRules') === 'true';
  }

  public getCSSRules(): CSSProperties | undefined {
    return this.elementsCSSRules?.get(this.element);
  }

  public hasCSSProperty(property: string, pseudoStyle?: string, media?: string): boolean {
    if (this.elementsCSSRules?.has(this.element)) {
      const rules = this.elementsCSSRules?.get(this.element);

      if (rules) {
        if (pseudoStyle && media) {
          return (
            (<PseudoSelectorProperty>(<MediaProperty>(<MediaProperties>rules.media)[media])[pseudoStyle])[property] !==
            undefined
          );
        } else if (pseudoStyle) {
          return (<PseudoSelectorProperty>rules[pseudoStyle])[property] !== undefined;
        } else if (media) {
          return <CSSProperty>(<MediaProperty>(<MediaProperties>rules.media)[media])[property] !== undefined;
        }
      }

      return !rules || rules[property] !== undefined;
    }

    return false;
  }

  public getCSSProperty(property: string, pseudoStyle?: string, media?: string): CSSProperty | undefined {
    if (this.elementsCSSRules?.has(this.element)) {
      const rules = this.elementsCSSRules?.get(this.element);

      if (rules) {
        if (pseudoStyle && media) {
          return (<PseudoSelectorProperty>(<MediaProperty>(<MediaProperties>rules.media)[media])[pseudoStyle])[
            property
          ];
        } else if (pseudoStyle) {
          return (<PseudoSelectorProperty>rules[pseudoStyle])[property];
        } else if (media) {
          return <CSSProperty>(<MediaProperty>(<MediaProperties>rules.media)[media])[property];
        } else {
          return <CSSProperty>rules[property];
        }
      }
    }

    return undefined;
  }

  public getCSSMediaRules(): MediaProperty | undefined {
    if (this.elementsCSSRules?.has(this.element)) {
      const rules = this.elementsCSSRules?.get(this.element);
      if (rules) {
        return <MediaProperty>rules['media'];
      }
    }

    return undefined;
  }

  public getCSSPseudoSelectorRules(pseudoSelector: string): PseudoSelectorProperty | undefined {
    if (this.elementsCSSRules?.has(this.element)) {
      const rules = this.elementsCSSRules?.get(this.element);
      if (rules) {
        return <PseudoSelectorProperty>rules[pseudoSelector];
      }
    }

    return undefined;
  }

  public elementHasAttribute(attribute: string): boolean {
    return this.element.getAttributeNames().includes(attribute);
  }

  public elementHasAttributes(): boolean {
    return this.element.getAttributeNames().length > 0;
  }

  public elementHasChild(childName: string): boolean {
    const children = this.element.children;
    for (let i = 0; i < children.length; i++) {
      const child = children.item(i);
      if (child) {
        if (child.tagName.toLowerCase() === childName.toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }

  public elementHasChildren(): boolean {
    return this.element.children.length > 0;
  }

  public elementHasParent(parent: string): boolean {
    const parentElement = this.element.parentElement;
    return parentElement ? parentElement.tagName.toLowerCase() === parent.toLowerCase() : false;
  }

  public hasTextNode(): boolean {
    let hasText = false;
    this.element.childNodes.forEach((child: ChildNode) => {
      if (child.nodeType === 3 && child.textContent?.trim() !== '') {
        hasText = true;
      }
    });
    return hasText;
  }

  public getElementAttribute(attribute: string): string | null {
    return this.element.getAttribute(attribute);
  }

  public getElementAttributes(): { [attr: string]: string } {
    const attributes: { [attr: string]: string } = {};
    for (const attr of this.element.getAttributeNames() ?? []) {
      const value = this.element.getAttribute(attr);
      if (value) {
        attributes[attr] = value;
      }
    }
    return attributes;
  }

  public getElementAttributesName(): Array<string> {
    return this.element.getAttributeNames();
  }

  public getElementChildren(): Array<QWElement> {
    const qwList = new Array<QWElement>();
    const children = this.element.children;
    for (let i = 0; i < children.length; i++) {
      const child = children.item(i);
      if (child) {
        this.addCSSRulesPropertyToElement(child);
        qwList.push(new QWElement(child, this.elementsCSSRules));
      }
    }
    return qwList;
  }

  public getElementChildTextContent(childName: string): string | undefined {
    const children = this.element.children;
    for (let i = 0; i < children.length; i++) {
      const child = children.item(i);
      if (child) {
        if (child.tagName.toLowerCase() === childName.toLowerCase()) {
          return child.textContent ?? undefined;
        }
      }
    }
    return undefined;
  }

  public getElementHtmlCode(withText: boolean, fullElement: boolean): string {
    const cssRules = this.element.getAttribute('_cssRules');
    const selector = this.element.getAttribute('_selector');
    const documentSelector = this.element.getAttribute('_documentSelector');
    this.element.removeAttribute('_cssRules');
    this.element.removeAttribute('_selector');
    this.element.removeAttribute('_documentSelector');

    let result;
    if (fullElement) {
      const children = this.element.children;
      const attributeArray = new Array<{ [attr: string]: string | null }>();
      for (let i = 0; i < children.length; i++) {
        const child = children.item(i);
        if (child) {
          const cssRulesValue = child.getAttribute('_cssRules');
          const selectorValue = child.getAttribute('_selector');
          const documentSelectorValue = child.getAttribute('_documentSelector');

          attributeArray.push({
            cssRulesValue,
            selectorValue,
            documentSelectorValue
          });
          child.removeAttribute('_cssRules');
          child.removeAttribute('_selector');
          child.removeAttribute('_documentSelector');
        }
      }

      result = this.element.outerHTML;

      for (let i = 0; i < children.length; i++) {
        const child = children.item(i);
        if (child) {
          const attributes = attributeArray[i];
          if (attributes.cssRulesValue) {
            child.setAttribute('_cssRules', attributes.cssRulesValue);
          }
          if (attributes.selectorValue) {
            child.setAttribute('_selector', attributes.selectorValue);
          }
          if (attributes.documentSelectorValue) {
            child.setAttribute('_documentSelector', attributes.documentSelectorValue);
          }
        }
      }
    } else if (withText) {
      const clonedElem = <Element>this.element.cloneNode(false);
      const text = this.getElementText();
      clonedElem.innerHTML = text !== undefined ? text : '';
      result = clonedElem.outerHTML;
    } else {
      const clonedElem = <Element>this.element.cloneNode(false);
      clonedElem.innerHTML = '';
      result = clonedElem.outerHTML;
    }
    if (cssRules) {
      this.element.setAttribute('_cssRules', cssRules);
    }
    if (selector) {
      this.element.setAttribute('_selector', selector);
    }
    if (documentSelector) {
      this.element.setAttribute('_documentSelector', documentSelector);
    }
    return result;
  }

  public getElement(selector: string): QWElement | null {
    const element = this.element.querySelector(selector);
    this.addCSSRulesPropertyToElement(element);
    return this.convertElementToQWElement(element);
  }

  private convertElementToQWElement(element: Element | null): QWElement | null {
    if (element) {
      this.addCSSRulesPropertyToElement(element);
      return new QWElement(element, this.elementsCSSRules);
    } else {
      return null;
    }
  }

  private convertElementsToQWElement(elements: NodeListOf<Element> | null): Array<QWElement> {
    const qwList = new Array<QWElement>();
    elements?.forEach((element: Element) => {
      this.addCSSRulesPropertyToElement(element);
      qwList.push(new QWElement(element, this.elementsCSSRules));
    });
    return qwList;
  }

  public getElements(selector: string): Array<QWElement> {
    return this.convertElementsToQWElement(this.element.querySelectorAll(selector));
  }

  public getElementNextSibling(): QWElement | null {
    return this.convertElementToQWElement(this.element.nextElementSibling);
  }

  public getAllPreviousSiblings(): Array<QWElement | string> {
    const siblings = new Array<QWElement | string>();

    let sibling = this.element.previousSibling;
    while (sibling !== null) {
      if (sibling.nodeType === 1) {
        const qwSibling = this.convertElementToQWElement(<Element>sibling);
        if (qwSibling) {
          siblings.unshift(qwSibling);
        }
      } else if (sibling.nodeType === 3 && sibling.textContent) {
        siblings.unshift(sibling.textContent);
      }

      sibling = sibling.previousSibling;
    }

    return siblings;
  }

  public getAllNextSiblings(): Array<QWElement | string> {
    const siblings = new Array<QWElement | string>();

    let sibling = this.element.nextSibling;
    while (sibling !== null) {
      if (sibling.nodeType === 1) {
        const qwSibling = this.convertElementToQWElement(<Element>sibling);
        if (qwSibling) {
          siblings.push(qwSibling);
        }
      } else if (sibling.nodeType === 3 && sibling.textContent) {
        siblings.push(sibling.textContent);
      }

      sibling = sibling.nextSibling;
    }

    return siblings;
  }

  public getPreviousSibling(): QWElement | string | null {
    const sibling = this.element.previousSibling;
    if (sibling) {
      if (sibling.nodeType === 1) {
        return this.convertElementToQWElement(<Element>sibling);
      } else if (sibling.nodeType === 3) {
        return sibling.textContent;
      } else {
        let siblingNode = sibling.previousSibling;
        let previousSibling = null;
        while (siblingNode !== null) {
          if (siblingNode.nodeType === 1) {
            previousSibling = this.convertElementToQWElement(<Element>siblingNode);
            break;
          } else if (siblingNode.nodeType === 3) {
            previousSibling = siblingNode.textContent;
          }
          siblingNode = siblingNode.previousSibling;
        }
        return previousSibling;
      }
    }
    return null;
  }

  public getNextSibling(): QWElement | string | null {
    const sibling = this.element.nextSibling;
    if (sibling) {
      if (sibling.nodeType === 1) {
        return this.convertElementToQWElement(<Element>sibling);
      } else if (sibling.nodeType === 3) {
        return sibling.textContent;
      } else {
        let siblingNode = sibling.nextSibling;
        let nextSibling = null;
        while (siblingNode !== null) {
          if (siblingNode.nodeType === 1) {
            nextSibling = this.convertElementToQWElement(<Element>siblingNode);
            break;
          } else if (siblingNode.nodeType === 3) {
            nextSibling = siblingNode.textContent;
          }
          siblingNode = siblingNode.nextSibling;
        }
        return nextSibling;
      }
    }
    return null;
  }

  public getElementParent(): QWElement | null {
    return this.convertElementToQWElement(this.element.parentElement);
  }
  public getParentAllContexts(): QWElement | null {
    let parent = this.element.parentElement;
    if (!parent) {
      const context = this.element.getAttribute('_documentSelector');
      if (context) {
        parent = document.querySelector(context);
      }
    }
    return this.convertElementToQWElement(this.element.parentElement);
  }

  public getElementPreviousSibling(): QWElement | null {
    return this.convertElementToQWElement(this.element.previousElementSibling);
  }

  public getElementProperty(property: string): string {
    //@ts-ignore
    const propertyValue = this.element[property];
    return propertyValue === null ? '' : propertyValue;
  }

  public getElementSelector(): string {
    if (this.selector === '') {
      if (this.element.tagName.toLowerCase() === 'html') {
        return 'html';
      } else if (this.element.tagName.toLowerCase() === 'head') {
        return 'html > head';
      } else if (this.element.tagName.toLowerCase() === 'body') {
        return 'html > body';
      }
      let selector = '';
      const parents = new Array<string>();
      let parent = this.element.parentElement;
      while (parent) {
        parents.unshift(this.getSelfLocationInParent(parent));
        parent = parent['parentElement'];
      }
      if (parents.length > 0) {
        selector += parents.join(' > ');
        selector += ' > ' + this.getSelfLocationInParent(this.element);
      } else {
        selector += this.getSelfLocationInParent(this.element);
      }

      const documentSelector = this.element.getAttribute('_documentSelector');
      if (documentSelector) {
        selector = documentSelector + selector;
      }
      this.selector = selector;
      return selector;
    } else {
      return this.selector;
    }
  }

  private getSelfLocationInParent(element: Element): string {
    let selector = '';

    if (element.tagName.toLowerCase() === 'body' || element.tagName.toLowerCase() === 'head') {
      return element.tagName.toLowerCase();
    }

    let sameEleCount = 0;

    let prev = element.previousElementSibling;
    while (prev) {
      if (prev.tagName.toLowerCase() === element.tagName.toLowerCase()) {
        sameEleCount++;
      }
      prev = prev.previousElementSibling;
    }

    selector += `${element.tagName.toLowerCase()}:nth-of-type(${sameEleCount + 1})`;

    return selector;
  }

  public getElementStyleProperty(property: string, pseudoStyle: string | null): string {
    const styles = getComputedStyle(this.element, pseudoStyle);
    return styles.getPropertyValue(property);
  }

  public getElementTagName(): string {
    return this.element.tagName.toLowerCase();
  }

  public getElementText(): string {
    if (this.element.shadowRoot) {
      return this.element.shadowRoot.textContent ?? '';
    } else {
      return this.element.textContent ?? '';
    }

    /*let children;
    if (this.element.shadowRoot) {
      children = this.element.shadowRoot.childNodes;
    } else {
      children = this.element.childNodes;
    }

    let result = '';
    let textContent: string | null;
    children.forEach((child: ChildNode) => {
      textContent = child.textContent;
      if (child.nodeType === 3 && !!textContent && textContent?.trim() !== '') {
        result = result + textContent.trim();
      }
    });

    if (!result) {
      result = '';
    }

    return result;*/
  }

  public getElementOwnText(): string {
    let children;
    if (this.element.shadowRoot) {
      children = this.element.shadowRoot.childNodes;
    } else {
      children = this.element.childNodes;
    }

    let result = '';
    let textContent: string | null;
    children.forEach((child: ChildNode) => {
      textContent = child.textContent;
      if (child.nodeType === 3 && textContent && textContent.trim() !== '') {
        result += textContent.trim();
      }
    });

    return result;
  }

  public getElementType(): string {
    return this.element.nodeType === 1
      ? 'tag'
      : this.element.nodeType === 2
      ? 'attribute'
      : this.element.nodeType === 3
      ? 'text'
      : 'comment';
  }

  public getNumberOfSiblingsWithTheSameTag(): number {
    let aCount = 1;
    let nextSibling = this.element.nextElementSibling;

    while (nextSibling) {
      if (nextSibling.tagName.toLowerCase() === 'a') {
        aCount++;
      }
      nextSibling = nextSibling.nextElementSibling;
    }

    return aCount;
  }

  public setElementAttribute(attribute: string, value: string): void {
    this.element.setAttribute(attribute, value);
  }

  public concatANames(aNames: Array<string>): string {
    const children = this.element.childNodes;
    let result = '';
    let textContent: string | null;
    let i = 0;
    let counter = 0;
    children.forEach((child: ChildNode) => {
      textContent = child.textContent;
      if (child.nodeType === 3 && !!textContent && textContent.trim() !== '') {
        result = result + (counter === 0 ? '' : ' ') + textContent.trim();
        counter++;
      } else if (child.nodeType === 1) {
        result = result + (counter > 0 && !!aNames[i] ? ' ' : '') + aNames[i];
        i++;
      }
    });

    if (!result) {
      result = '';
    }

    return result;
  }

  public isOffScreen(): boolean {
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    const scrollWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientHeight
    );

    const bounding = this.element.getBoundingClientRect();
    const left = bounding.left;
    const right = bounding.right;
    const bottom = bounding.bottom;
    const top = bounding.top;

    const noParentScrollTop = this.noParentScrolled(bottom);

    return (
      left > scrollWidth ||
      right < 0 ||
      (bottom < 0 && noParentScrollTop) ||
      top > scrollHeight ||
      (right === 0 && left === 0)
    );
  }

  public isElementHTMLElement(): boolean {
    return this.element instanceof HTMLElement;
  }

  public getContentFrame(): Document | null {
    let page: Document | null = null;

    if (this.getElementTagName() === 'iframe') {
      const element = <HTMLIFrameElement>this.element;
      const contentWindow = element.contentWindow;

      if (contentWindow) {
        page = contentWindow.document;
      }
    }

    return page;
  }

  public elementHasTextNode(): boolean {
    let hasTextNode = false;
    if (this.element.childNodes !== null) {
      const children = this.element.childNodes;
      children.forEach((child: ChildNode) => {
        if (child.nodeType === 3 && child.textContent?.trim() !== '') {
          hasTextNode = true;
        }
      });
    }
    return hasTextNode;
  }

  private noParentScrolled(offset: number): boolean {
    let element = this.element.parentElement;
    while (element && element.nodeName.toLowerCase() !== 'html') {
      if (element.scrollTop) {
        offset += element.scrollTop;
        if (offset >= 0) {
          return false;
        }
      }
      element = element.parentElement;
    }
    return true;
  }

  public focusElement(): void {
    const htmlElement = <HTMLElement>this.element;
    htmlElement.focus();
  }

  public dispatchEvent(event: Event): void {
    const htmlElement = <HTMLElement>this.element;
    htmlElement.dispatchEvent(event);
  }

  public click(): void {
    const htmlElement = <HTMLElement>this.element;
    htmlElement.click();
  }

  public getBoundingBox(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  public getShadowElement(selector: string): QWElement | null {
    const shadowRoot = this.element.shadowRoot;
    let element: Element | null = null;
    if (shadowRoot) {
      element = shadowRoot.querySelector(selector);
    }
    return this.convertElementToQWElement(element);
  }

  public getShadowElements(selector: string): Array<QWElement> {
    const shadowRoot = this.element.shadowRoot;
    let elements: NodeListOf<Element> | null = null;
    if (shadowRoot) {
      elements = shadowRoot.querySelectorAll(selector);
    }
    return this.convertElementsToQWElement(elements);
  }
}

export { QWElement };
