import type { ModuleTranslator } from '@qualweb/core/locale';
import { Tester } from '@qualweb/core/evaluation';
import mapping from './mapping';
import * as checks from '../checks';

export class CUIChecksTester extends Tester {
  public init(translator: ModuleTranslator): this {
    for (const check in checks) {
      const checkObject = new checks[check as keyof typeof checks](translator);
      this.assertions.set(checkObject.getCode(), checkObject);
      this.toExecute[checkObject.getCode()] = true;
    }
    return this;
  }

  public execute(): void {
    this.executeChecks();
  }

  private executeChecks(): void {
    const selectors = Object.keys(mapping);
    for (const selector of selectors ?? []) {
      for (const check of mapping[selector as keyof typeof mapping] ?? []) {
        if (this.toExecute[check]) {
          this.executeCheck(check, selector);
        }
      }
    }
  }

  private executeCheck(check: string, selector: string): void {
    const checkObject = this.assertions.get(check);
    if (checkObject) {
      const elements = window.qwPage.getElements(selector);
      if (elements.length > 0) {
        elements.forEach((element) => checkObject.execute?.(element));
      } else {
        checkObject.execute?.();
      }

      this.report.addAssertionResult(checkObject);
    }
  }

}
