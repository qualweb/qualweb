import { QWElement } from '@qualweb/qw-element';

class QWPage {
  private document: Document;
  constructor(document: Document) {
    this.document = document;
  }

  public getURL(): string{
    return this.document.URL;
  }
  public getElement(selector: string): QWElement | null {

    let element = this.document.querySelector(selector)
    if (element)
      return new QWElement(element);
    else
      return null;
  }
  public getElements(selector: string): Array<QWElement> {
    let elements = this.document.querySelectorAll(selector)
    let qwList: Array<QWElement> = [];
    for (let element of elements) {
      qwList.push(new QWElement(element));
    }
    return qwList;

  }

  public getElementByID(id: string, elementQW: QWElement): QWElement | null {
    let treeSelector = elementQW.getTreeSelector();
    let element = this.document.querySelector(`#${id}` + treeSelector);
    if (element)
      return new QWElement(element);
    else
      return null;

  }
  public getElementByAttributeName(name: string): QWElement | null {
    let element = this.document.querySelector(`[name="${name}"]`);
    if (element)
      return new QWElement(element);
    else
      return null;

  }
  public processShadowDom(): void {


    let listElements = this.document.querySelectorAll("*") || new Array();
    let elementsFromShadowDom;
    let shadowCounter = 0;

    listElements.forEach(element => {
      if (element.shadowRoot !== null) {
        element.innerHTML = element.shadowRoot.innerHTML;
        elementsFromShadowDom = element.querySelectorAll("*");
        this.setShadowAttribute(elementsFromShadowDom, shadowCounter);
        shadowCounter++;
      }
    });
  }

  private setShadowAttribute(elements: NodeListOf<Element>, counter: number): void {
    for (const element of elements || []) {
      element.setAttribute("shadowTree", counter + "")
    }
  }
  public getPageRootElement(): QWElement | null {
    const documentElement = this.document.documentElement;
    return documentElement ? new QWElement(documentElement) : null;
  }

  public getHTMLContent(): string {
    return this.document.documentElement.outerHTML;
  }
  
}
export { QWPage };
