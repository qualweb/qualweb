import {
  CUIOptions,
  CUIChecksReport,
  CUICheck
} from '@qualweb/cui-checks';
import { Translate } from '@qualweb/locale';
import * as rules from './lib/rules';

class CUIChecks {
  private readonly rules: { [rule: string]: CUIChecks };
  private readonly rulesToExecute: { [rule: string]: boolean };

  private readonly report: CUIChecksReport;

  constructor(locale: Translate, options?: CUIOptions) {
    this.rules = {};
    this.rulesToExecute = {};
    this.report = {
      type: 'cui-checks',
      metadata: {
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0
      },
      assertions: {}
    };

    for (const rule of Object.keys(rules) || []) {
      const _rule = rule.replace(/_/g, '-');
      //@ts-ignore
      this.rules[_rule] = new rules[rule](locale);
      this.rulesToExecute[_rule] = true;
    }

    if (options) {
      this.configure(options);
    }
  }

  public configure(options: CUIOptions): void {
    this.resetConfiguration();
    if (options.rules) {
      options.rules = options.rules.map((r: string) => {
        return r.toLowerCase().startsWith('qw') ? r.toUpperCase().trim() : r.trim();
      });
    }
    if (options.exclude) {
      options.exclude = options.exclude.map((r: string) => {
        return r.toLowerCase().startsWith('qw') ? r.toUpperCase().trim() : r.trim();
      });
    }

    for (const rule of Object.keys(this.rules) || []) {
      if (options.principles && options.principles.length !== 0) {
        if (options.levels && options.levels.length !== 0) {
          if (!this.rules[rule].hasPrincipleAndLevels(options.principles, options.levels)) {
            this.rulesToExecute[rule] = false;
          }
        } else if (!this.rules[rule].hasPrincipleAndLevels(options.principles, ['A', 'AA', 'AAA'])) {
          this.rulesToExecute[rule] = false;
        }
      } else if (options.levels && options.levels.length !== 0) {
        if (
          !this.rules[rule].hasPrincipleAndLevels(
            ['Perceivable', 'Operable', 'Understandable', 'Robust'],
            options.levels
          )
        ) {
          this.rulesToExecute[rule] = false;
        }
      }
      if (!options.principles && !options.levels) {
        if (options.rules && options.rules.length !== 0) {
          if (!options.rules.includes(rule) && !options.rules.includes(this.rules[rule]?.getRuleMapping())) {
            this.rulesToExecute[rule] = false;
          } else {
            this.rulesToExecute[rule] = true;
          }
        }
      } else {
        if (options.rules && options.rules.length !== 0) {
          if (options.rules.includes(rule) || options.rules.includes(this.rules[rule]?.getRuleMapping())) {
            this.rulesToExecute[rule] = true;
          }
        }
      }
      if (options.exclude && options.exclude.length !== 0) {
        if (options.exclude.includes(rule) || options.exclude.includes(this.rules[rule]?.getRuleMapping())) {
          this.rulesToExecute[rule] = false;
        }
      }
    }
  }

  public resetConfiguration(): void {
    for (const rule in this.rulesToExecute ?? {}) {
      this.rulesToExecute[rule] = true;
    }
  }

  private executeRule(rule: string, selector: string): void {
    const elements = window.qwPage.getElements(selector);
    if (elements.length > 0) {
      for (const elem of elements ?? []) {
        this.rules[rule].execute(elem);
      }
    } else {
      this.rules[rule].execute(undefined);
    }

    this.report.assertions[rule] = this.rules[rule].getFinalResults();
    this.report.metadata[this.report.assertions[rule].metadata.outcome]++;
  }

  public executeAtomicRules(): void {
    const selectors = Object.keys(mapping);
    for (const selector of selectors ?? []) {
      for (const rule of (<ACTAtomicRuleMapping>mapping)[selector] ?? []) {
        if (this.rulesToExecute[rule]) {
          this.executeRule(rule, selector);
        }
      }
    }
  }

  public getReport(): CUIChecksReport {
    return this.report;
  }
}

export { CUIChecks };
