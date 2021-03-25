import { Page } from 'puppeteer';
import { QualwebOptions, Url, Evaluator, Execute } from '@qualweb/core';
import { randomBytes } from 'crypto';
import { WCAGOptions, WCAGTechniquesReport } from '@qualweb/wcag-techniques';
import { BrowserUtils } from '@qualweb/util';
import EvaluationRecord from './evaluationRecord.object';
import { ACTROptions, ACTRulesReport } from '@qualweb/act-rules';
import { BPOptions, BestPracticesReport } from '@qualweb/best-practices';
import { executeWappalyzer } from '@qualweb/wappalyzer';
import { CounterReport } from '@qualweb/counter';
import { HTMLValidationReport } from '@qualweb/html-validator';
import { QWElement } from '@qualweb/qw-element';

class Evaluation {
  public async getEvaluator(page: Page, url: string): Promise<Evaluator> {
    const [plainHtml, pageTitle, elements, browserUserAgent] = await Promise.all([
      page.evaluate(() => {
        return document.documentElement.outerHTML;
      }),
      page.title(),
      page.$$('*'),
      page.browser().userAgent()
    ]);

    let urlStructure: Url | undefined = undefined;
    if (url) {
      urlStructure = this.parseUrl(url, page.url() !== 'about:blank' ? page.url() : url);
    }

    const viewport = page.viewport();

    return {
      name: 'QualWeb',
      description: 'QualWeb is an automatic accessibility evaluator for webpages.',
      version: '3.0.0',
      homepage: 'http://www.qualweb.di.fc.ul.pt/',
      date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      hash: randomBytes(40).toString('hex'),
      url: urlStructure,
      page: {
        viewport: {
          mobile: viewport?.isMobile,
          landscape: viewport?.isLandscape,
          userAgent: browserUserAgent,
          resolution: {
            width: viewport?.width,
            height: viewport?.height
          }
        },
        dom: {
          html: plainHtml,
          title: pageTitle,
          elementCount: elements.length
        }
      }
    };
  }

  public async addQWPage(page: Page): Promise<void> {
    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });
    await page.evaluate(() => {
      // @ts-ignore
      window.page = new QWPage(document, window, true);
    });
  }

  public async executeACT(
    page: Page,
    sourceHtmlHeadContent: string,
    options: ACTROptions | undefined
  ): Promise<ACTRulesReport> {
    await page.addScriptTag({
      path: require.resolve('@qualweb/act-rules')
    });

    await page.evaluate((options) => {
      // @ts-ignore
      window.act = new ACTRules(options);
      // @ts-ignore
    }, options);

    await page.keyboard.press('Tab'); // for R72 that needs to check the first focusable element
    await page.evaluate((sourceHtmlHeadContent) => {
      // @ts-ignore
      window.act.validateFirstFocusableElementIsLinkToNonRepeatedContent(window.page);

      const parser = new DOMParser();
      const sourceDoc = parser.parseFromString('', 'text/html');

      sourceDoc.head.innerHTML = sourceHtmlHeadContent;

      const elements = sourceDoc.querySelectorAll('meta');
      const metaElements = new Array<QWElement>();
      for (const element of elements) {
        // @ts-ignore
        metaElements.push(QWPage.createQWElement(element));
      }

      // @ts-ignore
      window.act.validateMetaElements(metaElements);
      // @ts-ignore
      window.act.executeAtomicRules(window.page);
      // @ts-ignore
      window.act.executeCompositeRules(window.page);
    }, sourceHtmlHeadContent);

    if (!options || !options.rules || options.rules.includes('QW-ACT-R40') || options.rules.includes('59br37')) {
      const viewport = page.viewport();
      await page.setViewport({
        width: 640,
        height: 512
      });
      await page.evaluate(() => {
        // @ts-ignore
        window.act.validateZoomedTextNodeNotClippedWithCSSOverflow(window.page);
      });
      if (viewport) {
        await page.setViewport(viewport);
      }
    }

    return page.evaluate(() => {
      // @ts-ignore
      return window.act.getReport();
    });
  }

  public async executeWCAG(
    page: Page,
    options: WCAGOptions | undefined,
    validation: HTMLValidationReport | undefined
  ): Promise<WCAGTechniquesReport> {
    await page.addScriptTag({
      path: require.resolve('@qualweb/wcag-techniques')
    });

    const url = page.url();
    const newTabWasOpen = await BrowserUtils.detectIfUnwantedTabWasOpened(page.browser(), url);

    return await page.evaluate(
      (newTabWasOpen, validation, options) => {
        // @ts-ignore
        const html = new WCAGTechniques.WCAGTechniques(JSON.parse(options));
        // @ts-ignore
        return html.execute(window.page, newTabWasOpen, JSON.parse(validation));
      },
      newTabWasOpen,
      JSON.stringify(validation),
      JSON.stringify(options)
    );
  }

  public async executeBP(page: Page, options: BPOptions | undefined): Promise<BestPracticesReport> {
    await page.addScriptTag({
      path: require.resolve('@qualweb/best-practices')
    });

    return await page.evaluate((options) => {
      // @ts-ignore
      const bp = new BestPractices.BestPractices();
      if (options) bp.configure(options);
      // @ts-ignore
      return bp.execute(window.page);
      // @ts-ignore
    }, options);
  }

  public async executeCounter(page: Page): Promise<CounterReport> {
    await page.addScriptTag({
      path: require.resolve('@qualweb/counter')
    });

    const Counter = <CounterReport>await page.evaluate(() => {
      //@ts-ignore
      return Counter.executeCounter(window.page);
    });
    return Counter;
  }

  public async evaluatePage(
    sourceHtmlHeadContent: string,
    page: Page,
    execute: Execute,
    options: QualwebOptions,
    url: string,
    validation: HTMLValidationReport | undefined
  ): Promise<EvaluationRecord> {
    const evaluator = await this.getEvaluator(page, url);
    const evaluation = new EvaluationRecord(evaluator);

    await this.addQWPage(page);

    if (execute.act) {
      evaluation.addModuleEvaluation(
        'act-rules',
        await this.executeACT(page, sourceHtmlHeadContent, options['act-rules'])
      );
    }
    if (execute.wcag) {
      evaluation.addModuleEvaluation(
        'wcag-techniques',
        await this.executeWCAG(page, options['wcag-techniques'], validation)
      );
    }
    if (execute.bp) {
      evaluation.addModuleEvaluation('best-practices', await this.executeBP(page, options['best-practices']));
    }
    if (execute.wappalyzer) {
      evaluation.addModuleEvaluation('wappalyzer', await executeWappalyzer(url));
    }
    if (execute.counter) {
      evaluation.addModuleEvaluation('counter', await this.executeCounter(page));
    }

    return evaluation;
  }

  private parseUrl(url: string, pageUrl: string): Url {
    const inputUrl = url;
    const completeUrl: string = pageUrl;

    const protocol = completeUrl.split('://')[0];
    const domainName = completeUrl.split('/')[2];

    const tmp = domainName.split('.');
    const domain = tmp[tmp.length - 1];
    const uri = completeUrl.split('.' + domain)[1];

    return {
      inputUrl,
      protocol,
      domainName,
      domain,
      uri,
      completeUrl
    };
  }
}

export { Evaluation, EvaluationRecord };
