import { QWElement } from '@qualweb/qw-element';

class QWPage {

  private document: Document;
  private window: Window;

  private defaultWidth: number;
  private defaultHeight: number;

  constructor(document: Document, window: Window) {
    this.document = document;
    this.window = window;

    this.defaultWidth = this.window.innerWidth;
    this.defaultHeight = this.window.innerHeight;
  }

  public getURL(): string {
    return this.document.URL;
  }

  public getElement(selector: string): QWElement | null {
    const element = this.document.querySelector(selector);
    return element ? new QWElement(element) : null;
  }

  public getElements(selector: string): Array<QWElement> {
    const elements = this.document.querySelectorAll(selector);
    const qwList: Array<QWElement> = [];

    for (const element of elements || []) {
      qwList.push(new QWElement(element));
    }

    return qwList;
  }

  public getElementByID(id: string, elementQW: QWElement): QWElement | null {
    const treeSelector = elementQW.getTreeSelector();
    const element = this.document.querySelector(`#${id}` + treeSelector);
    return element ? new QWElement(element) : null;
  }

  public getElementByAttributeName(name: string): QWElement | null {
    const element = this.document.querySelector(`[name="${name}"]`);
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
    return documentElement ? new QWElement(documentElement) : null;
  }

  public getHTMLContent(): string {
    return this.document.documentElement.outerHTML;
  }

  public getFocusedElement(): QWElement | null {
    const activeElement = this.document.activeElement;
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
