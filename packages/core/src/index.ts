import { QualwebOptions, EvaluationReport } from '@qualweb/core';
import { EarlOptions, EarlReport } from '@qualweb/earl-reporter';
import { LaunchOptions } from 'puppeteer';
import System from './system';

class QualWeb {

  private system: System;

  constructor() {
    this.system = new System();
  }

  async start(options?: LaunchOptions): Promise<void> {
    await this.system.start(options);
  }

  public async evaluate(options: QualwebOptions): Promise<{[url: string]: EvaluationReport}> {
    return await this.system.execute(options);
  }

  async generateEarlReport(evaluations: {[url: string]: EvaluationReport}, options?: EarlOptions): Promise<{[url: string]: EarlReport}> {
    return <{[url: string]: EarlReport}> await this.system.report(evaluations, options);
  }

  async stop(): Promise<void> {
    await this.system.stop();
  }
}

export { QualWeb, System };