'use strict';

class QWElement {
  private element: Element;
  constructor(element: Element) {
    this.element = element;
  }
  public elementHasAttribute(attribute: string) {
    return this.element.getAttributeNames().includes(attribute);
  }
  public elementHasAttributes(): boolean {
    return this.element.getAttributeNames().length > 0;
  }
  public elementHasChild(childName: string): boolean {
    for (const child of this.element.children) {
      if (child.tagName.toLowerCase() === childName.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  public elementHasChidren(): boolean {
    return this.element.children.length > 0;
  }
  public elementHasParent(parent: string): boolean {
    const parentElement = this.element['parentElement'];
    return parentElement ? parentElement['tagName'].toLowerCase() === parent.toLowerCase() : false;
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
    let treeSelector = this.getTreeSelector();
    let elements = this.element.querySelectorAll(selector + ' > *' + treeSelector);
    let qwList: Array<QWElement> = [];
    for (let element of elements) {
      qwList.push(new QWElement(element));
    }
    return qwList;
  }
  public getTreeSelector(): string {
    let atribute = this.getElementAttribute("shadowTree");
    let result = ":not([shadowTree])";
    if (atribute !== null) {
      result = `[shadowTree="${atribute}"]`
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
    let element = this.element.querySelector(selector);

    return this.converElementToQWElement(element);
  }
  private converElementToQWElement(element: Element | null): QWElement | null {
    if (element)
      return new QWElement(element);
    else
      return null;
  }
  private converElementsToQWElement(elements: NodeListOf<Element>): Array<QWElement> {
    let qwList: Array<QWElement> = [];
    for (let element of elements) {
      qwList.push(new QWElement(element));
    }
    return qwList;
  }
  public getElements(selector: string): Array<QWElement> {
    return this.converElementsToQWElement(this.element.querySelectorAll(selector));
  }
  public getElementNextSibling(): QWElement | null {
    return this.converElementToQWElement(this.element.nextElementSibling);
  }
  public getElementParent(): QWElement | null {
    return this.converElementToQWElement(this.element.parentElement);
  }
  public getElementPreviousSibling(): QWElement | null {
    return this.converElementToQWElement(this.element.previousElementSibling)
  }
  public getElementProperty(property: string): string {
    let propertyValue = this.element[property];
    return propertyValue === null ? "" : propertyValue;
  }
  public getElementSelector(): string {

    if (this.element.tagName.toLowerCase() === 'html') {
      return 'html';
    } else if (this.element.tagName.toLowerCase() === 'head') {
      return 'html > head';
    } else if (this.element.tagName.toLowerCase() === 'body') {
      return 'html > body';
    }

    let selector = 'html > ';
    let parents = new Array<string>();
    let parent = this.element['parentElement'];
    while (parent && parent.tagName.toLowerCase() !== 'html') {
      parents.unshift(this.getSelfLocationInParent(parent));
      parent = parent['parentElement'];
    }

    selector += parents.join(' > ');
    selector += ' > ' + this.getSelfLocationInParent(this.element);

    return selector;

  }

  private getSelfLocationInParent(element) {
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
    let text = this.element.textContent;
    if (text === null)
      text = "";
    return text;

  }
  public getElementType(): string {
    return this.element['nodeType'] === 1 ? 'tag' : this.element['nodeType'] === 2 ? 'attribute' : this.element['nodeType'] === 3 ? 'text' : 'comment';

  }
  public getNumberOfSiblingsWithTheSameTag(): Number {
    let aCount = 1;
    let nextSibling = this.element['nextElementSibling'];
    while (nextSibling) {
      if (nextSibling['tagName'].toLowerCase() === 'a') {
        aCount++;
      }
      nextSibling = nextSibling['nextElementSibling'];
    }
    return aCount;

  }
  public setElementAttribute(attribute: string, value: string): void {
    this.element.setAttribute(attribute, value);
  }
}

export {
  QWElement
};
