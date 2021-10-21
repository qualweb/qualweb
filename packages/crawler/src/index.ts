import logUpdate from 'log-update';
import { Browser, BrowserContext, Viewport } from 'puppeteer';
import { CrawlOptions } from '@qualweb/crawler';
import { LoadEvent } from '@qualweb/core';

class Crawler {
  private readonly browser: Browser | BrowserContext;
  private readonly viewport?: Viewport;
  private readonly startingUrl: string;
  private readonly isDomain: boolean;
  private readonly waitUntil: LoadEvent | LoadEvent[];
  private urls: Array<string>;

  constructor(
    browser: Browser | BrowserContext,
    startingUrl: string,
    viewport?: Viewport,
    waitUntil?: LoadEvent | LoadEvent[]
  ) {
    this.browser = browser;
    this.startingUrl = this.verifyStartingUrl(startingUrl);
    this.isDomain = this.isStaringUrlADomain(startingUrl);
    this.viewport = viewport;
    this.waitUntil = waitUntil ?? 'domcontentloaded';
    this.urls = new Array<string>();
  }

  private verifyStartingUrl(startingUrl: string): string {
    const url = new URL(decodeURIComponent(startingUrl));
    const newStartingUrl = url.origin + url.pathname;
    if (!newStartingUrl.endsWith('/')) {
      return newStartingUrl + '/';
    } else {
      return newStartingUrl;
    }
  }

  private isStaringUrlADomain(startingUrl: string): boolean {
    const url = new URL(startingUrl);
    return url.pathname === '/';
  }

  public async crawl(options?: CrawlOptions): Promise<void> {
    const maxDepth = options?.maxDepth ?? -1;
    const maxUrls = options?.maxUrls ?? -1;
    const parallel = options?.maxParallelCrawls || 5;
    const timeout = options?.timeout ?? -1;

    let currentDepth = 0;
    let currentUrlCount = 1;
    let continueCrawling = true;
    let surpassedMax = false;
    let timer = 0;
    const timerHandle = setInterval(() => {
      timer += 2;
      if (options?.logging) {
        this.log(currentDepth, currentUrlCount, timer);
      }
    }, 2000);
    let timeoutHandle = null;
    let timeoutReached = false;

    if (timeout > 0) {
      timeoutHandle = setTimeout(() => (timeoutReached = true), timeout * 1000);
    }

    if (options?.logging) {
      this.log(currentDepth, currentUrlCount, timer);
    }

    const urlsByDepth: { [depth: number]: Array<string> } = {};
    const urlsCrawled: { [url: string]: boolean } = {};

    urlsCrawled[this.startingUrl] = true;

    const [firstPageUrls, relativePathsToTest] = await this.fetchPageLinks(this.startingUrl);

    urlsByDepth[currentDepth] = [...firstPageUrls];

    const newUrls = this.normalizeAndSort(await this.checkRelativePathsUrls(relativePathsToTest));

    urlsByDepth[currentDepth] = [...urlsByDepth[currentDepth], ...newUrls];

    this.addUrlsToCrawl(urlsCrawled, firstPageUrls);
    this.addUrlsToCrawl(urlsCrawled, newUrls);
    currentUrlCount += firstPageUrls.length + newUrls.length;

    if (options?.logging) {
      this.log(currentDepth, currentUrlCount, timer);
    }

    if (maxUrls >= 0 && currentUrlCount >= maxUrls) {
      surpassedMax = true;
    }

    while (currentDepth !== maxDepth && currentUrlCount !== maxUrls && continueCrawling) {
      const promises = new Array<Promise<Array<Array<string>>>>();

      currentDepth++;
      let depthCompleted = false;

      if (options?.logging) {
        this.log(currentDepth, currentUrlCount, timer);
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
        for (const [urls, relativePaths] of listUrls ?? []) {
          urlsByDepth[currentDepth] = [...urlsByDepth[currentDepth], ...urls];

          const newUrls = this.normalizeAndSort(await this.checkRelativePathsUrls(relativePaths));

          urlsByDepth[currentDepth] = [...urlsByDepth[currentDepth], ...newUrls];

          this.addUrlsToCrawl(urlsCrawled, urls);
          this.addUrlsToCrawl(urlsCrawled, newUrls);
          currentUrlCount = Object.keys(urlsCrawled).length;

          if (options?.logging) {
            this.log(currentDepth, currentUrlCount, timer);
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

  private log(currentDepth: number, currentUrlCount: number, timer: number): void {
    logUpdate(
      `Starting url: ${this.startingUrl}   Current depth: ${currentDepth}   Urls found: ${currentUrlCount}   Time passed: ${timer} seconds`
    );
  }

  private addUrlsToCrawl(urlsCrawled: { [url: string]: boolean }, urls: Array<string>): void {
    for (const url of urls ?? []) {
      if (!urlsCrawled[url]) {
        urlsCrawled[url] = false;
      }
    }
  }

  private async fetchPageLinks(url: string): Promise<Array<Array<string>>> {
    let urls = new Array<string>();
    let relativePathsToTest = new Array<string>();

    try {
      const page = await this.browser.newPage();
      if (this.viewport) {
        await page.setViewport(this.viewport);
      }
      await page.goto(url, {
        waitUntil: this.waitUntil
      });

      [urls, relativePathsToTest] = await page.evaluate(
        (startingUrl: string, isDomain: boolean) => {
          function getUrlWithoutExtension(url: string): string {
            if (!url.endsWith('/')) {
              const parts = url.split('/');
              parts.pop();
              return parts.join('/') + '/';
            } else {
              return url;
            }
          }

          const notHtml = 'css|jpg|jpeg|gif|svg|pdf|docx|js|png|ico|xml|mp4|mp3|mkv|wav|rss|json|pptx|txt'.split('|');

          const links = document.querySelectorAll('body a');

          const urls = new Array<string>();
          const relativePathsToTest = new Array<string>();

          links.forEach((link: Element) => {
            console.log(link);
            if (link.hasAttribute('href')) {
              const href = link.getAttribute('href')?.trim();

              if (
                href &&
                !isDomain &&
                !href.startsWith('http') &&
                !href.startsWith('#') &&
                !href.includes('javascript:') &&
                !href.includes('tel:') &&
                !href.includes('mailto:')
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
                    if (lastPart.startsWith('#')) {
                      valid = false;
                      break;
                    }
                  }
                }

                if (valid) {
                  if (href.startsWith('/')) {
                    const url = new URL(window.location.href);
                    relativePathsToTest.push(url.origin + href);
                  } else {
                    relativePathsToTest.push(getUrlWithoutExtension(window.location.href) + href);
                  }
                }
              }

              if (
                href &&
                isDomain &&
                (href.startsWith(startingUrl) ||
                  href.startsWith('/') ||
                  href.startsWith('./') ||
                  (!href.startsWith('http') && !href.startsWith('#'))) &&
                !href.includes('javascript:') &&
                !href.includes('tel:') &&
                !href.includes('mailto:')
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
                    if (lastPart.startsWith('#')) {
                      valid = false;
                      break;
                    }
                  }
                }

                if (valid) {
                  try {
                    let correctUrl = '';
                    if (href.startsWith(startingUrl)) {
                      correctUrl = href;
                    } else if (href.startsWith('./')) {
                      correctUrl = startingUrl + href.slice(2);
                    } else if (href.startsWith('/')) {
                      correctUrl = startingUrl + href.slice(1);
                    } else {
                      correctUrl = startingUrl + href;
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

          return [urls, relativePathsToTest];
        },
        this.startingUrl,
        this.isDomain
      );

      await page.close();
    } catch (err) {
      //console.error("err", typeof err);
    }
    console.log(urls);
    return [this.normalizeAndSort(urls), relativePathsToTest];
  }

  private async checkRelativePathsUrls(urls: Array<string>): Promise<Array<string>> {
    const newUrlsToValidate = new Array<string>();
    for (const url of urls ?? []) {
      try {
        const page = await this.browser.newPage();
        if (this.viewport) {
          await page.setViewport(this.viewport);
        }
        await page.goto(url, {
          waitUntil: this.waitUntil
        });

        const newUrl = await page.evaluate((startingUrl: string) => {
          function getUrlWithoutExtension(url: string): string {
            if (!url.endsWith('/')) {
              const parts = url.split('/');
              parts.pop();
              return parts.join('/') + '/';
            } else {
              return url;
            }
          }

          if (window.location.href.startsWith(getUrlWithoutExtension(startingUrl))) {
            return window.location.href;
          } else {
            return null;
          }
        }, this.startingUrl);

        if (newUrl !== null) {
          newUrlsToValidate.push(newUrl);
        }

        await page.close();
      } catch (err) {
        console.error(err);
      }
    }

    return newUrlsToValidate;
  }

  private normalizeAndSort(urls: Array<string>): Array<string> {
    const normalizedUrls = urls.map((u: string) => {
      if (u.includes('#')) {
        const parts = u.split('#');
        parts.pop();
        u = parts.join('#');
      }
      if (!u.endsWith('/')) {
        u = u + '/';
      }
      if (u.startsWith(this.startingUrl)) {
        return u.trim();
      } else {
        return (this.startingUrl + u).trim();
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
