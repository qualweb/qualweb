import logUpdate from 'log-update';
import { Browser } from 'puppeteer';
import { CrawlOptions } from '@qualweb/crawler';

class Crawler {
  private readonly browser: Browser;
  private readonly domain: string;
  private urls: Array<string>;

  constructor(browser: Browser, domain: string) {
    this.browser = browser;
    this.domain = this.verifyDomain(domain);
    this.urls = new Array<string>();
  }

  private verifyDomain(domain: string): string {
    domain = decodeURIComponent(domain);
    if (domain.endsWith('/')) {
      return domain.substring(0, domain.length - 1);
    } else {
      return domain;
    }
  }

  public async crawl(options?: CrawlOptions): Promise<void> {
    const maxDepth = options?.maxDepth ?? -1;
    const maxUrls = options?.maxUrls ?? -1;
    const parallel = options?.maxParallelCrawls ?? 5;
    const timeout = options?.timeout ?? -1;

    let currentDepth = 0;
    let currentUrlCount = 1;
    let continueCrawling = true;
    let surpassedMax = false;
    const timerHandle = setInterval(() => {
      timer += 2;
      if (options?.logging) {
        logUpdate(
          `Domain: ${this.domain}   Current depth: ${currentDepth}   Urls found: ${currentUrlCount}   Time passed: ${timer} seconds`
        );
      }
    }, 2000);
    let timer = 0;
    let timeoutHandle = null;
    let timeoutReached = false;

    if (timeout > 0) {
      timeoutHandle = setTimeout(() => (timeoutReached = true), timeout * 1000);
    }

    if (options?.logging) {
      logUpdate(
        `Domain: ${this.domain}   Current depth: ${currentDepth}   Urls found: ${currentUrlCount}   Time passed: ${timer} seconds`
      );
    }

    const urlsByDepth: { [depth: number]: Array<string> } = {};
    const urlsCrawled: { [url: string]: boolean } = {};

    urlsCrawled[this.domain] = true;

    const firstPageUrls = await this.fetchPageLinks(this.domain);

    urlsByDepth[currentDepth] = [...firstPageUrls];
    this.addUrlsToCrawl(urlsCrawled, firstPageUrls);
    currentUrlCount += firstPageUrls.length;

    if (options?.logging) {
      logUpdate(
        `Domain: ${this.domain}   Current depth: ${currentDepth}   Urls found: ${currentUrlCount}   Time passed: ${timer} seconds`
      );
    }

    if (maxUrls >= 0 && currentUrlCount >= maxUrls) {
      surpassedMax = true;
    }

    while (currentDepth !== maxDepth && currentUrlCount !== maxUrls && continueCrawling) {
      const promises = new Array<Promise<Array<string>>>();

      currentDepth++;
      let depthCompleted = false;

      if (options?.logging) {
        logUpdate(
          `Domain: ${this.domain}   Current depth: ${currentDepth}   Urls found: ${currentUrlCount}   Time passed: ${timer} seconds`
        );
      }

      while (!depthCompleted) {
        const letsCrawl = new Array<string>();

        let count = 0;
        for (const url of urlsByDepth[currentDepth - 1] ?? []) {
          if (!urlsCrawled[url]) {
            urlsCrawled[url] = true;
            letsCrawl.push(url);
            count++;
          }
          if (count === parallel) {
            break;
          }
        }

        if (count < parallel) {
          depthCompleted = true;
        }

        for (const url of letsCrawl ?? []) {
          promises.push(this.fetchPageLinks(url));
        }

        const listUrls = await Promise.all(promises);

        urlsByDepth[currentDepth] = new Array<string>();
        for (const urls of listUrls ?? []) {
          urlsByDepth[currentDepth] = [...urlsByDepth[currentDepth], ...urls];
          this.addUrlsToCrawl(urlsCrawled, urls);
          currentUrlCount = Object.keys(urlsCrawled).length;

          if (options?.logging) {
            logUpdate(
              `Domain: ${this.domain}   Current depth: ${currentDepth}   Urls found: ${currentUrlCount}   Time passed: ${timer} seconds`
            );
          }

          if (maxUrls >= 0 && currentUrlCount >= maxUrls) {
            surpassedMax = true;
            depthCompleted = true;
            continueCrawling = false;
            break;
          }
        }

        if (timeoutReached) {
          continueCrawling = false;
          break;
        }
      }

      if (!urlsByDepth[currentDepth]?.length) {
        continueCrawling = false;
      }
    }

    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }

    clearInterval(timerHandle);

    if (surpassedMax) {
      this.urls = Object.keys(urlsCrawled).slice(0, maxUrls);
    } else {
      this.urls = Object.keys(urlsCrawled);
    }
  }

  private addUrlsToCrawl(urlsCrawled: { [url: string]: boolean }, urls: Array<string>): void {
    for (const url of urls ?? []) {
      if (!urlsCrawled[url]) {
        urlsCrawled[url] = false;
      }
    }
  }

  private async fetchPageLinks(url: string): Promise<Array<string>> {
    let urls = new Array<string>();

    try {
      const page = await this.browser.newPage();
      await page.goto(url, {
        waitUntil: 'domcontentloaded'
      });

      urls = await page.evaluate((domain) => {
        const notHtml = 'css|jpg|jpeg|gif|svg|pdf|docx|js|png|ico|xml|mp4|mp3|mkv|wav|rss|php|json|pptx|txt'.split('|');

        const links = document.querySelectorAll('body a');

        const urls = new Array<string>();

        links.forEach((link: Element) => {
          if (link.hasAttribute('href')) {
            const href = link.getAttribute('href');

            if (
              href &&
              href.trim() &&
              (href.startsWith(domain) ||
                href.startsWith('/') ||
                href.startsWith('./') ||
                (!href.startsWith('http') && !href.startsWith('#')))
            ) {
              let valid = true;
              for (const not of notHtml || []) {
                if (href.endsWith(not)) {
                  valid = false;
                  break;
                }
                const parts = href.split('/');
                if (parts.length > 0) {
                  const lastPart = parts[parts.length - 1];
                  if (
                    lastPart.startsWith('#') ||
                    lastPart.startsWith('javascript:') ||
                    lastPart.startsWith('tel:') ||
                    lastPart.startsWith('mailto:')
                  ) {
                    valid = false;
                    break;
                  }
                }
              }

              if (valid) {
                try {
                  let correctUrl = '';
                  if (href.startsWith(domain)) {
                    correctUrl = href;
                  } else if (href.startsWith('./')) {
                    correctUrl = domain + href.slice(1);
                  } else if (!href.startsWith('/')) {
                    correctUrl = domain + '/' + href;
                  } else {
                    correctUrl = domain + href;
                  }
                  const parsedUrl = new URL(correctUrl);
                  if (parsedUrl.hash.trim() === '') {
                    urls.push(correctUrl);
                  }
                } catch (err) {
                  console.error(err);
                }
              }
            }
          }
        });

        return urls;
      }, this.domain);

      await page.close();
    } catch (err) {
      //console.error("err", typeof err);
    }

    return this.normalizeAndSort(urls);
  }

  private normalizeAndSort(urls: Array<string>): Array<string> {
    const normalizedUrls = urls.map((u: string) => {
      if (u.endsWith('/')) {
        u = u.substring(0, u.length - 1);
      }
      if (u.startsWith(this.domain)) {
        return u.trim();
      } else {
        return (this.domain + u).trim();
      }
    });

    const unique = [...new Set(normalizedUrls)].map((u: string) => decodeURIComponent(u));

    return unique.sort();
  }

  public getResults(): Array<string> {
    return this.urls;
  }
}

export { Crawler };
