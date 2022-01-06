import { Page, Viewport, HTTPResponse } from 'puppeteer';
import { QualwebOptions, PageOptions } from '@qualweb/core';
import { PageData } from '@qualweb/dom';
import fetch from 'node-fetch';

import {
  DEFAULT_DESKTOP_USER_AGENT,
  DEFAULT_MOBILE_USER_AGENT,
  DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH,
  DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT,
  DEFAULT_MOBILE_PAGE_VIEWPORT_WIDTH,
  DEFAULT_MOBILE_PAGE_VIEWPORT_HEIGHT
} from './constants';
import { HTMLValidationReport } from '@qualweb/html-validator';
import { URL } from 'url';

class Dom {
  private readonly page: Page;
  private readonly endpoint?: string;

  constructor(page: Page, validator?: string) {
    this.page = page;
    this.endpoint = validator;
  }

  public async process(options: QualwebOptions, url: string, html: string): Promise<PageData> {
    url = this.removeUrlAnchor(url);

    await this.page.setBypassCSP(true);
    await this.setPageViewport(options.viewport);

    const needsValidator = this.validatorNeeded(options);
    const needsPreprocessedHTML = this.sourceHTMLNeeded(options);

    let validation: HTMLValidationReport | undefined;
    let response: HTTPResponse | null;
    let sourceHtml = '';

    if (url) {
      if (needsValidator && needsPreprocessedHTML) {
        [response, validation, sourceHtml] = await Promise.all([
          this.navigateToPage(url, options),
          this.getValidatorResult(url),
          this.getSourceHtml(url, options.viewport)
        ]);
      } else if (needsValidator) {
        [response, validation] = await Promise.all([this.navigateToPage(url, options), this.getValidatorResult(url)]);
      } else if (needsPreprocessedHTML) {
        [response, sourceHtml] = await Promise.all([
          this.navigateToPage(url, options),
          this.getSourceHtml(url, options.viewport)
        ]);
      } else {
        response = await this.navigateToPage(url, options);
      }

      const sourceHTMLPuppeteer = await response?.text();

      if (!this.isHtmlDocument(sourceHTMLPuppeteer, url)) {
        //await this.page.close();
        //this.page = await this.page.browser().newPage();
        await this.page.goBack();
        await this.page.setContent('<!DOCTYPE html><html nonHTMLPage=true><body></body></html>', {
          timeout: options.timeout
        });
      }
    } else if (html) {
      await this.page.setContent(html, {
        timeout: options.timeout ?? 60 * 1000,
        waitUntil: options.waitUntil ?? 'load'
      });

      sourceHtml = await this.page.content();
      /*if (!this.isHtmlDocument(sourceHtml)) {
        await this.page.close();
        this.page = await this.page.browser().newPage();
        await this.page.setContent('<!DOCTYPE html><html nonHTMLPage=true><body></body></html>', {
          timeout: options.timeout
        });
      }*/
    } else {
      throw new Error('Neither a url nor html content was provided.');
    }

    return {
      sourceHtml,
      validation
    };
  }

  private removeUrlAnchor(url: string): string {
    if (url) {
      const urlObject = new URL(url);
      return urlObject.origin + urlObject.pathname + urlObject.search;
    }

    return url;
  }

  private async navigateToPage(url: string, options: QualwebOptions): Promise<HTTPResponse | null> {
    this.page.on('dialog', async (dialog) => {
      await dialog.dismiss();
    });

    return this.page.goto(url, {
      timeout: options.timeout ?? 60 * 1000,
      waitUntil: options.waitUntil ?? 'load'
    });
  }

  private async setPageViewport(options?: PageOptions): Promise<void> {
    if (options) {
      if (options.userAgent) {
        await this.page.setUserAgent(options.userAgent);
      } else if (options.mobile) {
        await this.page.setUserAgent(DEFAULT_MOBILE_USER_AGENT);
      } else {
        await this.page.setUserAgent(DEFAULT_DESKTOP_USER_AGENT);
      }

      await this.page.setViewport(this.createViewportObject(options));
    } else {
      await this.page.setViewport({
        width: DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH,
        height: DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT,
        isMobile: false,
        hasTouch: false,
        isLandscape: true
      });
    }
  }

  private createViewportObject(options: PageOptions): Viewport {
    const viewPort: Viewport = {
      width: options.mobile ? DEFAULT_MOBILE_PAGE_VIEWPORT_WIDTH : DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH,
      height: options.mobile ? DEFAULT_MOBILE_PAGE_VIEWPORT_HEIGHT : DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT
    };

    if (options.resolution?.width) {
      viewPort.width = options.resolution.width;
    }
    if (options.resolution?.height) {
      viewPort.height = options.resolution.height;
    }

    viewPort.isMobile = !!options.mobile;
    viewPort.isLandscape = options.landscape ?? viewPort.width > viewPort.height;
    viewPort.hasTouch = !!options.mobile;

    return viewPort;
  }

  private async getSourceHtml(url: string, options?: PageOptions): Promise<string> {
    try {
      const fetchOptions = {
        headers: {
          'User-Agent': options
            ? options.userAgent
              ? options.userAgent
              : options.mobile
              ? DEFAULT_MOBILE_USER_AGENT
              : DEFAULT_DESKTOP_USER_AGENT
            : DEFAULT_DESKTOP_USER_AGENT
        }
      };
      const response = await fetch(url, fetchOptions);
      return (await response.text()).trim();
    } catch (e) {
      return '';
    }
  }

  private async getValidatorResult(url: string): Promise<HTMLValidationReport | undefined> {
    if (this.endpoint) {
      const validationUrl = this.endpoint + encodeURIComponent(url);
      try {
        const response = await fetch(validationUrl, { timeout: 10 * 1000 });
        if (response && response.status === 200) {
          const data = await response.json();
          return <HTMLValidationReport>JSON.parse(data);
        }
      } catch (e) {
        console.error('Error fetching HTML Validation: ' + e);
      }
    }

    return undefined;
  }

  private validatorNeeded(options: QualwebOptions): boolean {
    if (this.isModuleSetToExecute(options, 'wcag') && this.endpoint) {
      if (options['wcag-techniques']) {
        if (this.moduleExcludesValidatorTechnique(options)) {
          return false;
        } else if (options['wcag-techniques'].techniques) {
          return this.moduleIncludesValidatorTechnique(options);
        }
      }

      return true;
    }

    return false;
  }

  private isModuleSetToExecute(options: QualwebOptions, module: 'act' | 'wcag'): boolean {
    return !options.execute || (options.execute && !!options.execute[module]);
  }

  private moduleIncludesValidatorTechnique(options: QualwebOptions): boolean {
    return !!(
      options &&
      options['wcag-techniques'] &&
      options['wcag-techniques'].techniques &&
      (options['wcag-techniques'].techniques.includes('QW-WCAG-T16') ||
        options['wcag-techniques'].techniques.includes('H88'))
    );
  }

  private moduleExcludesValidatorTechnique(options: QualwebOptions): boolean {
    return !!(
      options &&
      options['wcag-techniques'] &&
      options['wcag-techniques'].exclude &&
      (options['wcag-techniques'].exclude.includes('QW-WCAG-T16') || options['wcag-techniques'].exclude.includes('H88'))
    );
  }

  private sourceHTMLNeeded(options: QualwebOptions): boolean {
    if (this.isModuleSetToExecute(options, 'act')) {
      if (options['act-rules']) {
        if (this.moduleExcludesSourceCodeRule(options)) {
          return false;
        } else if (options['act-rules'].rules) {
          return this.moduleIncludesSourceCodeRule(options);
        }
      }

      return true;
    }

    return false;
  }

  private moduleIncludesSourceCodeRule(options: QualwebOptions): boolean {
    return !!(
      options &&
      options['act-rules'] &&
      options['act-rules'].rules &&
      (options['act-rules'].rules.includes('QW-ACT-R4') ||
        options['act-rules'].rules.includes('bc659a') ||
        options['act-rules'].rules.includes('QW-ACT-R71') ||
        options['act-rules'].rules.includes('bisz58'))
    );
  }

  private moduleExcludesSourceCodeRule(options: QualwebOptions): boolean {
    return !!(
      options &&
      options['act-rules'] &&
      options['act-rules'].exclude &&
      (options['act-rules'].exclude.includes('QW-ACT-R4') ||
        options['act-rules'].exclude.includes('bc659a') ||
        options['act-rules'].exclude.includes('QW-ACT-R71') ||
        options['act-rules'].exclude.includes('bisz58'))
    );
  }

  private isHtmlDocument(content?: string, url?: string): boolean {
    if (url && (url.endsWith('.svg') || url.endsWith('.xml') || url.endsWith('.xhtml'))) {
      return false;
    }

    return !(
      (content?.trim().startsWith('<math') || content?.trim().startsWith('<svg')) &&
      !content?.includes('<html')
    );
  }
}

export { Dom };
