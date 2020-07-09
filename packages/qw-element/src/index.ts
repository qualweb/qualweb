class QWElement {

  private readonly element: Element;
  private readonly elementsCSSRules?: Map<Element, any>;
  private selector: string;

  constructor(element: Element, elementsCSSRules?: Map<Element, any>) {
    this.element = element;
    this.elementsCSSRules = elementsCSSRules;
    this.selector = '';
  }

  private addCSSRulesPropertyToElement(element: Element | null): void {
    if (element && this.elementsCSSRules ?.has(element)) {
      element.setAttribute('_cssRules', 'true');
    }
  }

  public hasCSSRules(): boolean {
    return this.element.getAttribute('_cssRules') === 'true';
  }

  public getCSSRules(): any {
    return this.elementsCSSRules?.get(this.element);
  }

  public hasCSSProperty(property: string, pseudoStyle?: string, media?: string): boolean {
    if (this.elementsCSSRules?.has(this.element)) {
      const rules = this.elementsCSSRules?.get(this.element);

      if (pseudoStyle && media) {
        return rules['media'][media][pseudoStyle][property] !== undefined;
      } else if (pseudoStyle) {
        return rules[pseudoStyle][property] !== undefined;
      } else if (media) {
        return rules['media'][media][property] !== undefined;
      }

      return rules[property] !== undefined;
    }

    return false;
  }

  public getCSSProperty(property: string, pseudoStyle?: string, media?: string): any {
    if (this.elementsCSSRules?.has(this.element)) {
      const rules = this.elementsCSSRules?.get(this.element);

      if (pseudoStyle && media) {
        return rules['media'][media][pseudoStyle][property];
      } else if (pseudoStyle) {
        return rules[pseudoStyle][property];
      } else if (media) {
        return rules['media'][media][property];
      }

      return rules[property];
    }

    return undefined;
  }

  public getCSSMediaRules() : any {
    if (this.elementsCSSRules?.has(this.element)) {
      const rules = this.elementsCSSRules?.get(this.element);
      return rules['media'];
    }

    return undefined;
  }

  public getCSSPseudoSelectorRules(pseudoSelector: string): any {
    if (this.elementsCSSRules?.has(this.element)) {
      const rules = this.elementsCSSRules?.get(this.element);
      return rules[pseudoSelector];
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
    for (const child of this.element.children || []) {
      if (child.tagName.toLowerCase() === childName.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  public elementHasChildren(): boolean {
    return this.element.children.length > 0;
  }

  public elementHasParent(parent: string): boolean {
    const parentElement = this.element['parentElement'];
    return parentElement ? parentElement['tagName'].toLowerCase() === parent.toLowerCase() : false;
  }

  public hasTextNode(): boolean {
    let hasText = false;
    for (const child of this.element.childNodes || []) {
      if (child.nodeType === 3 && child.textContent?.trim() !== '') {
        hasText = true;
      }
    }
    return hasText;
  }

  public getElementAttribute(attribute: string): string | null {
    return this.element.getAttribute(attribute);
  }

  public getElementAttributes(): any {
    const attributes = {};
    for (const attr of this.element.getAttributeNames() || []) {
      attributes[attr] = this.element.getAttribute(attr);
    }
    return attributes;
  }

  public getElementAttributesName(): Array<string> {
    return this.element.getAttributeNames();
  }

  public getElementChildren(): Array<QWElement> {
    const selector = this.getElementSelector();
    const treeSelector = this.getTreeSelector();
    const elements = this.element.querySelectorAll(selector + ' > *' + treeSelector);
    const qwList = new Array<QWElement>();
    for (const element of elements) {
      this.addCSSRulesPropertyToElement(element);
      qwList.push(new QWElement(element));
    }
    return qwList;
  }

  public getTreeSelector(): string {
    const attribute = this.getElementAttribute('shadowTree');
    let result = ':not([shadowTree])';
    if (attribute !== null) {
      result = `[shadowTree='${attribute}']`
    }
    return result;
  }

  public getElementChildTextContent(childName: string): string | undefined {
    for (const child of this.element.children || []) {
      if (child.tagName.toLowerCase() === childName.toLowerCase()) {
        return child['textContent'] || undefined;
      }
    }
    return undefined;
  }

  public getElementHtmlCode(withText: boolean, fullElement: boolean): string {
    const clonedElem = <Element>this.element.cloneNode(true);
    clonedElem.removeAttribute('_cssRules');
    if (fullElement) {
      return clonedElem.outerHTML;
    } else if (withText) {
      const text = clonedElem['text'];
      clonedElem.innerHTML = text !== undefined ? text : '';
      return clonedElem.outerHTML;
    } else {
      clonedElem.innerHTML = '';
      return clonedElem.outerHTML;
    }
  }

  public getElement(selector: string): QWElement | null {
    const element = this.element.querySelector(selector);
    this.addCSSRulesPropertyToElement(element);
    return this.convertElementToQWElement(element);
  }

  private convertElementToQWElement(element: Element | null): QWElement | null {
    if (element) {
      this.addCSSRulesPropertyToElement(element);
      return new QWElement(element);
    } else {
      return null;
    }
  }

  private convertElementsToQWElement(elements: NodeListOf<Element> | null): Array<QWElement> {
    const qwList = new Array<QWElement>();
    for (const element of elements || []) {
      this.addCSSRulesPropertyToElement(element);
      qwList.push(new QWElement(element));
    }
    return qwList;
  }

  public getElements(selector: string): Array<QWElement> {
    return this.convertElementsToQWElement(this.element.querySelectorAll(selector));
  }

  public getElementNextSibling(): QWElement | null {
    return this.convertElementToQWElement(this.element.nextElementSibling);
  }

  public getElementParent(): QWElement | null {
    return this.convertElementToQWElement(this.element.parentElement);
  }

  public getElementPreviousSibling(): QWElement | null {
    return this.convertElementToQWElement(this.element.previousElementSibling)
  }

  public getElementProperty(property: string): string {
    const propertyValue = this.element[property];
    return propertyValue === null ? '' : propertyValue;
  }

  public getElementSelector(): string {

    if (this.selector === "") {

      if (this.element.tagName.toLowerCase() === 'html') {
        return 'html';
      } else if (this.element.tagName.toLowerCase() === 'head') {
        return 'html > head';
      } else if (this.element.tagName.toLowerCase() === 'body') {
        return 'html > body';
      }

      let selector = 'html > ';
      const parents = new Array<string>();
      let parent = this.element.parentElement;

      while (parent && parent.tagName.toLowerCase() !== 'html') {
        parents.unshift(this.getSelfLocationInParent(parent));
        parent = parent['parentElement'];
      }

      selector += parents.join(' > ');
      selector += ' > ' + this.getSelfLocationInParent(this.element);
      this.selector = selector;
      return selector;
    }
    else {
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
    return this.element['tagName'].toLowerCase();
  }

  public getElementText(): string {
    return this.element.textContent || '';
  }

  public getElementType(): string {
    return this.element.nodeType === 1 ? 'tag' : this.element.nodeType === 2 ? 'attribute' : this.element.nodeType === 3 ? 'text' : 'comment';
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

  public concatANames(aNames: string[]): string {
    const children = this.element.childNodes;
    let result = '';
    let textContent: string | null;
    let i = 0;
    let counter = 0;
    for (const child of children || []) {
      textContent = child.textContent
      if (child.nodeType === 3 && !!textContent && textContent.trim() !== '') {
        result = result + (counter === 0 ? '' : ' ') + textContent.trim();
        counter++;
      } else if (child.nodeType === 1) {
        result = result + (counter > 0 && !!aNames[i] ? ' ' : '') + aNames[i];
        i++;
      }
    }

    if (!result) {
      result = '';
    }

    return result;
  }

  public isOffScreen(): boolean {
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    const scrollWidth = Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientHeight
    );

    const bounding = this.element.getBoundingClientRect();
    const left = bounding.left;
    const right = bounding.right;
    const bottom = bounding.bottom;
    const top = bounding.top;

    const noParentScrollTop = this.noParentScrolled(bottom);

    return left > scrollWidth || right < 0 || bottom < 0 && noParentScrollTop || top > scrollHeight || right === 0 && left === 0;
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
        page = contentWindow.document
      }
    }

    return page;
  }

  public elementHasTextNode(): boolean {
    if (this.element.firstChild !== null) {
      return this.element.firstChild.nodeType === 3;
    } else {
      return false;
    }
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

  public getBoundingBox(): any {
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

export {
  QWElement
};
