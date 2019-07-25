'use strict';

import { EvaluationReport } from '@qualweb/core';
import { EarlReport } from '@qualweb/earl-reporter';
import { writeFile } from 'fs-extra';

async function save_report(url: string, report: EvaluationReport | EarlReport): Promise<void> {
  const path = process.cwd();
  const filename = `${encodeURIComponent(url)}_${new Date().getTime()}.json` // change later

  await writeFile(`${path}/${filename}`, JSON.stringify(report, null, 2));
}

export {
  save_report
};