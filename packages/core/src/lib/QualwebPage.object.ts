import axios from 'axios';
import type { Page, HTTPResponse, Viewport, Awaitable, InnerParams } from 'puppeteer';
import type { HTMLValidationReport, TestingData } from '../lib/evaluation';
import type { QualwebOptions } from './QualwebOptions';
import { PageOptions } from './PageOptions';
import { PluginManager } from './PluginManager.object';
import {
  DEFAULT_MOBILE_USER_AGENT,
  DEFAULT_DESKTOP_USER_AGENT,
  DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH,
  DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT,
  DEFAULT_MOBILE_PAGE_VIEWPORT_WIDTH,
  DEFAULT_MOBILE_PAGE_VIEWPORT_HEIGHT,
} from './constants';

type EvaluateFunc<T extends unknown[]> = (...params: InnerParams<T>) => Awaitable<unknown>;

export class QualwebPage {
  private readonly pluginManager: PluginManager;
  public readonly page: Page;
  private readonly url?: string;
  private readonly html?: string;

  constructor(pluginManager: PluginManager, page: Page, url?: string, html?: string) {
    if (!url && !html) {
      throw new Error('Neither a url nor html content was provided.');
    }
    this.pluginManager = pluginManager;
    this.page = page;
    this.url = url;
    this.html = html;
  }

  public getInputUrl(): string | undefined {
    return this.url;
  }

  public getFinalUrl(): string {
    return this.page.url();
  }

  public getTitle(): Promise<string> {
    return this.page.title();
  }

  public async getNumberOfHTMLElements(): Promise<number> {
    return (await this.page.$$('*')).length;
  }

  public getOuterHTML(): Promise<string> {
    return this.page.evaluate(() => document.documentElement.outerHTML);
  }

  public getUserAgent(): Promise<string> {
    return this.page.browser().userAgent();
  }

  public async getTestingData(options: QualwebOptions): Promise<TestingData> {
    await this.page.setBypassCSP(true);
    await this.setViewport(options.viewport);

    await this.pluginManager.executeBeforePageLoad(this.page);

    const testingData: TestingData = {};

    if (this.url) {
      const [response, validation, sourceHtml] = await Promise.all([
        this.navigateToPage(options),
        this.getValidatorResult(options.validator),
        this.getSourceHtml(options.viewport)
      ]);

      testingData.validation = validation;
      testingData.sourceHtml = sourceHtml;

      const sourceHTMLPuppeteer = await response?.text();

      if (!this.isHtmlDocument(sourceHTMLPuppeteer)) {
        await this.page.goBack();
        await this.page.setContent('<!DOCTYPE html><html nonHTMLPage=true><body></body></html>', {
          timeout: options.timeout
        });
      }
    } else if (this.html) {
      await this.page.setContent(this.html, {
        timeout: options.timeout ?? 60 * 1000,
        waitUntil: options.waitUntil ?? 'load'
      });

      testingData.sourceHtml = await this.page.content();
    }

    testingData.newTabWasOpen = await this.extraTabOpened();

    await this.pluginManager.executeAfterPageLoad(this.page);

    this.addNecessaryScripts();

    return testingData;
  }

  private async addNecessaryScripts(): Promise<void> {
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/qw-page'),
      type: 'text/javascript'
    });
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/util'),
      type: 'text/javascript'
    });
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/locale'),
      type: 'text/javascript'
    });
  }

  public async addEvaluationScript(module: string): Promise<void> {
    await this.page.addScriptTag({
      path: require.resolve(module),
      type: 'text/javascript'
    });
  }

  public evaluate<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(
    pageFunction: Func | string,
    ...args: Params
  ): Promise<Awaited<ReturnType<Func>>> {
    return this.page.evaluate<Params, Func>(pageFunction, ...args);
  }

  private async navigateToPage(options: QualwebOptions): Promise<HTTPResponse | null> {
    this.page.on('dialog', (dialog) => dialog.dismiss());

    return this.page.goto(this.url ?? '', {
      timeout: options.timeout ?? 240 * 1000,
      waitUntil: options.waitUntil ?? 'load'
    });
  }

  public getViewport(): Viewport | null {
    return this.page.viewport();
  }

  public async setViewport(options?: PageOptions): Promise<void> {
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
    const viewport: Viewport = {
      width: options.mobile ? DEFAULT_MOBILE_PAGE_VIEWPORT_WIDTH : DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH,
      height: options.mobile ? DEFAULT_MOBILE_PAGE_VIEWPORT_HEIGHT : DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT
    };

    if (options.resolution?.width) {
      viewport.width = options.resolution.width;
    }
    if (options.resolution?.height) {
      viewport.height = options.resolution.height;
    }

    viewport.isMobile = !!options.mobile;
    viewport.isLandscape = options.landscape ?? viewport.width > viewport.height;
    viewport.hasTouch = !!options.mobile;

    return viewport;
  }

  private async extraTabOpened(): Promise<boolean> {
    const tabs = await this.page.browser().pages();

    let extraTabOpened = false;

    for (const tab of tabs ?? []) {
      const target = tab.target();
      const opener = target.opener();

      if (opener) {
        const openerPage = await opener.page();
        if (openerPage && openerPage.url() === this.page.url()) {
          extraTabOpened = true;
          await tab.close();
        }
      }
    }

    return extraTabOpened;
  }

  private async getSourceHtml(options?: PageOptions): Promise<string> {
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
      const response = await axios.get(this.url ?? '', fetchOptions);
      return response.data.trim();
    } catch (e) {
      return '';
    }
  }

  private async getValidatorResult(endpoint?: string): Promise<HTMLValidationReport | undefined> {
    if (endpoint) {
      const validationUrl = endpoint + encodeURIComponent(this.url ?? '');
      try {
        const response = await axios.get(validationUrl, { timeout: 10 * 1000 });
        if (response && response.status === 200) {
          return <HTMLValidationReport>response.data;
        }
      } catch (e) {
        console.error('Error fetching HTML Validation: ' + e);
      }
    }

    return undefined;
  }

  private isHtmlDocument(content?: string): boolean {
    if (this.url && (this.url.endsWith('.svg') || this.url.endsWith('.xml') || this.url.endsWith('.xhtml'))) {
      return false;
    }

    return !(
      (content?.trim().startsWith('<math') || content?.trim().startsWith('<svg')) &&
      !content?.includes('<html')
    );
  }
}
