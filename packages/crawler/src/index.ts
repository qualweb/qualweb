'use strict';

import Crawler from 'simplecrawler';
const logUpdate = require('log-update');

class Crawl {

  private urls: Array<string>;
  private crawler: Crawler;
  private crawledURLS: number;
  private frames = ['-', '\\', '|', '/'];
  private i = 0;

  constructor(domain: string) {
    this.urls = new Array<string>();
    this.crawler = new Crawler(domain);
    this.crawledURLS = 0;
  }

  public async start(options?: any): Promise<void> {
    return new Promise(resolve => {
      console.log("Starting crawler...")
      if (options) {
        this.crawler.maxConcurrency = 100;
        this.crawler.maxDepth = 0;
        this.crawler.stripQuerystring = true;
      }

      setInterval(() => {
        const frame = this.frames[this.i = ++this.i % this.frames.length];
        logUpdate('Crawled ' + this.crawledURLS + ' pages ' + `${frame}` );
      }, 100);

      this.crawler.on('fetchcomplete', (item: any) => {
        if (item && item['stateData'] && item['stateData']['contentType'] && 
            item['stateData']['contentType'].includes('text/html') && 
            !this.urls.includes(item.url)) {
          this.urls.push(item.url);
          const frame = this.frames[this.i = ++this.i % this.frames.length];
          logUpdate('Crawled ' + this.crawledURLS++ + ' pages ' + `${frame}`);
        }
      });

      this.crawler.on('complete', () => {
        this.stop();
        resolve();
        console.log("Crawler done!");
      });

      this.crawler.start();
    });
  }

  private stop(): void {
    this.crawler.stop();
  }

  public getResults(): Array<string> {
    return this.urls;
  }
}

export = Crawl;