declare module '@qualweb/act-rules' {
  import type {
    EvaluationModule,
    ModuleOptions,
    ModuleReport,
    Tester,
    TestingData,
    Assertion,
    EvaluationReport,
    Level,
    Principle
  } from '@qualweb/lib';
  import type { ModuleTranslator, TranslationOptions } from '@qualweb/locale';
  import type { QWElement } from '@qualweb/qw-element';

  export type RuleResult = {
    passed?: { title: string; code: string };
    warning?: { title: string; code: string };
    failed?: { title: string; code: string };
    inapplicable?: { title: string; code: string };
  };

  export type ElementResult = {
    [code: string]: { title: string; code: string; verdict?: string };
  };

  export abstract class Rule {
    constructor(translator: ModuleTranslator);
    public getCode(): string;
    public getMapping(): string;
    public hasPrincipleAndLevels(principles: Principle[], levels: Level[]): boolean;
    public getFinalResults(): Assertion;
  }

  export abstract class CompositeRule extends Rule {
    abstract execute(element?: QWElement, rules?: Assertion[]): void;
    public conjunction(element: QWElement, rules: Assertion[]): void;
    public disjunction(element: QWElement, rules: Assertion[]): void;
    public getAtomicRuleResultPerVerdict(selector: string, rules: Assertion[]): RuleResult;
    public getAtomicRuleResultForElement(selector: string, rules: Assertion[]): ElementResult;
  }

  export abstract class AtomicRule extends Rule {
    abstract execute(element?: QWElement): void;
  }

  export class ACTRules extends EvaluationModule<Rule> {
    protected report: ModuleReport<Rule>;
    protected tester: Tester<Rule>;
    constructor(locale: TranslationOptions);
    public configure(options: ModuleOptions): this;
    public test(data: TestingData): this;
    public testSpecial(): this;
    public getReport(): EvaluationReport;
  }
}
