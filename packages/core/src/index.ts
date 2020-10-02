import { QualwebOptions, EvaluationReport } from '@qualweb/core';
import { EarlOptions, EarlReport } from '@qualweb/earl-reporter';
import { LaunchOptions } from 'puppeteer';

import System from './system';

const system = new System();

async function start(options?: LaunchOptions): Promise<void> {
  await system.start(options);
}

async function stop(): Promise<void> {
  await system.stop();
}

async function evaluate(options: QualwebOptions): Promise<{[url: string]: EvaluationReport}> {
  console.log(options)
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
};