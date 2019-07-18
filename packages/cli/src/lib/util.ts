'use strict';

import { readFile, writeFile } from 'fs';

async function read_file(path: string): Promise<string> {
  return new Promise((reject: any, resolve: any) => {
    readFile(path, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function write_file(path: string, data: string): Promise<string> {
  return new Promise((reject: any, resolve: any) => {
    writeFile(path, data, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export {
  read_file,
  write_file
};