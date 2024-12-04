import type { Assertion } from '@qualweb/core/evaluation';
import type { ModuleTranslator } from '@qualweb/core/locale';
import type { QWElement } from '@qualweb/qw-element';
import { Tester } from '@qualweb/core/evaluation';
import { CompositeRule } from './CompositeRule.object';
import mapping from './mapping';
import compositeRules from './mappingComposite';
import * as rules from '../rules';

export class ACTRulesTester extends Tester {
  public init(translator: ModuleTranslator): this {
    for (const rule in rules) {
      const ruleObject = new rules[rule as keyof typeof rules](translator);
      this.assertions.set(ruleObject.getCode(), ruleObject);
      this.toExecute[ruleObject.getCode()] = true;
    }
    return this;
  }

  public execute(): void {
    this.executeAtomicRules();
    this.executeCompositeRules();
  }

  public configureCompositeRules(): void {
    for (const code in compositeRules) {
      const compositeRule = compositeRules[code as keyof typeof compositeRules];
      if (this.toExecute[code]) {
        for (const atomicRule of compositeRule.rules ?? []) {
          this.toExecute[atomicRule] = true;
        }
      }
    }
  }

  private executeAtomicRules(): void {
    const selectors = Object.keys(mapping);
    for (const selector of selectors ?? []) {
      for (const rule of mapping[selector as keyof typeof mapping] ?? []) {
        if (this.toExecute[rule]) {
          this.executeRule(rule, selector);
        }
      }
    }
  }

  private executeRule(rule: string, selector: string): void {
    const ruleToExecute = this.assertions.get(rule);
    if (ruleToExecute) {
      const elements = window.qwPage.getElements(selector);
      if (elements.length > 0) {
        elements.forEach((element) => ruleToExecute?.execute?.(element));
      } else {
        ruleToExecute?.execute?.();
      }

      this.report.addAssertionResult(ruleToExecute);
    }
  }

  private executeCompositeRules(): void {
    Object.entries(compositeRules).forEach(([key, rule]) => {
      if (this.toExecute[key]) {
        this.executeCompositeRule(key, rule.selector, rule.rules, rule.implementation as 'conjunction' | 'disjunction');
      }
    });
  }

  private executeCompositeRule(
    rule: string,
    selector: string,
    atomicRules: string[],
    implementation: 'conjunction' | 'disjunction'
  ): void {
    const ruleToExecute = this.assertions.get(rule);
    if (ruleToExecute) {
      const atomicRulesReport = new Array<Assertion>();

      for (const atomicRule of atomicRules ?? []) {
        atomicRulesReport.push(this.report.getAssertions(atomicRule));
      }
      const elements = window.qwPage.getElements(selector);
      if (elements.length > 0) {
        for (const elem of elements || []) {
          if (implementation === 'conjunction') {
            (<CompositeRule>ruleToExecute).conjunction(elem, atomicRulesReport);
          } else if (implementation === 'disjunction') {
            (<CompositeRule>ruleToExecute).disjunction(elem, atomicRulesReport);
          } else {
            (<CompositeRule>ruleToExecute).execute(elem, atomicRulesReport);
          }
        }
      } else {
        ruleToExecute?.execute?.();
      }

      this.report.addAssertionResult(ruleToExecute);
    }
  }

  public validateMetaElements(metaElements: QWElement[]): void {
    if (this.toExecute['QW-ACT-R4'] || this.toExecute['QW-ACT-R71']) {
      const r4 = this.assertions.get('QW-ACT-R4');
      const r71 = this.assertions.get('QW-ACT-R71');
      for (const elem of metaElements ?? []) {
        if (this.toExecute['QW-ACT-R4']) {
          r4?.execute?.(elem);
        }
        if (this.toExecute['QW-ACT-R71']) {
          r71?.execute?.(elem);
        }
      }
      if (this.toExecute['QW-ACT-R4'] && r4) {
        this.report.addAssertionResult(r4);
      }
      if (this.toExecute['QW_ACT_R71'] && r71) {
        this.report.addAssertionResult(r71);
      }
    }
  }

  public validateZoomedTextNodeNotClippedWithCSSOverflow(): void {
    if (this.toExecute['QW-ACT-R40']) {
      const r40 = this.assertions.get('QW-ACT-R40');
      if (r40) {
        const elements = window.qwPage.getElements('body *');
        elements.forEach((element) => r40?.execute?.(element));
        this.report.addAssertionResult(r40);
      }
    }
  }
}
