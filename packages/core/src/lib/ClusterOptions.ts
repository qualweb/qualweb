export type ClusterOptions = {
  maxConcurrency?: number;
  timeout?: number;
  /** Only supported by the optional Puppeteer driver. True throws with Playwright. */
  monitor?: boolean;
};
