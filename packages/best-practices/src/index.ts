import { BPOptions, BestPracticesReport, BPMapping } from '@qualweb/best-practices';
import * as bestPractices from './lib/bestPractices';
import mapping from './lib/mapping';
import BestPracticeObject from './lib/BestPractice.object';
import { Translate } from '@qualweb/locale';

class BestPractices {
  private readonly bestPractices: { [bp: string]: BestPracticeObject };
  private readonly bestPracticesToExecute: { [bp: string]: boolean };

  constructor(locale: Translate, options?: BPOptions) {
    this.bestPractices = {};
    this.bestPracticesToExecute = {};

    for (const bp of Object.keys(bestPractices) ?? []) {
      const _bp = bp.replace(/_/g, '-');
      // @ts-ignore
      this.bestPractices[_bp] = new bestPractices[bp](locale);
      this.bestPracticesToExecute[_bp] = true;
    }

    if (options) {
      this.configure(options);
    }
  }

  public configure(options: BPOptions): void {
    this.resetConfiguration();

    if (options.bestPractices) {
      options.bestPractices = options.bestPractices.map((bp) => bp.toUpperCase().trim());
      for (const bp of Object.keys(this.bestPractices) ?? []) {
        this.bestPracticesToExecute[bp] = options.bestPractices.includes(bp);
      }
    }
    if (options.exclude) {
      options.exclude = options.exclude.map((bp) => bp.toUpperCase().trim());
      for (const bp of options.exclude ?? []) {
        this.bestPracticesToExecute[bp] = false;
      }
    }
  }

  public resetConfiguration(): void {
    for (const bp in this.bestPracticesToExecute ?? {}) {
      this.bestPracticesToExecute[bp] = true;
    }
  }

  private executeBP(
    bestPractice: string,
    selector: string,
    report: BestPracticesReport
  ): void {
    const elements = window.qwPage.getElements(selector);
    if (elements.length > 0) {
      for (const elem of elements ?? []) {
        this.bestPractices[bestPractice].execute(elem);
      }
    } else {
      this.bestPractices[bestPractice].execute(undefined);
    }

    report.assertions[bestPractice] = this.bestPractices[bestPractice].getFinalResults();
    report.metadata[report.assertions[bestPractice].metadata.outcome]++;
  }

  public execute(): BestPracticesReport {
    const report: BestPracticesReport = {
      type: 'best-practices',
      metadata: {
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0
      },
      assertions: {}
    };
    
    for (const selector of Object.keys(mapping) ?? []) {
      const _mapping = <BPMapping>mapping;
      for (const bestPractice of _mapping[selector] ?? []) {
        if (this.bestPracticesToExecute[bestPractice]) {
          this.executeBP(bestPractice, selector, report);
        }
      }
    }
    
    return report;
  }
}

export { BestPractices };
