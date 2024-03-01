declare module "@qualweb/qw-element" {
  interface CSSProperty {
    name: string;
    value: string;
    important: boolean;
    location: string;
    pointer: string;
  }

  interface PseudoSelectorProperty {
    [property: string]: CSSProperty;
  }

  interface MediaProperty {
    [property: string]: CSSProperty | PseudoSelectorProperty;
  }

  interface MediaProperties {
    [media: string]: MediaProperty | PseudoSelectorProperty;
  }

  interface CSSProperties {
    media: MediaProperties;
    [property: string]: CSSProperty | MediaProperties | PseudoSelectorProperty;
  }

  class QWElement {
    constructor(
      element: Element,
      elementsCSSRules?: Map<Element, CSSProperties>
    );
    public elementHasAttribute(attribute: string): boolean;
    public elementHasAttributes(): boolean;
    public elementHasChild(childName: string): boolean;
    public elementHasChildren(): boolean;
    public elementHasParent(parent: string): boolean;
    public getElementAttribute(attribute: string): string | null;
    public getElementAttributes(): any;
    public getElementAttributesName(): Array<string>;
    public getElementChildren(): Array<QWElement>;
    public getElementChildTextContent(childName: string): string | undefined;
    public getElementHtmlCode(withText: boolean, fullElement: boolean): string;
    public getElement(selector: string): QWElement | null;
    public getElements(selector: string): Array<QWElement>;
    public getAllPreviousSiblings(): Array<QWElement | string>;
    public getAllNextSiblings(): Array<QWElement | string>;
    public getElementNextSibling(): QWElement | null;
    public getPreviousSibling(): QWElement | string | null;
    public getNextSibling(): QWElement | string | null;
    public getElementParent(): QWElement | null;
    public getElementPreviousSibling(): QWElement | null;
    public getElementProperty(property: string): string;
    public getElementSelector(): string;
    public getElementStyleProperty(
      property: string,
      pseudoStyle: string | null
    ): string;
    public getElementTagName(): string;
    public getElementText(): string;
    public getElementOwnText(): string;
    public getElementType(): string;
    public getNumberOfSiblingsWithTheSameTag(): number;
    public setElementAttribute(attribute: string, value: string): void;
    public concatANames(aNames: string[]): string;
    public isOffScreen(): boolean;
    public isElementHTMLElement(): boolean;
    public elementHasTextNode(): boolean;
    public getContentFrame(): Document | null;
    public focusElement(): void;
    public blurElement(): void;
    public dispatchEvent(event: Event): void;
    public click(): void;
    public getBoundingBox(): DOMRect;
    public getShadowElement(selector: string): QWElement | null;
    public getShadowElements(selector: string): Array<QWElement>;
    public getSlotElements(): Array<QWElement>;
    public getSlotNodes(): Node[]
    public isShadowRoot() : boolean 
    public hasTextNode(): boolean;
    public hasCSSRules(): boolean;
    public getCSSRules(): CSSProperties | undefined;
    public hasCSSProperty(
      property: string,
      pseudoStyle?: string,
      media?: string
    ): boolean;
    public getCSSProperty(
      property: string,
      pseudoStyle?: string,
      media?: string
    ): CSSProperty | undefined;
    public getCSSMediaRules(): MediaProperty | undefined;
    public getCSSPseudoSelectorRules(
      pseudoSelector: string
    ): PseudoSelectorProperty | undefined;
    public getParentAllContexts(): QWElement | null;
  }

  export {
    CSSProperty,
    PseudoSelectorProperty,
    MediaProperty,
    MediaProperties,
    CSSProperties,
    QWElement,
  };
}
