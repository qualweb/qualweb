declare module '@qualweb/get-dom-puppeteer' {
  import { DomElement } from 'htmlparser2';
  import { Stylesheet } from 'css';
  
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
    generateIds?: boolean;
  }

  interface Html {
    readonly html: {
      plain: string;
      parsed: DomElement[];
    };
    readonly title?: string;
    readonly elementCount?: number;
  }

  interface CSSStylesheet {
    readonly file: string;
    readonly content?: {
      plain?: string;
      parsed?: StyleSheet;
    };
  }

  interface Dom {
    readonly source: Html;
    readonly processed: Html;
    readonly stylesheets: CSSStylesheet[];
  }

  function getDom(url: string, options?: DomOptions): Promise<Dom>;

  export {
    DomOptions,
    Html,
    Dom,
    CSSStylesheet,
    getDom
  };
}