'use strict';

import Crawl from '@qualweb/crawler';
import { readFile } from 'fs-extra';

async function getFileUrls(file: string): Promise<Array<string>> {
  const content = await readFile(file);
  return content.toString().split('\n').map(u => decodeURIComponent(u).trim());
}

async function crawlDomain(domain: string): Promise<Array<string>> {
  const crawler = new Crawl(domain);
  await crawler.start();
  return crawler.getResults();
}

export {
  getFileUrls,
  crawlDomain
};