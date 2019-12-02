'use strict';

import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
import { CSSTechnique, CSSTechniqueResult } from '@qualweb/css-techniques';
import { CSSStylesheet } from '@qualweb/get-dom-puppeteer';
import css from 'css';

abstract class Technique {

  private technique: CSSTechnique;

  constructor(technique: CSSTechnique) {
    this.technique = technique;
  }

  public getTechniqueMapping(): string {
    return this.technique.mapping;
  }

  public hasPrincipleAndLevels(principles: string[], levels: string[]): boolean {
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

  protected getNumberOfInapplicableResults(): number {
    return this.technique.metadata.inapplicable;
  }

  protected fillEvaluation(verdict: '' | 'passed' | 'failed' | 'warning' | 'inapplicable', description: string,
                          cssCode?: string, stylesheetFile?: string,
                          selectorValue?: string, selectorPosition?: css.Position,
                          propertyName?: string, propertyValue?: string, propertyPosition?: css.Position) {

    const evaluation: CSSTechniqueResult = {
      verdict: verdict,
      description: description
    };

    if (verdict !== 'inapplicable' && selectorValue && propertyName && propertyValue){
      evaluation.cssCode = cssCode;
      evaluation.stylesheetFile = stylesheetFile;
      evaluation.selector = {value: selectorValue, position: selectorPosition};
      evaluation.property = {name: propertyName, value: propertyValue, position: propertyPosition};
    }
    
    this.addEvaluationResult(evaluation);
  }

  protected addEvaluationResult(result: CSSTechniqueResult): void {
    this.technique.results.push(clone(result));
    this.technique.metadata[result.verdict]++;
  }

  abstract async execute(styleSheets: CSSStylesheet[]): Promise<void>;

  public getFinalResults() {
    this.outcomeTechnique();
    return cloneDeep(this.technique);
  }

  public reset(): void {
    this.technique.metadata.passed = 0;
    this.technique.metadata.warning = 0;
    this.technique.metadata.failed = 0;
    this.technique.metadata.inapplicable = 0;
    this.technique.results = new Array<CSSTechniqueResult>();
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
        this.technique.metadata.description = <string> result.description;
        break;
      }
    }
  }
}

export = Technique;