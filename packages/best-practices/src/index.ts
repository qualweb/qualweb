import { BPOptions, BestPracticesReport } from '@qualweb/best-practices';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import * as bestPractices from './lib/bestPractices';
import mapping from './lib/mapping';

class BestPractices {
  private bestPractices: any;
  private bestPracticesToExecute: any;

  constructor(options?: BPOptions) {
    this.bestPractices = {};
    this.bestPracticesToExecute = {};

    for (const bp of Object.keys(bestPractices) || []) {
      const _bp = bp.replace(/_/g, '-');
      // @ts-ignore
      this.bestPractices[_bp] = new bestPractices[bp]();
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
      for (const bp of Object.keys(this.bestPractices) || []) {
        this.bestPracticesToExecute[bp] = options.bestPractices.includes(bp);
      }
    }
  }

  public resetConfiguration(): void {
    for (const bp in this.bestPracticesToExecute || {}) {
      this.bestPracticesToExecute[bp] = true;
    }
  }

  private evaluateElement(bestPractice: string, element: QWElement | undefined, page: QWPage): void {
    try {
      this.bestPractices[bestPractice].execute(element, page);
    } catch (err) {
      console.error(err);
    }
  }

  private executeBP(bestPractice: string, selector: string, page: QWPage, report: BestPracticesReport): void {
    const elements = page.getElements(selector);

    if (elements.length > 0) {
      for (const elem of elements || []) {
        this.evaluateElement(bestPractice, elem, page);
      }
    } else {
      this.evaluateElement(bestPractice, undefined, page);
    }

    report.assertions[bestPractice] = this.bestPractices[bestPractice].getFinalResults();
    // @ts-ignore
    report.metadata[report.assertions[bestPractice].metadata.outcome]++;
    this.bestPractices[bestPractice].reset();
  }

  public execute(page: QWPage): BestPracticesReport {
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

    for (const selector of Object.keys(mapping) || []) {
      // @ts-ignore
      for (const bestPractice of mapping[selector] || []) {
        if (this.bestPracticesToExecute[bestPractice]) {
          this.executeBP(bestPractice, selector, page, report);
        }
      }
    }

    return report;
  }
}

export { BestPractices };
