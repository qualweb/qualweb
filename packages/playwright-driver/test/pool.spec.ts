import { strict as assert } from 'node:assert';
import { chromium, Browser, BrowserContext } from 'playwright';
import { PlaywrightDriver, PlaywrightDriverPool } from '../src';

function deferred(): { promise: Promise<void>; resolve: () => void } {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => { resolve = done; });
  return { promise, resolve };
}

async function within<T>(promise: Promise<T>, timeout = 8000): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_resolve, reject) => {
        timer = setTimeout(() => reject(new Error('Pool did not settle within the test deadline')), timeout);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

describe('Playwright pool lifecycle', function () {
  this.timeout(15000);
  let browser: Browser;
  let pool: PlaywrightDriverPool | undefined;

  beforeEach(async () => { browser = await chromium.launch(); });
  afterEach(async () => {
    await pool?.close();
    await browser.close();
    pool = undefined;
  });

  it('caps concurrency, processes every queued job, and releases every context', async () => {
    pool = new PlaywrightDriverPool(browser, { maxConcurrency: 2 });
    const started = deferred();
    const release = deferred();
    const errors: Error[] = [];
    const completed: string[] = [];
    let active = 0;
    let peak = 0;
    pool.onTaskError((error) => errors.push(error));
    await pool.task(async (_page, { url }) => {
      active++;
      peak = Math.max(peak, active);
      if (active === 2) started.resolve();
      await release.promise;
      completed.push(url!);
      active--;
    });
    try {
      for (let i = 0; i < 5; i++) pool.queue({ url: String(i) });
      await within(started.promise);
      assert.equal(peak, 2);
      assert.equal(completed.length, 0);
    } finally {
      release.resolve();
    }
    await within(pool.idle());
    assert.deepEqual(errors, []);
    assert.equal(peak, 2);
    assert.deepEqual(completed.sort(), ['0', '1', '2', '3', '4']);
    assert.equal(browser.contexts().length, 0);
  });

  it('isolates cookies and local storage between jobs and supports another batch after idle', async () => {
    pool = new PlaywrightDriverPool(browser);
    const cookies: string[][] = [];
    const storage: Array<string | null> = [];
    const errors: Error[] = [];
    pool.onTaskError((error) => errors.push(error));
    await pool.task(async (page) => {
      const native = page.nativePage as import('playwright').Page;
      cookies.push((await native.context().cookies()).map((cookie) => cookie.name));
      await native.context().addCookies([{ name: 'private', value: 'job', url: 'https://qualweb.test' }]);
      await native.route('https://qualweb.test/**', (route) => route.fulfill({ body: '<!doctype html><title>Isolated job</title>' }));
      await native.goto('https://qualweb.test');
      storage.push(await page.evaluate(() => localStorage.getItem('private')));
      await page.evaluate(() => localStorage.setItem('private', 'job'));
    });
    pool.queue({});
    await within(pool.idle());
    pool.queue({});
    await within(pool.idle());
    assert.deepEqual(errors, []);
    assert.deepEqual(cookies, [[], []]);
    assert.deepEqual(storage, [null, null]);
    assert.equal(browser.contexts().length, 0);
  });

  it('reports a timed-out job once and still evaluates the next job', async () => {
    pool = new PlaywrightDriverPool(browser, { timeout: 1500 });
    const errors: string[] = [];
    const completed: string[] = [];
    pool.onTaskError((error, data) => errors.push(`${data.url}: ${error.message}`));
    await pool.task(async (page, { url }) => {
      if (url === 'timeout') {
        await page.evaluate(() => new Promise<void>(() => {}));
      }
      completed.push(url!);
    });
    pool.queue({ url: 'timeout' });
    pool.queue({ url: 'good' });
    await within(pool.idle());
    assert.deepEqual(completed, ['good']);
    assert.deepEqual(errors, ['timeout: Timeout hit: 1500']);
    assert.equal(browser.contexts().length, 0);
  });

  it('includes page setup in the job timeout and closes its context', async () => {
    const setupStarted = deferred();
    const releaseSetup = deferred();
    let calls = 0;
    let setups = 0;
    pool = new PlaywrightDriverPool(browser, { timeout: 1500 }, async () => {
      if (++setups === 1) {
        setupStarted.resolve();
        await releaseSetup.promise;
      }
    });
    const errors: string[] = [];
    pool.onTaskError((error) => errors.push(error.message));
    await pool.task(async () => { calls++; });
    pool.queue({});
    try {
      await within(setupStarted.promise);
      await within(pool.idle(), 5000);
      assert.deepEqual(errors, ['Timeout hit: 1500']);
      assert.equal(calls, 0);
      assert.equal(browser.contexts().length, 0);
      pool.queue({});
      await within(pool.idle());
      assert.equal(calls, 1);
    } finally {
      releaseSetup.resolve();
    }
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(calls, 1, 'a late setup must never run the expired job');
  });

  it('settles idle and discards queued jobs when closed during a running job', async () => {
    const started = deferred();
    const release = deferred();
    pool = new PlaywrightDriverPool(browser);
    const calls: string[] = [];
    await pool.task(async (_page, { url }) => {
      calls.push(url!);
      started.resolve();
      await release.promise;
    });
    pool.queue({ url: 'active' });
    pool.queue({ url: 'pending' });
    try {
      await within(started.promise);
      const idle = pool.idle();
      await pool.close();
      await within(idle, 3000);
      assert.deepEqual(calls, ['active']);
      assert.equal(browser.isConnected(), false);
      assert.throws(() => pool!.queue({}), /closed browser pool/);
    } finally {
      release.resolve();
    }
  });

  it('cleans up failed page setup and can run a subsequent job', async () => {
    let attempts = 0;
    let completed = 0;
    pool = new PlaywrightDriverPool(browser, undefined, async () => {
      if (++attempts === 1) throw new Error('Blocker setup failed');
    });
    const errors: string[] = [];
    pool.onTaskError((error) => errors.push(error.message));
    await pool.task(async () => { completed++; });
    pool.queue({});
    pool.queue({});
    await within(pool.idle());
    assert.deepEqual(errors, ['Blocker setup failed']);
    assert.equal(completed, 1);
    assert.equal(browser.contexts().length, 0);
  });

  it('forwards launch overrides and closes the browser on invalid pool settings', async () => {
    const options: import('playwright').LaunchOptions[] = [];
    const driver = new PlaywrightDriver({
      launchOptions: { headless: false, args: ['--disable-background-networking'] },
      launcher: {
        launch: async (value) => {
          options.push(value!);
          return browser;
        },
      },
    });
    await assert.rejects(driver.launchPool({ maxConcurrency: 0 }, { headless: true }), RangeError);
    assert.deepEqual(options, [{ headless: true, args: ['--disable-background-networking'] }]);
    assert.equal(browser.isConnected(), false);
    await assert.rejects(driver.launchPool(undefined, 'invalid'), /launch options must be an object/);
    assert.equal(options.length, 1);
  });

  it('closes the old context if replacement page setup fails', async () => {
    let original: BrowserContext | undefined;
    let attempts = 0;
    pool = new PlaywrightDriverPool(browser, undefined, async (page) => {
      if (++attempts === 1) original = page.context();
      else throw new Error('Replacement setup failed');
    });
    const errors: string[] = [];
    pool.onTaskError((error) => errors.push(error.message));
    await pool.task(async (page) => {
      await page.setUserAgent('QualWeb replacement regression');
    });
    pool.queue({});
    await within(pool.idle());
    assert.deepEqual(errors, ['Replacement setup failed']);
    assert.ok(original);
    assert.equal(browser.contexts().length, 0);
  });

  it('closes both contexts when replacement page setup times out', async () => {
    const release = deferred();
    let attempts = 0;
    pool = new PlaywrightDriverPool(browser, { timeout: 1500 }, async () => {
      if (++attempts === 2) await release.promise;
    });
    const errors: string[] = [];
    pool.onTaskError((error) => errors.push(error.message));
    await pool.task(async (page) => {
      await page.setUserAgent('QualWeb replacement timeout regression');
    });
    pool.queue({});
    try {
      await within(pool.idle());
      assert.equal(attempts, 2);
      assert.deepEqual(errors, ['Timeout hit: 1500']);
      assert.equal(browser.contexts().length, 0);
    } finally {
      release.resolve();
    }
  });

  it('can close an idle pool repeatedly without leaving a browser connected', async () => {
    pool = new PlaywrightDriverPool(browser);
    await within(pool.idle());
    const closing = pool.close();
    await within(pool.close());
    assert.equal(browser.isConnected(), false);
    await within(closing);
    await within(pool.close());
    assert.equal(browser.isConnected(), false);
    assert.throws(() => pool!.queue({}), /closed browser pool/);
  });
});
