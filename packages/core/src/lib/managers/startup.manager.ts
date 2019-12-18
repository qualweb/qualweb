'use strict';

import Crawl from '@qualweb/crawler';
import fs from 'fs';

function readFile(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) 
        reject(err);
      else 
        resolve(data.toString());
    });
  });
}

async function getFileUrls(file: string): Promise<Array<string>> {
  const content = await readFile(file);
  return content.split('\n').filter((url: string) => url.trim() !== '').map((url: string) => decodeURIComponent(url).trim());
}

async function crawlDomain(domain: string): Promise<Array<string>> {
  const crawler = new Crawl(domain);
  await crawler.start();
  return crawler.getResults().map((url: string) => decodeURIComponent(url).trim());
}

export {
  getFileUrls,
  crawlDomain
};