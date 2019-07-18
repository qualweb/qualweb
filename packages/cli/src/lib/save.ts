'use strict';

import { EvaluationReport } from '@qualweb/core';
import { EarlReport } from '@qualweb/earl-reporter';
import { write_file } from './util';

async function save_report(url: string, report: EvaluationReport | EvaluationReport[] | EarlReport | EarlReport[]): Promise<void> {
  const path = process.cwd();
  const filename = encodeURIComponent(url) + '_' + (new Date().getTime()) + '.json' // change later

  if (!Array.isArray(report)) {
    await write_file(path + '/' + filename, JSON.stringify(report, null, 2));
  }
}

export {
  save_report
};