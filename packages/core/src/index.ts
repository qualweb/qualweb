'use strict';

import { QualwebOptions, EvaluationReport } from '@qualweb/core';
import { EarlOptions, EarlReport } from '@qualweb/earl-reporter';

import System from './lib/system';

const system = new System();

async function evaluate(options: QualwebOptions): Promise<EvaluationReport | Array<EvaluationReport>> {
  await system.update(options);
  await system.execute(options);
  return <Array<EvaluationReport>> await system.report(false);
}

async function generateEarlReport(options?: EarlOptions): Promise<Array<EarlReport>> {
  return <Array<EarlReport>> await system.report(true, options);
}

export {
  evaluate,
  generateEarlReport
};