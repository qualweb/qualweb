declare module '@qualweb/best-practices' {
  import type { EvaluationModule, ModuleOptions, ModuleReport, Tester, TestingData } from '@qualweb/lib';
  import type { ModuleTranslator, TranslationOptions } from '@qualweb/locale';
  import type { Assertion, EvaluationReport, Level, Principle } from '@qualweb/evaluation';
  import type { QWElement } from '@qualweb/qw-element';

  export abstract class BestPractice {
    constructor(translator: ModuleTranslator);
    public getCode(): string;
    public getMapping(): string;
    public hasPrincipleAndLevels(principles: Principle[], levels: Level[]): boolean;
    abstract execute(element?: QWElement): void;
    public getFinalResults(): Assertion;
  }

  export class BestPractices extends EvaluationModule<BestPractice> {
    protected report: ModuleReport<BestPractice>;
    protected tester: Tester<BestPractice>;
    constructor(locale: TranslationOptions);
    public configure(options: ModuleOptions): this;
    public test(data: TestingData): this;
    public testSpecial(): this;
    public getReport(): EvaluationReport;
  }
}
