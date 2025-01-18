import type { ModuleTranslator } from '@qualweb/core/locale';
import { Tester } from '@qualweb/core/evaluation';
import {generateMappings} from './mapping';
import * as checks from '../checks';
import { QWCUI_Selectors } from './selectors';


export class CUIChecksTester extends Tester {

  private mapping: { [key: string]: string[] } = {};
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

  public configureSelectors(uiSelectors: QWCUI_Selectors): void {
    this.mapping = generateMappings(uiSelectors);
    console.log("Generated mapping",this.mapping);
  }
  


  private executeChecks(): void {
    const selectors = Object.keys(this.mapping);
    for (const selector of selectors ?? []) {
      for (const check of this.mapping[selector as keyof typeof this.mapping] ?? []) {
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
