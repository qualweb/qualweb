import type { ModuleTranslator } from '@qualweb/locale';
import { Tester } from '@shared/classes';
import { BestPractice } from './BestPractice.object';
import mapping from './mapping';
import * as bestPractices from '../best-practices';

export class BestPracticesTester extends Tester<BestPractice> {

  public init(translator: ModuleTranslator): this {
    for (const bestPractice in bestPractices) {
      const bestPracticeObject = new bestPractices[bestPractice as keyof typeof bestPractices](translator);
      this.assertions.set(bestPracticeObject.getCode(), bestPracticeObject);
      this.toExecute[bestPracticeObject.getCode()] = true;
    }
    return this;
  }

  public execute(): void {
    for (const selector in mapping ?? []) {
      for (const bestPractice of mapping[selector as keyof typeof mapping] ?? []) {
        if (this.toExecute[bestPractice]) {
          this.executeBestPractice(bestPractice, selector);
        }
      }
    }
  }

  private executeBestPractice(bestPractice: string, selector: string): void {
    const bestPracticeObject = this.assertions.get(bestPractice);
    if (bestPracticeObject) {
      const elements = window.qwPage.getElements(selector);
      if (elements.length > 0) {
        elements.forEach((element) => bestPracticeObject.execute(element));
      } else {
        bestPracticeObject.execute();
      }

      this.report.addAssertionResult(bestPracticeObject);
    }
  }
}
