import { expect } from 'chai';
import { QualwebPage } from '../src/lib/QualwebPage.object';
import { PluginManager } from '../src/lib/PluginManager.object';
import type {
  DriverPage,
  DriverResponse,
  DriverViewport,
  EvaluateFunction,
} from '../src/lib/driver/types';
import type { QualwebOptions } from '../src/lib/QualwebOptions';

/**
 * Minimal {@link DriverPage} stub. Every operation is a no-op except
 * addScriptTag, whose completion is gated so the test can observe the
 * window during which script injection is in flight.
 */
class StubDriverPage implements DriverPage {
  public addScriptTagCalls = 0;
  private releaseGate!: () => void;
  private readonly gate: Promise<void>;

  constructor() {
    this.gate = new Promise<void>((resolve) => {
      this.releaseGate = resolve;
    });
  }

  /** Lets every pending and subsequent addScriptTag call complete. */
  public releaseScriptTags(): void {
    this.releaseGate();
  }

  public readonly nativePage: unknown = {};

  public url(): string {
    return 'customHtml';
  }

  public title(): Promise<string> {
    return Promise.resolve('');
  }

  public countElements(): Promise<number> {
    return Promise.resolve(0);
  }

  public evaluate<Params extends unknown[], Func extends EvaluateFunction<Params> = EvaluateFunction<Params>>(
    _pageFunction: Func | string,
    ..._args: Params
  ): Promise<Awaited<ReturnType<Func>>> {
    return Promise.resolve(undefined as unknown as Awaited<ReturnType<Func>>);
  }

  public setBypassCSP(): Promise<void> {
    return Promise.resolve();
  }

  public goBack(): Promise<void> {
    return Promise.resolve();
  }

  public setContent(): Promise<void> {
    return Promise.resolve();
  }

  public content(): Promise<string> {
    return Promise.resolve('<html></html>');
  }

  public async addScriptTag(): Promise<void> {
    this.addScriptTagCalls++;
    await this.gate;
  }

  public dismissDialogs(): void {
    /* no-op */
  }

  public goto(): Promise<DriverResponse | null> {
    return Promise.resolve(null);
  }

  public viewport(): DriverViewport | null {
    return null;
  }

  public setViewport(): Promise<void> {
    return Promise.resolve();
  }

  public setUserAgent(): Promise<void> {
    return Promise.resolve();
  }

  public getBrowserUserAgent(): Promise<string> {
    return Promise.resolve('stub-agent');
  }

  public closeExtraTabs(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

/** Yields control several times so pending microtasks/macrotasks can run. */
async function flush(): Promise<void> {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setImmediate(resolve));
  }
}

describe('QualwebPage', function () {
  it('getTestingData waits for necessary scripts to finish injecting before resolving', async function () {
    const page = new StubDriverPage();
    const qualwebPage = new QualwebPage(new PluginManager(), page, undefined, '<html></html>');

    let resolved = false;
    const testingDataPromise = qualwebPage
      .getTestingData({ modules: [] } as unknown as QualwebOptions)
      .then(() => {
        resolved = true;
      });

    // Let the prepare flow run up to the (still-gated) script injection.
    await flush();

    // Injection has started but cannot complete while the gate is closed.
    // getTestingData must not have resolved yet - otherwise the script tags
    // are left injecting after the caller has moved on (the floating-promise
    // bug that surfaces as an unhandledRejection when the page is disposed).
    expect(page.addScriptTagCalls).to.be.greaterThan(0);
    expect(resolved, 'getTestingData resolved before script injection finished').to.be.false;

    // Allow injection to complete.
    page.releaseScriptTags();
    await testingDataPromise;

    expect(resolved).to.be.true;
    expect(page.addScriptTagCalls).to.equal(3);
  });
});
