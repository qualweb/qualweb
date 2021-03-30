import { Browser, Page, Serializable } from 'puppeteer';
import { QualwebOptions, Url, Evaluator, Execute } from '@qualweb/core';
import { randomBytes } from 'crypto';
import { WCAGOptions, WCAGTechniquesReport } from '@qualweb/wcag-techniques';
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

  public async init(page: Page): Promise<void> {
    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });
    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });
    await page.evaluate(() => {
      //@ts-ignore
      window.qwPage = new Module.QWPage(document, window, true);
    });
    await page.evaluate(() => {
      //@ts-ignore
      window.DomUtils = Utility.DomUtils;
      //@ts-ignore
      window.AccessibilityUtils = Utility.AccessibilityUtils;
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

    await page.evaluate((options: ACTROptions | undefined) => {
      //@ts-ignore
      window.act = new ACT.ACTRules(options);
    }, <Serializable>options);

    await page.keyboard.press('Tab'); // for R72 that needs to check the first focusable element
    await page.evaluate((sourceHtmlHeadContent) => {
      window.act.validateFirstFocusableElementIsLinkToNonRepeatedContent();

      const parser = new DOMParser();
      const sourceDoc = parser.parseFromString('', 'text/html');

      sourceDoc.head.innerHTML = sourceHtmlHeadContent;

      const elements = sourceDoc.querySelectorAll('meta');
      const metaElements = new Array<QWElement>();
      elements.forEach((element: HTMLMetaElement) => {
        //@ts-ignore
        metaElements.push(Module.QWPage.createQWElement(element));
      });

      window.act.validateMetaElements(metaElements);
      window.act.executeAtomicRules();
      window.act.executeCompositeRules();
    }, sourceHtmlHeadContent);

    if (!options || !options.rules || options.rules.includes('QW-ACT-R40') || options.rules.includes('59br37')) {
      const viewport = page.viewport();
      await page.setViewport({
        width: 640,
        height: 512
      });
      await page.evaluate(() => {
        window.act.validateZoomedTextNodeNotClippedWithCSSOverflow();
      });
      if (viewport) {
        await page.setViewport(viewport);
      }
    }

    return page.evaluate(() => {
      return window.act.getReport();
    });
  }

  public async executeWCAG(
    page: Page,
    options: WCAGOptions | undefined,
    validation: HTMLValidationReport | null
  ): Promise<WCAGTechniquesReport> {
    await page.addScriptTag({
      path: require.resolve('@qualweb/wcag-techniques')
    });

    const url = page.url();
    const newTabWasOpen = await this.detectIfUnwantedTabWasOpened(page.browser(), url);

    return await page.evaluate(
      (newTabWasOpen: boolean, validation: HTMLValidationReport, options: WCAGOptions | undefined) => {
        //@ts-ignore
        const wcag = new WCAG.WCAGTechniques(options);
        return wcag.execute(newTabWasOpen, validation);
      },
      newTabWasOpen,
      <Serializable>validation,
      <Serializable>options
    );
  }

  public async executeBP(page: Page, options: BPOptions | undefined): Promise<BestPracticesReport> {
    await page.addScriptTag({
      path: require.resolve('@qualweb/best-practices')
    });

    return await page.evaluate((options: BPOptions | undefined) => {
      //@ts-ignore
      const bp = new BP.BestPractices(options);
      return bp.execute();
    }, <Serializable>options);
  }

  public async executeCounter(page: Page): Promise<CounterReport> {
    await page.addScriptTag({
      path: require.resolve('@qualweb/counter')
    });

    return await page.evaluate(() => {
      return window.executeCounter();
    });
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

    await this.init(page);

    if (execute.act) {
      evaluation.addModuleEvaluation(
        'act-rules',
        await this.executeACT(page, sourceHtmlHeadContent, options['act-rules'])
      );
    }
    if (execute.wcag) {
      evaluation.addModuleEvaluation(
        'wcag-techniques',
        await this.executeWCAG(page, options['wcag-techniques'], validation ?? null)
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

  private async detectIfUnwantedTabWasOpened(browser: Browser, url: string): Promise<boolean> {
    const tabs = await browser.pages();

    let wasOpen = false;

    for (const tab of tabs ?? []) {
      const target = tab.target();
      const opener = target.opener();

      if (opener) {
        const openerPage = await opener.page();
        if (openerPage && openerPage.url() === url) {
          wasOpen = true;
          await tab.close();
        }
      }
    }

    return wasOpen;
  }
}

export { Evaluation, EvaluationRecord };
