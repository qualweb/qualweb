import fs from 'fs';
import type { EarlReport } from '@qualweb/earl-reporter';
import type { ModuleOptions, QualwebReport } from '@shared/types';

export type ACTRJsonFile = {
  'act-rules': ModuleOptions;
};

export type WCAGTJsonFile = {
  'wcag-techniques': ModuleOptions;
};

export type BPJsonFile = {
  'best-practices': ModuleOptions;
};

function writeFile(file: string, data: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export async function saveReport(
  name: string,
  report: QualwebReport | EarlReport,
  overrideName = false
): Promise<void> {
  const path = process.cwd();
  const filename = overrideName ? name : `${encodeURIComponent(name)}_${new Date().getTime()}.json`;

  await writeFile(`${path}/${filename}`, JSON.stringify(report, null, 2));
}

export function readJsonFile(filePath: string): Promise<ACTRJsonFile | WCAGTJsonFile | BPJsonFile> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data.toString()));
    });
  });
}

export function fileExists(filePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      fs.access(filePath, () => resolve(true));
    } catch (err) {
      resolve(false);
    }
  });
}
