import {
  ACTROptions,
  ACTRulesReport,
  ACTRule,
  ACTAtomicRuleMapping,
  ACTCompositeRuleMapping
} from '@qualweb/act-rules';
import * as rules from './lib/rules';
import AtomicRule from './lib/AtomicRule.object';
import CompositeRule from './lib/CompositeRule.object';
import mapping from './lib/mapping';
import compositeRules from './lib/mappingComposite';
import { Translate } from '@qualweb/locale';

class ACTRules {
  private readonly rules: { [rule: string]: AtomicRule | CompositeRule };
  private readonly rulesToExecute: { [rule: string]: boolean };

  private readonly report: ACTRulesReport;

  constructor(locale: Translate, options?: ACTROptions) {
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
      this.rules[_rule] = new rules[rule](locale);
      this.rulesToExecute[_rule] = true;
    }

    if (options) {
      this.configure(options);
    }
  }

  public configure(options: ACTROptions): void {
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
    for (const cr of Object.keys(compositeRules)) {
      const compositeRule = (<ACTCompositeRuleMapping>compositeRules)[cr];
      if (this.rulesToExecute[cr]) {
        for (const ar of compositeRule.rules ?? []) {
          this.rulesToExecute[ar] = true;
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

  private executeCompositeRule(
    rule: string,
    selector: string,
    atomicRules: Array<string>,
    implementation: 'conjunction' | 'disjunction'
  ): void {
    const atomicRulesReport = new Array<ACTRule>();

    for (const atomicRule of atomicRules ?? []) {
      atomicRulesReport.push(this.report.assertions[atomicRule]);
    }
    const elements = window.qwPage.getElements(selector);
    if (elements.length > 0) {
      for (const elem of elements || []) {
        if (implementation === 'conjunction') {
          (<CompositeRule>this.rules[rule]).conjunction(elem, atomicRulesReport);
        } else if (implementation === 'disjunction') {
          (<CompositeRule>this.rules[rule]).disjunction(elem, atomicRulesReport);
        } else {
          (<CompositeRule>this.rules[rule]).execute(elem, atomicRulesReport);
        }
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

  public executeCompositeRules(): void {
    const rules = Object.keys(compositeRules);
    for (const rule of rules ?? []) {
      if (this.rulesToExecute[rule]) {
        this.executeCompositeRule(
          rule,
          (<ACTCompositeRuleMapping>compositeRules)[rule].selector,
          (<ACTCompositeRuleMapping>compositeRules)[rule].rules,
          (<ACTCompositeRuleMapping>compositeRules)[rule].implementation
        );
      }
    }
  }

  public validateMetaElements(metaElements: Array<typeof window.qwElement>): void {
    if (this.rulesToExecute['QW-ACT-R4'] || this.rulesToExecute['QW-ACT-R71']) {
      for (const elem of metaElements ?? []) {
        if (this.rulesToExecute['QW-ACT-R4']) {
          this.rules['QW-ACT-R4'].execute(elem);
        }
        if (this.rulesToExecute['QW-ACT-R71']) {
          this.rules['QW-ACT-R71'].execute(elem);
        }
      }
      if (this.rulesToExecute['QW-ACT-R4']) {
        this.report.assertions['QW-ACT-R4'] = this.rules['QW-ACT-R4'].getFinalResults();
        this.report.metadata[this.report.assertions['QW-ACT-R4'].metadata.outcome]++;
      }
      if (this.rulesToExecute['QW-ACT-R71']) {
        this.report.assertions['QW-ACT-R71'] = this.rules['QW-ACT-R71'].getFinalResults();
        this.report.metadata[this.report.assertions['QW-ACT-R71'].metadata.outcome]++;
      }
    }
  }

  public validateZoomedTextNodeNotClippedWithCSSOverflow(): void {
    if (this.rulesToExecute['QW-ACT-R40']) {
      const elements = window.qwPage.getElements('body *');

      for (const elem of elements ?? []) {
        this.rules['QW-ACT-R40'].execute(elem);
      }

      this.report.assertions['QW-ACT-R40'] = this.rules['QW-ACT-R40'].getFinalResults();
      this.report.metadata[this.report.assertions['QW-ACT-R40'].metadata.outcome]++;
    }
  }

  public validateFirstFocusableElementIsLinkToNonRepeatedContent(): void {
    if (this.rulesToExecute['QW-ACT-R72']) {
      this.rules['QW-ACT-R72'].execute(undefined);
      this.report.assertions['QW-ACT-R72'] = this.rules['QW-ACT-R72'].getFinalResults();
      this.report.metadata[this.report.assertions['QW-ACT-R72'].metadata.outcome]++;
    }
  }

  public getReport(): ACTRulesReport {
    return this.report;
  }
}

export { ACTRules };
