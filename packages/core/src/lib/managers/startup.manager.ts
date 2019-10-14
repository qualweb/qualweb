'use strict';

import Crawl from '@qualweb/crawler';
import { readFile } from 'fs-extra';

async function getFileUrls(file: string): Promise<Array<string>> {
  const content = await readFile(file);
  return content.toString().split('\n').map((url: string) => decodeURIComponent(url).trim());
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