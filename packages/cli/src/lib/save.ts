'use strict';

import { EvaluationReport } from '@qualweb/core';
import { EarlReport } from '@qualweb/earl-reporter';
import { writeFile } from 'fs-extra';

async function saveReport(url: string, report: EvaluationReport | EarlReport): Promise<void> {
  const path = process.cwd();
  const filename = `${encodeURIComponent(url)}_${new Date().getTime()}.json`;

  await writeFile(`${path}/${filename}`, JSON.stringify(report, null, 2));
}

export {
  saveReport
};