'use strict';

import { EvaluationReport } from '@qualweb/core';
import { EarlReport } from '@qualweb/earl-reporter';
import fs from 'fs';

function writeFile(file: string, data: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err)
        reject(err);
      else 
        resolve();
    })
  });
}

async function saveReport(name: string, report: EvaluationReport | EarlReport, overrideName: boolean = false): Promise<void> {
  const path = process.cwd();
  const filename = overrideName ? name : `${encodeURIComponent(name)}_${new Date().getTime()}.json`;

  await writeFile(`${path}/${filename}`, JSON.stringify(report, null, 2));
}

export {
  saveReport
};