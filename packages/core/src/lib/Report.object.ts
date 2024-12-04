import type {
  EvaluationReport,
  SystemData,
  QualwebReport,
  CounterReport,
  ModulesData,
  Metadata,
} from './evaluation';
import { Verdict } from './evaluation';

export class Report {
  private readonly systemData: SystemData;
  private readonly metadata: Metadata = {
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0
  };
  private readonly modules = {} as ModulesData;

  constructor(systemData: SystemData) {
    this.systemData = systemData;
  }

  public addModuleReport(moduleReport: EvaluationReport | CounterReport): void {
    const module = moduleReport.type;
    if (module === 'counter') {
      this.modules[module] = moduleReport as CounterReport;
    } else {
      this.modules[module] = moduleReport as EvaluationReport;
      for (const verdict of Object.values(Verdict)) {
        this.metadata[verdict] += this.modules[module]?.metadata[verdict] ?? 0;
      }
    }
  }

  public getCopy(): QualwebReport {
    return {
      type: 'evaluation',
      system: this.systemData,
      metadata: this.metadata,
      modules: this.modules
    };
  }
}
