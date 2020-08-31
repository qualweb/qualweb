declare module '@qualweb/qw-page' {
  import { QWElement } from "@qualweb/qw-element";

  class QWPage {
    constructor(document: Document, window: Window);
    public cacheValue(selector: string, method: string, value: string | undefined): void;
    public getCachedValue(selector: string, method: string): string|undefined;
    public isValueCached(selector: string, method: string): boolean;
    public getElement(selector: string, specificDocument?: QWElement): QWElement | null;
    public getElements(selector: string, specificDocument?: QWElement): Array<QWElement>;
    public getElementByID(id: string, elementQW: QWElement): QWElement | null;
    public getElementByAttributeName(name: string): QWElement | null;
    public getPageRootElement(page: QWPage): QWElement | null;
    public getURL(): string;
    public getHTMLContent(): string;
    public getFocusedElement(): QWElement; 
   // public changeToDefaultViewport(): void;
   // public changeViewport(width: number, height: number): void;
  }

  export {
    QWPage
  };
}