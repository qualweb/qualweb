export type BrowserFeatures = {
  /** @deprecated Stealth was removed. Passing true throws a migration error. */
  stealth?: boolean;
  adBlock?: boolean;
};

/** @deprecated Use BrowserFeatures. */
export type PuppeteerPlugins = BrowserFeatures;
