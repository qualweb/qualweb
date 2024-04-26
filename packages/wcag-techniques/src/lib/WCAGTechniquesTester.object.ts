import type { ModuleTranslator } from '@qualweb/locale';
import type { TestingData, HTMLValidationReport } from '@shared/types';
import { Tester } from '@shared/classes';
import { Technique } from './Technique.object';
import mapping from './mapping';
import * as techniques from '../techniques';

export class WCAGTechniquesTester extends Tester<Technique> {
  public init(translator: ModuleTranslator): this {
    for (const technique in techniques) {
      const techniqueObject = new techniques[technique as keyof typeof techniques](translator);
      this.assertions.set(techniqueObject.getCode(), techniqueObject);
      this.toExecute[techniqueObject.getCode()] = true;
    }
    return this;
  }

  public execute(data: TestingData): void {
    this.executeTechniques();
    this.checkHTMLValidation(data.validation);
    this.checkForUnwantedTabs(!!data.newTabWasOpen);
  }

  private executeTechniques(): void {
    const selectors = Object.keys(mapping);
    for (const selector of selectors ?? []) {
      for (const technique of mapping[selector as keyof typeof mapping] ?? []) {
        if (this.toExecute[technique]) {
          this.executeTechnique(technique, selector);
        }
      }
    }
  }

  private executeTechnique(technique: string, selector: string): void {
    const techniqueObject = this.assertions.get(technique);
    if (techniqueObject) {
      const elements = window.qwPage.getElements(selector);
      if (elements.length > 0) {
        elements.forEach((element) => techniqueObject.execute(element));
      } else {
        techniqueObject.execute();
      }

      this.report.addAssertionResult(techniqueObject);
    }
  }

  private checkHTMLValidation(validation?: HTMLValidationReport): void {
    const t16 = this.assertions.get('QW-WCAG-T16');
    if (this.toExecute['QW-WCAG-T16'] && t16) {
      (<techniques.QW_WCAG_T16>t16).validate(validation);
      this.report.addAssertionResult(t16);
    }
  }

  private checkForUnwantedTabs(newTabWasOpen: boolean): void {
    const t22 = this.assertions.get('QW-WCAG-T22');
    if (this.toExecute['QW-WCAG-T22'] && t22) {
      (<techniques.QW_WCAG_T22>t22).validate(newTabWasOpen);
      this.report.addAssertionResult(t22);
    }
  }
}
