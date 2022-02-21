import { Page, Serializable } from 'puppeteer';
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
import { Translate } from '@qualweb/locale';

class Evaluation {
  private readonly url: string;
  private readonly page: Page;
  private readonly execute: Execute;

  constructor(url: string, page: Page, execute: Execute) {
    this.url = url;
    this.page = page;
    this.execute = execute;
  }

  public async evaluatePage(
    sourceHtml: string,
    options: QualwebOptions,
    validation?: HTMLValidationReport
  ): Promise<EvaluationRecord> {
    const evaluator = await this.getEvaluator();
    const evaluation = new EvaluationRecord(evaluator);

    await this.init();

    const locale = <Translate>options.translate;

    if (this.execute.act) {
      evaluation.addModuleEvaluation('act-rules', await this.executeACT(sourceHtml, locale, options['act-rules']));
    }
    if (this.execute.wcag) {
      evaluation.addModuleEvaluation(
        'wcag-techniques',
        await this.executeWCAG(locale, validation, options['wcag-techniques'])
      );
    }
    if (this.execute.bp) {
      evaluation.addModuleEvaluation('best-practices', await this.executeBP(locale, options['best-practices']));
    }
    if (this.execute.wappalyzer) {
      evaluation.addModuleEvaluation('wappalyzer', await executeWappalyzer(this.url));
    }
    if (this.execute.counter) {
      evaluation.addModuleEvaluation('counter', await this.executeCounter());
    }

    return evaluation;
  }

  private async getEvaluator(): Promise<Evaluator> {
    const [plainHtml, pageTitle, elements, browserUserAgent] = await Promise.all([
      this.page.evaluate(() => {
        return document.documentElement.outerHTML;
      }),
      this.page.title(),
      this.page.$$('*'),
      this.page.browser().userAgent()
    ]);

    const viewport = this.page.viewport();

    return {
      name: 'QualWeb',
      description: 'QualWeb is an automatic accessibility evaluator for webpages.',
      version: '3.0.0',
      homepage: 'http://www.qualweb.di.fc.ul.pt/',
      date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      hash: randomBytes(64).toString('hex'),
      url: this.url ? this.parseUrl() : undefined,
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

  private parseUrl(): Url {
    const inputUrl = this.url;
    const completeUrl = this.page.url() !== 'about:blank' ? this.page.url() : this.url;

    const urlObject = new URL(completeUrl);

    const protocol = urlObject.protocol.split(':')[0];
    const domainName = urlObject.origin.split('/')[2];

    const tmp = domainName.split('.');
    const domain = tmp[tmp.length - 1];
    const uri = urlObject.pathname;

    return {
      inputUrl,
      protocol,
      domainName,
      domain,
      uri,
      completeUrl
    };
  }

  private async init(): Promise<void> {
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/qw-page'),
      type: 'text/javascript'
    });
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/util'),
      type: 'text/javascript'
    });
  }

  private async executeACT(sourceHtml: string, locale: Translate, options?: ACTROptions): Promise<ACTRulesReport> {
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/act-rules'),
      type: 'text/javascript'
    });

    await this.page.keyboard.press('Tab'); // for R72 that needs to check the first focusable element
    await this.page.evaluate(
      (sourceHtml: string, locale: string, options?: ACTROptions) => {
        // @ts-ignore
        window.act = new ACTRules(JSON.parse(locale), options);

        window.act.validateFirstFocusableElementIsLinkToNonRepeatedContent();

        const parser = new DOMParser();
        const sourceDoc = parser.parseFromString('', 'text/html');

        sourceDoc.documentElement.innerHTML = sourceHtml;

        const elements = sourceDoc.querySelectorAll('meta');
        const metaElements = new Array<QWElement>();
        elements.forEach((element: HTMLMetaElement) => {
          metaElements.push(window.qwPage.createQWElement(element));
        });

        window.act.validateMetaElements(metaElements);
        window.act.executeAtomicRules();
        window.act.executeCompositeRules();
      },
      sourceHtml,
      JSON.stringify(locale),
      <Serializable>options
    );

    if (
      !options ||
      ((!options.rules || options.rules.includes('QW-ACT-R40') || options.rules.includes('59br37')) &&
        (!options.exclude || !options.exclude.includes('QW-ACT-R40') || !options.exclude.includes('59br37')))
    ) {
      const viewport = this.page.viewport();

      await this.page.setViewport({
        width: 640,
        height: 512,
        isMobile: viewport?.isMobile,
        isLandscape: viewport?.isLandscape,
        hasTouch: viewport?.hasTouch
      });

      await this.page.evaluate(() => {
        window.act.validateZoomedTextNodeNotClippedWithCSSOverflow();
      });

      if (viewport) {
        await this.page.setViewport(viewport);
      }
    }

    return this.page.evaluate(() => {
      return window.act.getReport();
    });
  }

  private async executeWCAG(
    locale: Translate,
    validation?: HTMLValidationReport,
    options?: WCAGOptions
  ): Promise<WCAGTechniquesReport> {
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/wcag-techniques'),
      type: 'text/javascript'
    });

    const newTabWasOpen = await this.detectIfUnwantedTabWasOpened();

    return await this.page.evaluate(
      (locale: string, newTabWasOpen: boolean, validation: HTMLValidationReport, options?: WCAGOptions) => {
        //@ts-ignore
        window.wcag = new WCAGTechniques(JSON.parse(locale), options);
        return window.wcag.execute(newTabWasOpen, validation);
      },
      JSON.stringify(locale),
      newTabWasOpen,
      <Serializable>(validation ?? null),
      <Serializable>options
    );
  }

  private async executeBP(locale: Translate, options?: BPOptions): Promise<BestPracticesReport> {
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/best-practices'),
      type: 'text/javascript'
    });

    return await this.page.evaluate(
      (locale: string, options?: BPOptions) => {
        //@ts-ignore
        const bp = new BestPractices(JSON.parse(locale), options);
        return bp.execute();
      },
      JSON.stringify(locale),
      <Serializable>options
    );
  }

  private async executeCounter(): Promise<CounterReport> {
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/counter'),
      type: 'text/javascript'
    });

    return this.page.evaluate(() => {
      return window.executeCounter();
    });
  }

  private async detectIfUnwantedTabWasOpened(): Promise<boolean> {
    const tabs = await this.page.browser().pages();

    let wasOpen = false;

    for (const tab of tabs ?? []) {
      const target = tab.target();
      const opener = target.opener();

      if (opener) {
        const openerPage = await opener.page();
        if (openerPage && openerPage.url() === this.page.url()) {
          wasOpen = true;
          await tab.close();
        }
      }
    }

    return wasOpen;
  }
}

export { Evaluation, EvaluationRecord };
