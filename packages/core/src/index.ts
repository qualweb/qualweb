'use strict';

import { QualwebOptions, EvaluationReport } from '@qualweb/core';
import { EarlOptions, EarlReport } from '@qualweb/earl-reporter';

import System from './system';

const system = new System();

async function start(): Promise<void> {
  await system.start();
}

async function close(): Promise<void> {
  await system.close();
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
  close,
  evaluate,
  generateEarlReport
};