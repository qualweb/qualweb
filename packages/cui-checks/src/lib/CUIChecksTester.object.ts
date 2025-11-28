import type { ModuleTranslator } from '@qualweb/core/locale';
import { Tester } from '@qualweb/core/evaluation';
import { generateMappings } from './mapping';
import * as checks from '../checks';
import { QWCUI_Selectors } from './selectors';
import { Check } from './Check.object';
import { RuleTest } from './types';

export class CUIChecksTester extends Tester {
  private mapping: { [key: string]: string[] } = {};
  private settings: { [key: string]: string | number | boolean } = {};
  private rules: Record<string, RuleTest> = {};
  public init(translator: ModuleTranslator): this {
    for (const check in checks) {
      const normalizedCode = check.replace(/_/g, "-");
      const checkObject = new checks[check as keyof typeof checks](translator, this.settings,this.rules[normalizedCode]);
      this.assertions.set(checkObject.getCode(), checkObject);
      this.toExecute[checkObject.getCode()] = true;
    }
    return this;
  }

  public async execute(): Promise<void> {
    await this.executeChecks();
  }

  public configure(settings: { [key: string]: string | number | boolean },uiSelectors: QWCUI_Selectors,rules?: RuleTest[]): void {
    let rulesSelectors = {};
    this.settings = settings;
    if (rules){
      rulesSelectors = rules.reduce<{ [key: string]: string }>((acc, rule) => {
        this.rules[rule.code] = rule;
        acc[rule.code] = rule.selector;
        return acc;
      }, {});
    }
    const selectors = { ...uiSelectors as any, ...rulesSelectors };
    this.mapping = generateMappings(selectors);
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
