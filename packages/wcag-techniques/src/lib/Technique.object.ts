import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';
import { WCAGTechnique, WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

abstract class Technique {

  private technique: WCAGTechnique;

  constructor(technique: WCAGTechnique) {
    this.technique = technique;
  }

  getTechniqueMapping(): string {
    return this.technique.mapping;
  }

  hasPrincipleAndLevels(principles: string[], levels: string[]): boolean {
    let has = false;
    for (const sc of this.technique.metadata['success-criteria'] || []) {
      if (principles.includes(sc.principle) && levels.includes(sc.level)) {
        has = true;
      }
    }
    return has;
  }

  protected getNumberOfPassedResults(): number {
    return this.technique.metadata.passed;
  }

  protected getNumberOfWarningResults(): number {
    return this.technique.metadata.warning;
  }

  protected getNumberOfFailedResults(): number {
    return this.technique.metadata.failed;
  }

  protected addEvaluationResult(result: WCAGTechniqueResult, element?: QWElement, withText: boolean = true, fullElement: boolean = false): void {
    if (element) {
      const htmlCode = element.getElementHtmlCode(withText, fullElement);
      const pointer = element.getElementSelector();

      result.htmlCode = htmlCode;
      result.pointer = pointer;
    }

    this.technique.results.push(clone(result));

    if (result.verdict !== 'inapplicable') {
      this.technique.metadata[result.verdict]++;
    }
  }

  abstract execute(element: QWElement | undefined, page: QWPage): void;

  getFinalResults() {
    this.outcomeTechnique();
    return cloneDeep(this.technique);
  }

  reset(): void {
    this.technique.metadata.passed = 0;
    this.technique.metadata.warning = 0;
    this.technique.metadata.failed = 0;
    this.technique.results = new Array<WCAGTechniqueResult>();
  }

  private outcomeTechnique(): void {
    if (this.technique.metadata.failed > 0) {
      this.technique.metadata.outcome = 'failed';
    } else if (this.technique.metadata.warning > 0) {
      this.technique.metadata.outcome = 'warning';
    } else if (this.technique.metadata.passed > 0) {
      this.technique.metadata.outcome = 'passed';
    } else {
      this.technique.metadata.outcome = 'inapplicable';
    }

    if (this.technique.results.length > 0) {
      this.addDescription();
    }
  }

  private addDescription(): void {
    for (const result of this.technique.results || []) {
      if (result.verdict === this.technique.metadata.outcome) {
        this.technique.metadata.description = <string>result.description;
        break;
      }
    }
  }
}

export = Technique;