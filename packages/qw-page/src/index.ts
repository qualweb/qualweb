import { CSSProperties, QWElement } from '@qualweb/qw-element';
import Cache from './cache.object';
import CSSMapper from './css.mapper';
import SelectorCalculator from './selectorCalculator.object';

class QWPage {
  private readonly cache: Cache;
  private readonly document: Document | ShadowRoot;
  private readonly url: string;
  private readonly extraDocuments: Map<string, QWPage>;
  private readonly elementsCSSRules?: Map<Element, CSSProperties>;

  constructor(document: Document | ShadowRoot, addCSSRulesToElements?: boolean) {
    this.document = document;
    this.cache = new Cache();
    this.extraDocuments = new Map<string, QWPage>();

    new SelectorCalculator(document).processElementSelector();

    if (addCSSRulesToElements) {
      this.elementsCSSRules = new CSSMapper(this.document).map();
    }
    this.url = this.document.baseURI;
    this.processIframes();
    this.processShadowDom();
  }

  public createQWElement(element: HTMLElement): QWElement {
    return new QWElement(element);
  }

  public processShadowDom(): void {
    const listElements = this.document.querySelectorAll('*');

    for (const element of listElements ?? []) {
      if (element.shadowRoot !== null) {
        element.innerHTML = '';
        const shadowRoot = new QWElement(element);
        const selector = shadowRoot.getElementSelector();
        const shadowPage = new QWPage(element.shadowRoot, true);
        this.extraDocuments.set(selector, shadowPage);
      }
    }
  }

  private processIframes(): void {
    const elements = this.document.querySelectorAll('iframe');

    for (const iframe of elements ?? []) {
      try {
        const iframeQW = new QWElement(iframe);
        const contentWindow = iframeQW.getContentFrame();
        const frame = contentWindow;
        if (frame && frame.defaultView) {
          const selector = iframeQW.getElementSelector();
          const iframePage = new QWPage(frame, true);
          this.extraDocuments.set(selector, iframePage);
        }
      } catch (e) {
        //console.log(e);
      }
    }
  }

  private addCSSRulesPropertyToElement(element: Element | null): void {
    if (element && this.elementsCSSRules?.has(element)) {
      element.setAttribute('_cssRules', 'true');
    }
  }

  private addIframeAttribute(elements: Array<QWElement>, selector: string): void {
    for (const element of elements) {
      element.setElementAttribute('_documentSelector', selector);
    }
  }

  public cacheValue(selector: string, method: string, value?: string): void {
    this.cache.put(selector + ',' + method, value);
  }

  public getCachedValue(selector: string, method: string): string | undefined {
    return this.cache.get(selector + ',' + method);
  }

  public isValueCached(selector: string, method: string): boolean {
    return this.cache.exists(selector + ',' + method);
  }

  public getURL(): string {
    return this.url;
  }

  private getElementFromDocument(selector: string): QWElement | null {
    const element = this.document.querySelector(selector);
    this.addCSSRulesPropertyToElement(element);
    return element ? new QWElement(element, this.elementsCSSRules) : null;
  }

  private getElementsFromDocument(selector: string): Array<QWElement> {
    const elements = this.document.querySelectorAll(selector);
    const qwList = new Array<QWElement>();

    elements.forEach((element: Element) => {
      this.addCSSRulesPropertyToElement(element);
      qwList.push(new QWElement(element, this.elementsCSSRules));
    });

    return qwList;
  }

  public getElement(selector: string, specificDocument?: QWElement, documentSelector?: string): QWElement | null {
    let element: QWElement | null = null;
    let iframeSelector: string | null | undefined = null;
    if (specificDocument || !!documentSelector) {
      if (specificDocument) {
        iframeSelector = specificDocument.getElementAttribute('_documentSelector');
      } else {
        iframeSelector = documentSelector;
      }
      if (!!iframeSelector && !!this.extraDocuments.has(iframeSelector)) {
        const iframePage = this.extraDocuments.get(iframeSelector);
        if (iframePage) {
          element = iframePage.getElement(selector, specificDocument);
        }
      } else {
        element = this.getElementFromDocument(selector);
      }
    } else {
      element = this.getElementFromDocument(selector);
      if (!element) {
        //search iframes
        this.extraDocuments.forEach((iframe: QWPage, key: string) => {
          if (!element) {
            element = iframe.getElement(selector);
            iframeSelector = key;
          }
        });
        /*const iframeKeys = Array.from(this.extraDocuments.keys());
        console.log(iframeKeys);
        let i = 0;
        while (!element && i < iframeKeys.length) {
          const iframePage = this.extraDocuments.get(iframeKeys[i]);
          if (iframePage) {
            element = iframePage.getElement(selector);
            iframeSelector = iframeKeys[i];
            i++;
          }
        }*/
      }
    }

    if (element && iframeSelector) {
      this.addIframeAttribute([element], iframeSelector);
    }

    return element;
  }

  public getElements(selector: string, specificDocument?: QWElement, documentSelector?: string): Array<QWElement> {
    let iframeSelector;
    const elements = new Array<QWElement>();
    if (specificDocument || !!documentSelector) {
      if (specificDocument) {
        iframeSelector = specificDocument.getElementAttribute('_documentSelector');
      } else {
        iframeSelector = documentSelector;
      }

      if (!!iframeSelector && !!this.extraDocuments.has(iframeSelector)) {
        const iframePage = this.extraDocuments.get(iframeSelector);
        if (iframePage) {
          elements.push(...iframePage.getElements(selector, specificDocument));
          this.addIframeAttribute(elements, iframeSelector);
        }
      } else {
        elements.push(...this.getElementsFromDocument(selector));
      }
    } else {
      // console.log(this.getElementsFromDocument(selector));
      elements.push(...this.getElementsFromDocument(selector));
      //search iframes
      this.extraDocuments.forEach((iframe: QWPage, key: string) => {
        const iframeElements = iframe.getElements(selector);
        this.addIframeAttribute(iframeElements, key);
        elements.push(...iframeElements);
      });
      /*const iframeKeys = Array.from(this.extraDocuments.keys());
      for (const key of iframeKeys ?? []) {
        const iframePage = this.extraDocuments.get(key);
        if (iframePage) {
          const iframeElements = iframePage.getElements(selector);
          this.addIframeAttribute(iframeElements, key);
          elements.push(...iframeElements);
        }
      }*/
    }
    return elements;
  }

  public getElementByID(id: string): QWElement | null {
    const element = this.document.querySelector(`[id='${id}']`);
    this.addCSSRulesPropertyToElement(element);
    return element ? new QWElement(element, this.elementsCSSRules) : null;
  }

  public getElementByAttributeName(name: string): QWElement | null {
    const element = this.document.querySelector(`[name='${name}']`);
    this.addCSSRulesPropertyToElement(element);
    return element ? new QWElement(element, this.elementsCSSRules) : null;
  }

  public getPageRootElement(): QWElement | null {
    if (this.document instanceof Document) {
      const documentElement = this.document.documentElement;
      this.addCSSRulesPropertyToElement(documentElement);
      return documentElement ? new QWElement(documentElement, this.elementsCSSRules) : null;
    } else {
      return null;
    }
  }

  public getHTMLContent(): string {
    if (this.document instanceof ShadowRoot) {
      return this.document.innerHTML;
    } else {
      return this.document.documentElement.outerHTML;
    }
  }

  public getFocusedElement(): QWElement | null {
    const activeElement = this.document.activeElement;
    this.addCSSRulesPropertyToElement(activeElement);
    return activeElement ? new QWElement(activeElement, this.elementsCSSRules) : null;
  }

  public cleanAllElements(): void {
    const html = this.document.querySelector('html');
    if (html) {
      html.removeAttribute('_selector');
      html.removeAttribute('_cssRules');
      html.removeAttribute('_documentSelector');
      const children = html.children;
      if (children) this.cleanAllElementsAux([...children]);
    }
  }

  private cleanAllElementsAux(elements: Array<Element>): void {
    for (const element of elements ?? []) {
      element.removeAttribute('_selector');
      element.removeAttribute('_cssRules');
      element.removeAttribute('_documentSelector');
      const children = element.children;
      if (children && children.length > 0) {
        this.cleanAllElementsAux([...children]);
      }
    }
  }
}

window.qwPage = new QWPage(document, true);

export { QWPage };
