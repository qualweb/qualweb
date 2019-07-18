declare module '@qualweb/get-dom-puppeteer' {
  interface DomOptions {
    mobile?: boolean;
    landscape?: boolean;
    userAgent?: string;
    resolution?: {
      width?: number;
      height?: number;
    };
    computedStyle?: boolean;
    elementsPosition?: boolean;
  }

  interface Html {
    readonly html?: string;
    readonly title?: string;
    readonly elementCount?: number;
  }

  interface Dom {
    sourceHTML: Html;
    processedHTML: Html;
  }

  function getDom(url: string, options?: DomOptions): Promise<any>;

  export {
    DomOptions,
    Html,
    Dom,
    getDom
  };
}