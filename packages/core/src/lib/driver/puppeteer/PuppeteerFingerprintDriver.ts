import { PuppeteerDriver } from './PuppeteerDriver';
import { FingerprintGenerator } from 'fingerprint-generator';
import { FingerprintInjector } from 'fingerprint-injector';

type GeneratorOptions = ConstructorParameters<typeof FingerprintGenerator>[0];

export class PuppeteerFingerprintDriver extends PuppeteerDriver {
  private readonly generator: FingerprintGenerator;
  private readonly injector = new FingerprintInjector();

  constructor(
    options?: ConstructorParameters<typeof PuppeteerDriver>[0],
    fingerprintOptions?: GeneratorOptions
  ) {
    super({ ...options, plugins: undefined });

    this.generator = new FingerprintGenerator({
      browsers: [{ name: 'chrome', minVersion: 120 }],
      devices: ['desktop'],
      operatingSystems: ['windows'],
      ...fingerprintOptions
    });
  }

  /**
   * Generates a new fingerprint, injects it into the page, and returns the user agent.
   */
  private async apply(page: any): Promise<string> {
    const fp = this.generator.getFingerprint();
    await this.injector.attachFingerprintToPuppeteer(page, fp);
    return fp.fingerprint.navigator.userAgent;
  }

  /**
   * Preserves the fingerprint user agent by intercepting QualWeb's user agent operations.
   * 
   */
  private keepFingerprintUA(page: any, ua: string): any {
    return new Proxy(page, {
      get(target: any, prop) {
        if (prop === 'setUserAgent') return async () => undefined;
        if (prop === 'getBrowserUserAgent') return async () => ua;
        const value = Reflect.get(target, prop, target);
        return typeof value === 'function' ? value.bind(target) : value;
      }
    });
  }

  /**
   * Overrides the pool task handler to inject fingerprints.
   * 
   */
  override async launchPool(clusterOptions?: any, browserOptions?: unknown) {
    const pool = await super.launchPool(clusterOptions, browserOptions);

    return new Proxy(pool, {
      get: (target: any, prop) => {
        if (prop === 'task') {
          return (handler: any) =>
            target.task(async (page: any, data: any) => {
              const ua = await this.apply(page.nativePage);
              return handler(this.keepFingerprintUA(page, ua), data);
            });
        }
        const value = Reflect.get(target, prop, target);
        return typeof value === 'function' ? value.bind(target) : value;
      }
    });
  }

  /**
   * Overrides context creation to inject fingerprints into new pages.
   * 
   * fingerprints are applied to pages created by the URL crawler.
   */
  override async launchContext() {
    const context = await super.launchContext();
    const newPage = context.newPage.bind(context);

    return {
      ...context,
      newPage: async () => {
        const page = await newPage();
        await this.apply(page);
        return page;
      }
    };
  }
}
