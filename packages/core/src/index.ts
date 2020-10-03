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
    await this.system.update(options);
    await this.system.execute(options);
    return <{[url: string]: EvaluationReport}> await this.system.report(false);
  }

  async generateEarlReport(options?: EarlOptions): Promise<{[url: string]: EarlReport}> {
    return <{[url: string]: EarlReport}> await this.system.report(true, options);
  }

  async stop(): Promise<void> {
    await this.system.stop();
  }
}

/*const 

async function start(options?: LaunchOptions): Promise<void> {
  await system.start(options);
}

async function stop(): Promise<void> {
  await system.stop();
}

async function evaluate(options: QualwebOptions): Promise<{[url: string]: EvaluationReport}> {
  await system.update(options);
  await system.execute(options);
  return <{[url: string]: EvaluationReport}> await system.report(false);
}

async function generateEarlReport(options?: EarlOptions): Promise<{[url: string]: EarlReport}> {
  return <{[url: string]: EarlReport}> await system.report(true, options);
}

export {
  start,
  stop,
  evaluate,
  generateEarlReport
};*/

export { QualWeb, System };