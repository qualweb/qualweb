declare module '@qualweb/wcag-techniques' {
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
  } from '@shared/types';
  import type { ModuleTranslator, TranslationOptions } from '@qualweb/locale';
  import type { QWElement } from '@qualweb/qw-element';

  export abstract class Technique {
    constructor(translator: ModuleTranslator);
    public getCode(): string;
    public getMapping(): string;
    public hasPrincipleAndLevels(principles: Principle[], levels: Level[]): boolean;
    abstract execute(element?: QWElement): void;
    public getFinalResults(): Assertion;
  }

  export class WCAGTechniques extends EvaluationModule<Technique> {
    protected report: ModuleReport<Technique>;
    protected tester: Tester<Technique>;
    constructor(locale: TranslationOptions);
    public configure(options: ModuleOptions): this;
    public test(data: TestingData): this;
    public testSpecial(): this;
    public getReport(): EvaluationReport;
  }
}
