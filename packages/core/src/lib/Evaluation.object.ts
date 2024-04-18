import { Page } from 'puppeteer';
import { randomBytes } from 'crypto';
import type { CounterReport } from '@qualweb/counter';
import type { TranslationOptions } from '@qualweb/locale';
import type {
  ModuleOptions,
  QualwebOptions,
  Url,
  Evaluator,
  Execute,
  EvaluationReport,
  HTMLValidationReport,
  QualwebReport
} from '@qualweb/lib';
import { ACTRules } from '@qualweb/act-rules';
import { WCAGTechniques } from '@qualweb/wcag-techniques';
import { BestPractices } from '@qualweb/best-practices';
import { EvaluationRecord } from './EvaluationRecord.object';

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
  ): Promise<QualwebReport> {
    const evaluator = await this.getEvaluator();
    const evaluation = new EvaluationRecord(evaluator);

    await this.init();

    const locale = options.translate;

    try {
      if (this.execute.act) {
        evaluation.addModuleEvaluation('act-rules', await this.executeACT(sourceHtml, locale, options['act-rules']));
      }
    } catch (error) {
      console.log('Error in ACT-Rules');
      console.log(error);
    }

    try {
      if (this.execute.wcag) {
        evaluation.addModuleEvaluation(
          'wcag-techniques',
          await this.executeWCAG(locale, validation, options['wcag-techniques'])
        );
      }
    } catch (error) {
      console.log('Error in WCAG-Techniques');
      console.log(error);
    }

    try {
      if (this.execute.bp) {
        evaluation.addModuleEvaluation('best-practices', await this.executeBP(locale, options['best-practices']));
      }
    } catch (error) {
      console.log('Error in Best Practices');
      console.log(error);
    }
    if (this.execute.counter) {
      evaluation.addModuleEvaluation('counter', await this.executeCounter());
    }

    return evaluation.getFinalReport();
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
      version: '4.0.0',
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
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/locale'),
      type: 'text/javascript'
    });
  }

  private async executeACT(
    sourceHtml: string,
    locale: TranslationOptions,
    options?: ModuleOptions
  ): Promise<EvaluationReport> {
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/act-rules'),
      type: 'text/javascript'
    });

    await this.page.evaluate(
      (sourceHtml: string, locale: TranslationOptions, options?: ModuleOptions) => {
        window.act = new ACTRules(locale).configure(options ?? {}).test({ sourceHtml });
      },
      sourceHtml,
      locale,
      options
    );

    if (
      !options ||
      ((!options.include || options.include.includes('QW-ACT-R40') || options.include.includes('59br37')) &&
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

      await this.page.evaluate(() => window.act.testSpecial());

      if (viewport) {
        await this.page.setViewport(viewport);
      }
    }

    return this.page.evaluate(() => window.act.getReport());
  }

  private async executeWCAG(
    locale: TranslationOptions,
    validation?: HTMLValidationReport,
    options?: ModuleOptions
  ): Promise<EvaluationReport> {
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/wcag-techniques'),
      type: 'text/javascript'
    });

    const newTabWasOpen = await this.detectIfUnwantedTabWasOpened();

    return await this.page.evaluate(
      (
        locale: TranslationOptions,
        newTabWasOpen: boolean,
        validation?: HTMLValidationReport,
        options?: ModuleOptions
      ) => {
        return new WCAGTechniques(locale)
          .configure(options ?? {})
          .test({ newTabWasOpen, validation })
          .getReport();
      },
      locale,
      newTabWasOpen,
      validation,
      options
    );
  }

  private async executeBP(locale: TranslationOptions, options?: ModuleOptions): Promise<EvaluationReport> {
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/best-practices'),
      type: 'text/javascript'
    });

    return await this.page.evaluate(
      (locale: TranslationOptions, options?: ModuleOptions) => {
        return new BestPractices(locale)
          .configure(options ?? {})
          .test({})
          .getReport();
      },
      locale,
      options
    );
  }

  private async executeCounter(): Promise<CounterReport> {
    await this.page.addScriptTag({
      path: require.resolve('@qualweb/counter'),
      type: 'text/javascript'
    });

    return this.page.evaluate(() => window.executeCounter());
  }

  private async detectIfUnwantedTabWasOpened(): Promise<boolean> {
    const tabs = await this.page.browser().pages();

    let unwantedTabOpened = false;

    for (const tab of tabs ?? []) {
      const target = tab.target();
      const opener = target.opener();

      if (opener) {
        const openerPage = await opener.page();
        if (openerPage && openerPage.url() === this.page.url()) {
          unwantedTabOpened = true;
          await tab.close();
        }
      }
    }

    return unwantedTabOpened;
  }
}

export { Evaluation, EvaluationRecord };
