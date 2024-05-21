import { EarlReport } from '@qualweb/earl-reporter';
import type { ModuleOptions, QualwebReport } from '@shared/types';
import fs from 'fs';

interface ACTRJsonFile {
  'act-rules': ModuleOptions;
}

interface WCAGTJsonFile {
  'wcag-techniques': ModuleOptions;
}

interface BPJsonFile {
  'best-practices': ModuleOptions;
}

function writeFile(file: string, data: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function saveReport(name: string, report: QualwebReport | EarlReport, overrideName = false): Promise<void> {
  const path = process.cwd();
  const filename = overrideName ? name : `${encodeURIComponent(name)}_${new Date().getTime()}.json`;

  await writeFile(`${path}/${filename}`, JSON.stringify(report, null, 2));
}

function readJsonFile(filePath: string): Promise<ACTRJsonFile | WCAGTJsonFile | BPJsonFile> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data.toString()));
    });
  });
}

function fileExists(filePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      fs.access(filePath, () => {
        resolve(true);
      });
    } catch (err) {
      resolve(false);
    }
  });
}

export { ACTRJsonFile, WCAGTJsonFile, BPJsonFile, readJsonFile, saveReport, fileExists };
