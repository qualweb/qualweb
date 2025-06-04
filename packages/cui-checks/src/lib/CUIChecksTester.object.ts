import type { ModuleTranslator } from '@qualweb/core/locale';
import { Tester } from '@qualweb/core/evaluation';
import { generateMappings } from './mapping';
import * as checks from '../checks';
import { QWCUI_Selectors } from './selectors';
import { Check } from './Check.object';

export class CUIChecksTester extends Tester {
  private mapping: { [key: string]: string[] } = {};
  private settings: { [key: string]: string | number | boolean } = {};
  public init(translator: ModuleTranslator): this {
    for (const check in checks) {
      const checkObject = new checks[check as keyof typeof checks](translator, this.settings);
      this.assertions.set(checkObject.getCode(), checkObject);
      this.toExecute[checkObject.getCode()] = true;
    }
    return this;
  }

  public async execute(): Promise<void> {
    await this.executeChecks();
  }

  public configureSelectors(uiSelectors: QWCUI_Selectors): void {
    this.mapping = generateMappings(uiSelectors);
  }
  public setSettings(settings: { [key: string]: string | number | boolean }): void {
    this.settings = settings;
  }

  private async executeChecks(): Promise<void> {
    const selectors = Object.keys(this.mapping);
    for (const selector of selectors ?? []) {
      for (const check of this.mapping[selector as keyof typeof this.mapping] ?? []) {
        if (this.toExecute[check]) {
          await this.executeCheck(check, selector);
        }
      }
    }
  }

  private async executeCheck(check: string, selector: string): Promise<void> {
    const checkObject = this.assertions.get(check);
    if (checkObject) {
      const elements = window.qwPage.getElements(selector);
      if (elements.length > 0) {
        for (const element of elements) {
          await (checkObject as Check).execute?.(element);
        }
      } else {
        await (checkObject as Check).execute?.();
      }

      this.report.addAssertionResult(checkObject);
    }
  }
}
