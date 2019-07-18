declare module '@qualweb/wappalyzer' {
  interface Category {
    [index: string]: string;
  }

  interface Application {
    name: string;
    confidence: string;
    version?: string;
    icon?: string;
    website: string;
    categories: Category[];
  }

  interface UrlStatus {
    status: number;
  }

  interface Urls {
    [url: string]: UrlStatus;
  }

  interface Meta {
    language: string;
  }

  interface WappalyzerResult {
    urls: Urls;
    applications: Application[];
    meta: Meta;
  }

  interface WappalyzerOptions {
    cms?: string[];
    apps?: string[];
  }

  interface WappalyzerReport {
    result: WappalyzerResult;
  }

  function executeWappalyzer(url: string, options?: WappalyzerOptions): Promise<WappalyzerReport>;

  export {
    Category,
    Application,
    UrlStatus,
    Urls,
    Meta,
    WappalyzerOptions,
    WappalyzerResult,
    WappalyzerReport,
    executeWappalyzer
  };
}