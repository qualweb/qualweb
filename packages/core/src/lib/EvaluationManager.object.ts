import { randomBytes } from 'crypto';
import type { QualwebOptions, Url, SystemData, ModulesToExecute, QualwebReport } from '@shared/types';
import { ModuleType } from '@shared/types';
import { LocaleFetcher, ModuleTranslator } from '@packages/locale/src';
import { Module, ModuleFactory } from '../modules/';
import { Report, QualwebPage } from '.';

export class EvaluationManager {
  /**
   * Qualweb page abstraction around a Puppeteer page
   */
  private readonly page: QualwebPage;

  /**
   * Modules to execute
   */
  private readonly modules = {} as { [module in ModuleType]: Module };

  constructor(page: QualwebPage, modulesToExecute?: ModulesToExecute) {
    this.page = page;

    for (const moduleName in ModuleType) {
      if (!modulesToExecute || modulesToExecute[moduleName as ModuleType]) {
        const evaluationModule = ModuleFactory.createModule(moduleName as ModuleType, page);
        this.modules[evaluationModule.name] = evaluationModule;
      }
    }
  }

  public async evaluate(options: QualwebOptions): Promise<QualwebReport> {
    const systemData = await this.getSystemData();
    const report = new Report(systemData);

    const translate = LocaleFetcher.transform(options.translate);

    const testingData = await this.page.getTestingData(options);

    for (const name in this.modules) {
      const translator = new ModuleTranslator(name as ModuleType, translate);
      const moduleReport = await this.modules[name as ModuleType].execute(
        options.modules?.[name as ModuleType] ?? {},
        translator,
        testingData
      );
      report.addModuleReport(moduleReport);
    }

    return report.getCopy();
  }

  private async getSystemData(): Promise<SystemData> {
    const [html, title, elementCount, userAgent] = await Promise.all([
      this.page.getOuterHTML(),
      this.page.getTitle(),
      this.page.getNumberOfHTMLElements(),
      this.page.getUserAgent()
    ]);

    const viewport = this.page.getViewport();

    return {
      name: 'QualWeb',
      description: 'QualWeb is an automatic accessibility evaluator for webpages.',
      version: '4.0.0',
      homepage: 'http://www.qualweb.di.fc.ul.pt/',
      date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      hash: randomBytes(64).toString('hex'),
      url: this.page.getUrl() ? this.parseUrl() : undefined,
      page: {
        viewport: {
          mobile: viewport?.isMobile,
          landscape: viewport?.isLandscape,
          userAgent,
          resolution: {
            width: viewport?.width,
            height: viewport?.height
          }
        },
        dom: {
          html,
          title,
          elementCount
        }
      }
    };
  }

  private parseUrl(): Url {
    const completeUrl = this.page.getUrl();

    const urlObject = new URL(completeUrl);

    const protocol = urlObject.protocol.split(':')[0];
    const domainName = urlObject.origin.split('/')[2];

    const tmp = domainName.split('.');
    const domain = tmp[tmp.length - 1];
    const uri = urlObject.pathname;

    return {
      protocol,
      domainName,
      domain,
      uri,
      completeUrl
    };
  }
}
