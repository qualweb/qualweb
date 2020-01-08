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

async function saveReport(url: string, report: EvaluationReport | EarlReport): Promise<void> {
  const path = process.cwd();
  const filename = `${encodeURIComponent(url)}_${new Date().getTime()}.json`;

  await writeFile(`${path}/${filename}`, JSON.stringify(report, null, 2));
}

export {
  saveReport
};