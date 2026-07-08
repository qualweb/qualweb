import type { Page } from 'puppeteer';
import type {
  DriverPage,
  DriverResponse,
  DriverViewport,
  EvaluateFunction,
  NavigationOptions,
} from '../types';

/**
 * {@link DriverPage} implementation backed by a Puppeteer {@link Page}.
 */
export class PuppeteerDriverPage implements DriverPage {
  constructor(private readonly page: Page) {}

  public get nativePage(): unknown {
    return this.page;
  }

  public url(): string {
    return this.page.url();
  }

  public title(): Promise<string> {
    return this.page.title();
  }

  public async countElements(selector: string): Promise<number> {
    return (await this.page.$$(selector)).length;
  }

  public evaluate<Params extends unknown[], Func extends EvaluateFunction<Params> = EvaluateFunction<Params>>(
    pageFunction: Func | string,
    ...args: Params
  ): Promise<Awaited<ReturnType<Func>>> {
    // The cast bridges Puppeteer's handle-aware evaluate() generics with the
    // driver's serializable-only signature. QualWeb never passes handles.
    return this.page.evaluate(
      pageFunction as unknown as string,
      ...(args as unknown[])
    ) as Promise<Awaited<ReturnType<Func>>>;
  }

  public async setBypassCSP(enabled: boolean): Promise<void> {
    await this.page.setBypassCSP(enabled);
  }

  public async goBack(): Promise<void> {
    await this.page.goBack();
  }

  public async setContent(html: string, options?: NavigationOptions): Promise<void> {
    await this.page.setContent(html, options);
  }

  public content(): Promise<string> {
    return this.page.content();
  }

  public async addScriptTag(options: { path: string; type?: string }): Promise<void> {
    await this.page.addScriptTag(options);
  }

  public dismissDialogs(): void {
    this.page.on('dialog', (dialog) => dialog.dismiss());
  }

  public goto(url: string, options?: NavigationOptions): Promise<DriverResponse | null> {
    return this.page.goto(url, options);
  }

  public viewport(): DriverViewport | null {
    return this.page.viewport();
  }

  public async setViewport(viewport: DriverViewport): Promise<void> {
    await this.page.setViewport(viewport);
  }

  public async setUserAgent(userAgent: string): Promise<void> {
    await this.page.setUserAgent(userAgent);
  }

  public getBrowserUserAgent(): Promise<string> {
    return this.page.browser().userAgent();
  }

  public async closeExtraTabs(): Promise<boolean> {
    const tabs = await this.page.browser().pages();

    let extraTabOpened = false;

    for (const tab of tabs ?? []) {
      const target = tab.target();
      const opener = target.opener();

      if (opener) {
        const openerPage = await opener.page();
        if (openerPage && openerPage.url() === this.page.url()) {
          extraTabOpened = true;
          await tab.close();
        }
      }
    }

    return extraTabOpened;
  }
}
