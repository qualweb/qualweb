import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Test from './Test.object';

abstract class Technique {
  private readonly technique: WCAGTechnique;

  constructor(technique: WCAGTechnique) {
    this.technique = technique;
  }

  public getTechniqueMapping(): string {
    return this.technique.mapping;
  }

  public hasPrincipleAndLevels(principles: Array<string>, levels: Array<string>): boolean {
    let has = false;
    for (const sc of this.technique.metadata['success-criteria'] ?? []) {
      if (principles.includes(sc.principle) && levels.includes(sc.level)) {
        has = true;
      }
    }
    return has;
  }

  protected getNumberOfWarningResults(): number {
    return this.technique.metadata.warning;
  }

  protected getNumberOfFailedResults(): number {
    return this.technique.metadata.failed;
  }

  protected addTestResult(result: Test): void {
    this.technique.results.push(result);

    if (result.verdict !== 'inapplicable') {
      this.technique.metadata[result.verdict]++;
    }
  }

  abstract execute(element: typeof window.qwElement | undefined): void;

  public getFinalResults(): WCAGTechnique {
    this.outcomeTechnique();
    return this.technique;
  }

  private outcomeTechnique(): void {
    if (this.technique.metadata.failed) {
      this.technique.metadata.outcome = 'failed';
    } else if (this.technique.metadata.warning) {
      this.technique.metadata.outcome = 'warning';
    } else if (this.technique.metadata.passed) {
      this.technique.metadata.outcome = 'passed';
    } else {
      this.technique.metadata.outcome = 'inapplicable';
      this.technique.metadata.inapplicable = 1;
    }

    if (this.technique.results.length > 0) {
      this.addDescription();
    }
  }

  private addDescription(): void {
    for (const result of this.technique.results ?? []) {
      if (result.verdict === this.technique.metadata.outcome) {
        this.technique.metadata.description = <string>result.description;
        break;
      }
    }
  }
}

export = Technique;
