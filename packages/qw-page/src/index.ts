import { QWElement } from '@qualweb/qw-element';
import Cache from './cache.object';
import CSSMapper from './css.mapper';

class QWPage {

  private cache: Cache;
  private readonly document: Document;
  private readonly window: Window;

  private defaultWidth: number;
  private defaultHeight: number;

  private elementsCSSRules?: Map<Element, any>;

  constructor(document: Document, window: Window, addCSSRulesToElements?: boolean) {
    this.document = document;
    this.window = window;
    this.cache = new Cache();

    this.defaultWidth = this.window.innerWidth;
    this.defaultHeight = this.window.innerHeight;

    if (!!addCSSRulesToElements) {
      this.elementsCSSRules = new CSSMapper(this.document).map();
    }
  }

  private addCSSRulesPropertyToElement(element: Element | null): void {
    if (element && this.elementsCSSRules?.has(element)) {
      element.setAttribute('_cssRules', 'true');
    }
  }

  public cacheValue(selector: string, method: string, value: string|undefined): void {
    this.cache.put(selector + "," + method, value);
  }
  public getCachedValue(selector: string, method: string): string|undefined {
    return this.cache.get(selector + "," + method);
  }
  public isValueCached(selector: string, method: string): boolean {
    return  this.cache.exists(selector + "," + method);
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
