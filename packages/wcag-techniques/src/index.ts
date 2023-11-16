import { WCAGOptions, WCAGTechniquesReport } from '@qualweb/wcag-techniques';
import * as techniques from './lib/techniques';
import mapping from './lib/mapping';
import { HTMLValidationReport } from '@qualweb/html-validator';
import Technique from './lib/Technique.object';
import { QW_WCAG_T16, QW_WCAG_T22 } from './lib/techniques';
import { Translate } from '@qualweb/locale';

class WCAGTechniques {
  private readonly techniques: { [technique: string]: Technique };
  private readonly techniquesToExecute: { [technique: string]: boolean };

  constructor(locale: Translate, options?: WCAGOptions) {
    this.techniques = {};
    this.techniquesToExecute = {};

    for (const technique of Object.keys(techniques) ?? []) {
      const _technique = technique.replace(/_/g, '-');
      //@ts-ignore
      this.techniques[_technique] = new techniques[technique](locale);
      this.techniquesToExecute[_technique] = true;
    }

    if (options) {
      this.configure(options);
    }
  }

  public configure(options: WCAGOptions): void {
    if (options.techniques) {
      options.techniques = options.techniques.map((t) => t.toUpperCase().trim());
    }
    if (options.exclude) {
      options.exclude = options.exclude.map((t: string) => {
        return t.toLowerCase().startsWith('qw') ? t.toUpperCase().trim() : t.trim();
      });
    }

    for (const technique of Object.keys(this.techniques) || []) {
      this.techniquesToExecute[technique] = true;

      if (options.principles && options.principles.length !== 0) {
        if (options.levels && options.levels.length !== 0) {
          if (!this.techniques[technique].hasPrincipleAndLevels(options.principles, options.levels)) {
            this.techniquesToExecute[technique] = false;
          }
        } else if (!this.techniques[technique].hasPrincipleAndLevels(options.principles, ['A', 'AA', 'AAA'])) {
          this.techniquesToExecute[technique] = false;
        }
      } else if (options.levels && options.levels.length !== 0) {
        if (
          !this.techniques[technique].hasPrincipleAndLevels(
            ['Perceivable', 'Operable', 'Understandable', 'Robust'],
            options.levels
          )
        ) {
          this.techniquesToExecute[technique] = false;
        }
      }
      if (!options.principles && !options.levels) {
        if (options.techniques && options.techniques.length !== 0) {
          if (
            !options.techniques.includes(technique) &&
            !options.techniques.includes(this.techniques[technique]?.getTechniqueMapping())
          ) {
            this.techniquesToExecute[technique] = false;
          }
        }
      } else {
        if (options.techniques && options.techniques.length !== 0) {
          if (
            options.techniques.includes(technique) ||
            options.techniques.includes(this.techniques[technique]?.getTechniqueMapping())
          ) {
            this.techniquesToExecute[technique] = true;
          }
        }
      }
      if (options.exclude && options.exclude.length !== 0) {
        if (
          options.exclude.includes(technique) ||
          options.exclude.includes(this.techniques[technique]?.getTechniqueMapping())
        ) {
          this.techniquesToExecute[technique] = false;
        }
      }
    }
  }

  public resetConfiguration(): void {
    for (const technique in this.techniquesToExecute ?? {}) {
      this.techniquesToExecute[technique] = true;
    }
  }

  private executeTechnique(technique: string, selector: string, report: WCAGTechniquesReport): void {
    const elements = window.qwPage.getElements(selector);
    if (elements.length > 0) {
      for (const elem of elements || []) {
        try {
          this.techniques[technique].execute(elem);
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      try {
        this.techniques[technique].execute(undefined);
      } catch (err) {
        console.error(err);
      }
    }

    report.assertions[technique] = this.techniques[technique].getFinalResults();
    report.metadata[report.assertions[technique].metadata.outcome]++;
  }

  private executeMappedTechniques(report: WCAGTechniquesReport): void {
    const selectors = Object.keys(mapping);
    const _mapping = <{ [selector: string]: Array<string> }>mapping;
    for (const selector of selectors ?? []) {
      for (const technique of _mapping[selector] ?? []) {
        if (this.techniquesToExecute[technique]) {
          this.executeTechnique(technique, selector, report);
        }
      }
    }
  }

  private executeNotMappedTechniques(
    report: WCAGTechniquesReport,
    newTabWasOpen: boolean,
    validation: HTMLValidationReport | undefined
  ): void {
    if (this.techniquesToExecute['QW-WCAG-T16']) {
      (<QW_WCAG_T16>this.techniques['QW-WCAG-T16']).validate(validation);
      report.assertions['QW-WCAG-T16'] = this.techniques['QW-WCAG-T16'].getFinalResults();
      report.metadata[report.assertions['QW-WCAG-T16'].metadata.outcome]++;
    }

    if (this.techniquesToExecute['QW-WCAG-T22']) {
      (<QW_WCAG_T22>this.techniques['QW-WCAG-T22']).validate(newTabWasOpen);
      report.assertions['QW-WCAG-T22'] = this.techniques['QW-WCAG-T22'].getFinalResults();
      report.metadata[report.assertions['QW-WCAG-T22'].metadata.outcome]++;
    }
  }

  public execute(newTabWasOpen: boolean, validation: HTMLValidationReport): WCAGTechniquesReport {
    const report: WCAGTechniquesReport = {
      type: 'wcag-techniques',
      metadata: {
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0
      },
      assertions: {}
    };

    this.executeMappedTechniques(report);
    this.executeNotMappedTechniques(report, newTabWasOpen, validation);

    return report;
  }
}

//@ts-ignore
window.wcag = new WCAGTechniques();

export { WCAGTechniques };
