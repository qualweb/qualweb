import type { EvaluationReport, ModuleOptions, TestingData } from '@shared/types';
import { ModuleType } from '@shared/types';
import type { ModuleTranslator } from '@packages/locale/src';
import type { QualwebPage } from '../lib';
import { Module } from '.';

export class ACTRulesModule extends Module {
  public readonly name = ModuleType.ACT_RULES;

  protected getModulePackage(): string {
    return '@qualweb/act-rules';
  }

  protected async runModule(
    page: QualwebPage,
    options: ModuleOptions,
    translator: ModuleTranslator,
    data: TestingData
  ): Promise<EvaluationReport> {
    await page.evaluate(
      (translator: ModuleTranslator, options: ModuleOptions, data: TestingData) => {
        //@ts-expect-error The package exists inside the context of the WebPage
        window.act = new ACTRules(translator).configure(options).test(data);
      },
      translator,
      options,
      data
    );

    if (this.testSpecialCases(options)) {
      const viewport = page.getViewport();

      await page.setViewport({
        resolution: {
          width: 640,
          height: 512
        },
        mobile: viewport?.isMobile,
        landscape: viewport?.isLandscape,
        touch: viewport?.hasTouch
      });

      await page.evaluate(() => window.act.testSpecial?.());

      if (viewport) {
        await page.setViewport({
          resolution: {
            width: viewport.width,
            height: viewport.height
          },
          mobile: viewport?.isMobile,
          landscape: viewport?.isLandscape,
          touch: viewport?.hasTouch
        });
      }
    }

    return page.evaluate(() => window.act.getReport());
  }

  private testSpecialCases(options: ModuleOptions): boolean {
    return (
      !options ||
      ((!options.include || options.include.includes('QW-ACT-R40') || options.include.includes('59br37')) &&
        (!options.exclude || !options.exclude.includes('QW-ACT-R40') || !options.exclude.includes('59br37')))
    );
  }
}
