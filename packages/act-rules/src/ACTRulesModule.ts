import type {
  EvaluationReport,
  ModuleOptions,
  TestingData,
} from '@qualweb/core/evaluation';
import {
  ModuleType,
  ExecutableModuleContext,
} from '@qualweb/core/evaluation';
import type { TranslationOptions } from '@qualweb/locale';
import type { QualwebPage } from '@qualweb/core/lib';

export class ACTRulesModule extends ExecutableModuleContext {
  public readonly name = ModuleType.ACT_RULES;

  protected getModulePackage(): string {
    return '@qualweb/act-rules';
  }

  protected async runModule(
    page: QualwebPage,
    options: ModuleOptions,
    translate: TranslationOptions,
    data: TestingData
  ): Promise<EvaluationReport> {
    await page.evaluate(
      (translate: TranslationOptions, options: ModuleOptions, data: TestingData) => {
        //@ts-expect-error The package exists inside the context of the WebPage
        window.act = new ACTRulesRunner(options, translate).configure(options).test(data);
      },
      translate,
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

      await page.evaluate(() => {
        //@ts-expect-error The package exists inside the context of the WebPage
        window.act.testSpecial?.()
      });

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

    return page.evaluate(() => {
      //@ts-expect-error The package exists inside the context of the WebPage
      return window.act.getReport()
    });
  }

  private testSpecialCases(options: ModuleOptions): boolean {
    return (
      !options ||
      ((!options.include || options.include.includes('QW-ACT-R40') || options.include.includes('59br37')) &&
        (!options.exclude || !options.exclude.includes('QW-ACT-R40') || !options.exclude.includes('59br37')))
    );
  }
}
