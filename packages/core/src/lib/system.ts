'use strict';

import puppeteer, { Browser, Page, Viewport } from 'puppeteer';
import { Parser, DomElement, DomHandler, DomUtils } from 'htmlparser2';
import request from 'request';
const stew = new(require('stew-select')).Stew();
import { EvaluationReport, QualwebOptions } from '@qualweb/core';
import { getFileUrls, crawlDomain } from './managers/startup.manager';
import { evaluate2 } from './managers/module.manager';
import { EarlOptions, EarlReport, generateEARLReport } from '@qualweb/earl-reporter';
import { DomOptions, Html } from '@qualweb/get-dom-puppeteer';
import clone from 'lodash/clone';
import css from 'css';

import {
  DEFAULT_DESKTOP_USER_AGENT,
  DEFAULT_MOBILE_USER_AGENT,
  DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH,
  DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT,
  DEFAULT_MOBILE_PAGE_VIEWPORT_WIDTH,
  DEFAULT_MOBILE_PAGE_VIEWPORT_HEIGHT
} from './constants';

class System {

  private urls: Array<string>;
  private evaluations: Array<EvaluationReport>;
  private force: boolean;
  private numberOfParallelEvaluations = 1;
  private modulesToExecute: any;

  private browser: Browser | null = null;

  constructor() {
    this.urls = new Array<string>();
    this.evaluations = new Array<EvaluationReport>();
    this.force = false;
    this.modulesToExecute = {
      act: true,
      html: true,
      css: true,
      bp: true,
      wappalyzer: false
    };
  }

  public async startup(options: QualwebOptions): Promise<void> {
    this.urls = new Array<string>();
    this.evaluations = new Array<EvaluationReport>();
    
    if (options.url) {
      this.urls.push(decodeURIComponent(options.url).trim());
    } else if (options.urls) {
      this.urls = options.urls.map((url: string) => decodeURIComponent(url).trim());
    } else if (options.file) {
      this.urls = await getFileUrls(options.file);
    } else if (options.crawl) {
      this.urls = await crawlDomain(options.crawl);
    } else {
      throw new Error('Invalid input method');
    }

    if (options.maxParallelEvaluations !== undefined) {
      this.numberOfParallelEvaluations = options.maxParallelEvaluations;
      if (!Number.isInteger(this.numberOfParallelEvaluations) || this.numberOfParallelEvaluations < 1) {
        throw new Error('Invalid MaxParallelEvaluations value');
      }
    }

    if (this.urls.length < this.numberOfParallelEvaluations) {
      this.numberOfParallelEvaluations = this.urls.length;
    }

    if (options.force) {
      this.force = options.force;
    } else {
      this.force = false;
    }

    if (options.execute) {
      this.modulesToExecute.act = options.execute.act ? options.execute.act : false;
      this.modulesToExecute.html = options.execute.html ? options.execute.html : false;
      this.modulesToExecute.css = options.execute.css ? options.execute.css : false;
      this.modulesToExecute.bp = options.execute.bp ? options.execute.bp : false;
      this.modulesToExecute.wappalyzer = options.execute.wappalyzer ? options.execute.wappalyzer : false;
    } else {
      this.modulesToExecute = {
        act: true,
        html: true,
        css: true,
        bp: true,
        wappalyzer: false
      };
    }

    this.browser = await puppeteer.launch();
  }

  public async execute(options: QualwebOptions): Promise<void> {
    for (let i = 0 ; i < this.urls.length ; i += this.numberOfParallelEvaluations) {
      const promises = new Array<any>();
      for (let j = 0 ; j < this.numberOfParallelEvaluations && i + j < this.urls.length ; j++) {
        promises.push(this.runModules(this.urls[i + j], options));
      }
      await Promise.all(promises);
    }
  }

  public async report(earl: boolean, options?: EarlOptions): Promise<Array<EvaluationReport> | Array<EarlReport>> {
    if (earl || options) {
      return generateEARLReport(this.evaluations, options);
    } else {
      return this.evaluations;
    }
  }

  public async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  private async runModules(url: string, options: QualwebOptions): Promise<void> {
    if (this.browser) {
      try {
        const page = await this.browser.newPage();
        await this.setPageViewport(page);

        const plainStylesheets: any = {};
        page.on('response', async response => {
          if(response.request().resourceType() === 'stylesheet') {
            const url = response.url();
            const content = await response.text();
            plainStylesheets[url] = content;
          }
        });

        await page.goto(url, {
          waitUntil: ['networkidle2', 'domcontentloaded']
        });

        const stylesheets = await this.parseStylesheets(plainStylesheets);

        const sourceHtml = await this.getSourceHTML(url);

        const evaluation = await evaluate2(sourceHtml, page, stylesheets, this.modulesToExecute, options);
        //const evaluation = await evaluate(url, this.modulesToExecute, options);
        this.evaluations.push(evaluation.getFinalReport());
        await page.close();
      } catch(err) {
        if (!this.force) {
          console.warn('-> ' + url);
          console.error(err);
          return;
        }
      }
    }
  }

  private async setPageViewport(page: Page, options?: DomOptions): Promise<void> {
    if (options) {
      if (options.userAgent) {
        await page.setUserAgent(options.userAgent);
      } else if (options.mobile) {
        await page.setUserAgent(DEFAULT_MOBILE_USER_AGENT);
      } else {
        await page.setUserAgent(DEFAULT_DESKTOP_USER_AGENT);
      }

      const viewPort: Viewport = {
        width: options.mobile ? DEFAULT_MOBILE_PAGE_VIEWPORT_WIDTH : DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH,
        height: options.mobile ? DEFAULT_MOBILE_PAGE_VIEWPORT_HEIGHT : DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT
      };
      if (options.resolution) {
        if (options.resolution.width) {
          viewPort.width = options.resolution.width;
        }
        if (options.resolution.height) {
          viewPort.height = options.resolution.height;
        }
      }
      viewPort.isMobile = !!options.mobile;
      viewPort.isLandscape = options.landscape !== undefined ? options.landscape : viewPort.width > viewPort.height;
      viewPort.hasTouch = !!options.mobile;

      await page.setViewport(viewPort);
    } else {
      await page.setViewport({
        width: DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH,
        height: DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT,
        isMobile: false,
        hasTouch: false,
        isLandscape: true
      });
    }
  }

  private async parseStylesheets(plainStylesheets: any): Promise<any[]> {
    const stylesheets = new Array<any>();
    for (const file in plainStylesheets || {}){
      const stylesheet: any = {file, content: {}};
      if (stylesheet.content) {
        stylesheet.content.plain = plainStylesheets[file];
        stylesheet.content.parsed = css.parse(plainStylesheets[file], { silent: true }); //doesn't throw errors
        stylesheets.push(clone(stylesheet));
      }
    }

    return stylesheets;
  }

  private async getRequestData(headers: (request.UrlOptions & request.CoreOptions)): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      request(headers, (error: any, response: request.Response, body: string) => {
        if (error) {
          reject(error);
        } else if (!response || response.statusCode !== 200) {
          reject(response.statusCode);
        } else {
          resolve({ response, body });
        }
      });
    });
  }

  private async getSourceHTML(url: string, options?: DomOptions): Promise<Html> {
    const headers = {
      'url': url,
      'headers': {
        'User-Agent': options ? options.userAgent ? options.userAgent : options.mobile ? DEFAULT_MOBILE_USER_AGENT : DEFAULT_DESKTOP_USER_AGENT : DEFAULT_DESKTOP_USER_AGENT
      }
    };

    const data: any = await this.getRequestData(headers);
    const sourceHTML: string = data.body.toString().trim();

    const parsedHTML = this.parseHTML(sourceHTML);
    const elements = stew.select(parsedHTML, '*');

    let title = '';

    const titleElement = stew.select(parsedHTML, 'title');

    if (titleElement.length > 0) {
      title = DomUtils.getText(titleElement[0]);
    }

    const source: Html = {
      html: {
        plain: sourceHTML,
        parsed: parsedHTML
      },
      elementCount: elements.length,
      title: title !== '' ? title : undefined
    }

    return source;
  }

  private parseHTML(html: string): DomElement[] {
    let parsed: DomElement[] | undefined = undefined;

    const handler = new DomHandler((error, dom) => {
      if (error) {
        throw error;
      } else {
        parsed = dom;
      }
    });

    const parser = new Parser(handler);
    parser.write(html.replace(/(\r\n|\n|\r|\t)/gm, ''));
    parser.end();

    if (!parsed) {
      throw new Error('Failed to parse html');
    }

    return parsed;
  }
}

export = System;