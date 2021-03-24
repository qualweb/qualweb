import { ACTROptions, ACTRulesReport, ACTRule } from '@qualweb/act-rules';
import * as rules from './lib/rules';

import mapping from './lib/mapping';
import compositeRules from './lib/mappingComposite';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

class ACTRules {
  private readonly rules: any;
  private readonly rulesToExecute: any;

  private readonly report: ACTRulesReport;

  constructor(options?: ACTROptions) {
    this.rules = {};
    this.rulesToExecute = {};
    this.report = {
      type: 'act-rules',
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
      this.rules[_rule] = new rules[rule]();
      this.rulesToExecute[_rule] = true;
    }

    if (options) {
      this.configure(options);
    }
  }

  public configure(options: ACTROptions): void {
    this.resetConfiguration();

    if (options.principles) {
      options.principles = options.principles.map((p: string) =>
        (p.charAt(0).toUpperCase() + p.toLowerCase().slice(1)).trim()
      );
    }
    if (options.levels) {
      options.levels = options.levels.map((l: string) => l.toUpperCase().trim());
    }
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
    for (const cr of Object.keys(compositeRules)) {
      // @ts-ignore
      const compositeRule = compositeRules[cr];
      if (this.rulesToExecute[cr]) {
        for (const ar of compositeRule.rules || []) {
          this.rulesToExecute[ar] = true;
        }
      }
    }
  }

  public resetConfiguration(): void {
    for (const rule in this.rulesToExecute || {}) {
      this.rulesToExecute[rule] = true;
    }
  }

  private executeRule(rule: string, selector: string, page: QWPage): void {
    if (rule === 'QW-ACT-R37' || rule === 'QW-ACT-R76') {
      this.rules[rule].execute(undefined, page);
    } else {
      const elements = page.getElements(selector);
      if (elements.length > 0) {
        for (const elem of elements || []) {
          this.rules[rule].execute(elem, page);
        }
      } else {
        this.rules[rule].execute(undefined, page);
      }
    }

    this.report.assertions[rule] = this.rules[rule].getFinalResults();
    //@ts-ignore
    this.report.metadata[this.report.assertions[rule].metadata.outcome]++;
    this.rules[rule].reset();
  }

  public executeAtomicRules(page: QWPage): void {
    const selectors = Object.keys(mapping);
    for (const selector of selectors || []) {
      for (const rule of (<any>mapping)[selector] || []) {
        if (this.rulesToExecute[rule]) {
          this.executeRule(rule, selector, page);
        }
      }
    }
  }

  /*private executeNotMappedRules(report: ACTRulesReport, page: QWPage): void {
    if (this.rulesToExecute['QW-ACT-R37']) {
      this.rules['QW-ACT-R37'].execute(undefined, page);
      report.assertions['QW-ACT-R37'] = this.rules['QW-ACT-R37'].getFinalResults();
      //@ts-ignore
      report.metadata[report.assertions['QW-ACT-R37'].metadata.outcome]++;
      this.rules['QW-ACT-R37'].reset();
    }
    if (this.rulesToExecute['QW-ACT-R76']) {
      this.rules['QW-ACT-R76'].execute(undefined, page);
      report.assertions['QW-ACT-R76'] = this.rules['QW-ACT-R76'].getFinalResults();
      //@ts-ignore
      report.metadata[report.assertions['QW-ACT-R76'].metadata.outcome]++;
      this.rules['QW-ACT-R76'].reset();
    }
  }*/

  public executeCompositeRules(page: QWPage): void {
    const rules = Object.keys(compositeRules);
    for (const rule of rules || []) {
      if (this.rulesToExecute[rule]) {
        this.executeCompositeRule(
          rule,
          //@ts-ignore
          compositeRules[rule].selector,
          //@ts-ignore
          compositeRules[rule].rules,
          //@ts-ignore
          compositeRules[rule].implementation,
          page
        );
      }
    }
  }

  private executeCompositeRule(
    rule: string,
    selector: string,
    atomicRules: string[],
    implementation: string,
    page: QWPage
  ): void {
    const atomicRulesReport = new Array<ACTRule>();

    for (const atomicRule of atomicRules || []) {
      atomicRulesReport.push(this.report.assertions[atomicRule]);
    }
    const elements = page.getElements(selector);
    if (elements.length > 0) {
      for (const elem of elements || []) {
        if (implementation === 'conjunction') {
          this.rules[rule].conjunction(elem, atomicRulesReport);
        } else if (implementation === 'disjunction') {
          this.rules[rule].disjunction(elem, atomicRulesReport);
        } else {
          this.rules[rule].execute(elem, atomicRulesReport);
        }
      }
    } else {
      this.rules[rule].execute(undefined, page);
    }

    this.report.assertions[rule] = this.rules[rule].getFinalResults();
    //@ts-ignore
    this.report.metadata[this.report.assertions[rule].metadata.outcome]++;
    this.rules[rule].reset();
  }

  public validateMetaElements(metaElements: Array<QWElement>): void {
    if (this.rulesToExecute['QW-ACT-R4'] || this.rulesToExecute['QW-ACT-R71']) {
      if (metaElements.length > 0) {
        for (const elem of metaElements || []) {
          if (this.rulesToExecute['QW-ACT-R4']) {
            this.rules['QW-ACT-R4'].execute(elem);
          }
          if (this.rulesToExecute['QW-ACT-R71']) {
            this.rules['QW-ACT-R71'].execute(elem);
          }
        }
      } else {
        if (this.rulesToExecute['QW-ACT-R4']) {
          this.rules['QW-ACT-R4'].execute(undefined);
        }
        if (this.rulesToExecute['QW-ACT-R71']) {
          this.rules['QW-ACT-R71'].execute(undefined);
        }
      }
      if (this.rulesToExecute['QW-ACT-R4']) {
        this.report.assertions['QW-ACT-R4'] = this.rules['QW-ACT-R4'].getFinalResults();
        //@ts-ignore
        this.report.metadata[this.report.assertions['QW-ACT-R4'].metadata.outcome]++;
        this.rules['QW-ACT-R4'].reset();
      }
      if (this.rulesToExecute['QW-ACT-R71']) {
        this.report.assertions['QW-ACT-R71'] = this.rules['QW-ACT-R71'].getFinalResults();
        //@ts-ignore
        this.report.metadata[this.report.assertions['QW-ACT-R71'].metadata.outcome]++;
        this.rules['QW-ACT-R71'].reset();
      }
    }
  }

  public validateZoomedTextNodeNotClippedWithCSSOverflow(page: QWPage): void {
    if (this.rulesToExecute['QW-ACT-R40']) {
      const elements = page.getElements('body *');

      if (elements.length > 0) {
        for (const elem of elements || []) {
          this.rules['QW-ACT-R40'].execute(elem, page);
        }
      } else {
        this.rules['QW-ACT-R40'].execute(undefined, page);
      }

      this.report.assertions['QW-ACT-R40'] = this.rules['QW-ACT-R40'].getFinalResults();
      //@ts-ignore
      this.report.metadata[this.report.assertions['QW-ACT-R40'].metadata.outcome]++;
      this.rules['QW-ACT-R40'].reset();
    }
  }

  public validateFirstFocusableElementIsLinkToNonRepeatedContent(page: QWPage): void {
    if (this.rulesToExecute['QW-ACT-R72']) {
      this.rules['QW-ACT-R72'].execute(undefined, page);
      this.report.assertions['QW-ACT-R72'] = this.rules['QW-ACT-R72'].getFinalResults();
      //@ts-ignore
      this.report.metadata[this.report.assertions['QW-ACT-R72'].metadata.outcome]++;
      this.rules['QW-ACT-R72'].reset();
    }
  }

  /*public executeAtomicRules(page: QWPage): void {
    this.executePageMappedRules(report, page, Object.keys(mapping), mapping);
    this.executeNotMappedRules(report, page);
    this.executeAllCompositeRules(report, page);
  }*/

  public getReport(): ACTRulesReport {
    return this.report;
  }
}

export { ACTRules };
