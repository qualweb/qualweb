'use strict';

import Crawler from 'simplecrawler';

class Crawl {

  private urls: Array<string>;
  private crawler: any;

  constructor(domain: string) {
    this.urls = new Array<string>();
    this.crawler = new Crawler(domain);
  }

  public async start(options?: any): Promise<void> {
    return new Promise((resolve: any, reject: any) => {
      if (options) {
        this.crawler.maxConcurrency = 100;
        this.crawler.maxDepth = 0;
        this.crawler.stripQuerystring = true;
      }

      this.crawler.on('fetchcomplete', item => {
        if (item['stateData']['contentType'].includes('text/html') && !this.urls.includes(item.url)) {
          this.urls.push(item.url);
        }
      });

      this.crawler.on('complete', () => {
        this.stop();
        resolve();
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