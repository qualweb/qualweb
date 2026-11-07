import { describe, it } from 'mocha';
import { expect } from 'chai';
import { resolveChrome } from '../src/lib/driver/puppeteer/browser/resolveChrome';
  import type { PuppeteerDriverOptions, PuppeteerLaunchOptions } from '../src/lib/driver/puppeteer/PuppeteerDriverOptions';
describe('resolveChrome', () => {
  describe('local Chrome (launch)', () => {
    it('should return local Chrome when no options provided', () => {
      const result = resolveChrome(undefined);
      
      expect(result.options).to.deep.equal({});
      expect(result.remote).to.equal(false);
    });

    it('should return local Chrome with base launch options', () => {
      const base: PuppeteerDriverOptions = {
        launchOptions: {
          headless: true,
          args: ['--no-sandbox']
        }
      };
      
      const result = resolveChrome(base);
      
      expect(result.options).to.deep.equal({
        headless: true,
        args: ['--no-sandbox']
      });
      expect(result.remote).to.equal(false);
    });

    it('should merge base and override launch options', () => {
      const base: PuppeteerDriverOptions = {
        launchOptions: {
          headless: true,
          args: ['--no-sandbox']
        }
      };
      const override: PuppeteerLaunchOptions = {
        headless: false,
        devtools: true
      };
      
      const result = resolveChrome(base, override);
      
      expect(result.options).to.deep.equal({
        headless: false,
        args: ['--no-sandbox'],
        devtools: true
      });
      expect(result.remote).to.equal(false);
    });

    it('should override base options with override options', () => {
      const base: PuppeteerDriverOptions = {
        launchOptions: {
          headless: true,
          timeout: 30000
        }
      };
      const override: PuppeteerLaunchOptions = {
        timeout: 60000
      };
      
      const result = resolveChrome(base, override);
      
      expect(result.options.timeout).to.equal(60000);
      expect(result.remote).to.equal(false);
    });
  });

  describe('remote Chrome (connect)', () => {
    it('should detect WebSocket endpoint as remote', () => {
      const base: PuppeteerDriverOptions = {
        launchOptions: {
          browserWSEndpoint: 'ws://localhost:9222'
        }
      };
      
      const result = resolveChrome(base);
      
      expect(result.options.browserWSEndpoint).to.equal('ws://localhost:9222');
      expect(result.remote).to.equal(true);
    });

    it('should detect browser URL as remote', () => {
      const base: PuppeteerDriverOptions = {
        launchOptions: {
          browserURL: 'http://localhost:9222'
        }
      };
      
      const result = resolveChrome(base);
      
      expect(result.options.browserURL).to.equal('http://localhost:9222');
      expect(result.remote).to.equal(true);
    });

    it('should convert chromeUrl with ws:// protocol to browserWSEndpoint', () => {
      const base: PuppeteerDriverOptions = {
        chromeUrl: 'ws://browserless:3000'
      };
      
      const result = resolveChrome(base);
      
      expect(result.options.browserWSEndpoint).to.equal('ws://browserless:3000');
      expect(result.options.browserURL).to.be.undefined;
      expect(result.remote).to.equal(true);
    });

    it('should convert chromeUrl with wss:// protocol to browserWSEndpoint', () => {
      const base: PuppeteerDriverOptions = {
        chromeUrl: 'wss://secure-browserless:3000'
      };
      
      const result = resolveChrome(base);
      
      expect(result.options.browserWSEndpoint).to.equal('wss://secure-browserless:3000');
      expect(result.options.browserURL).to.be.undefined;
      expect(result.remote).to.equal(true);
    });

    it('should convert chromeUrl without protocol to browserURL', () => {
      const base: PuppeteerDriverOptions = {
        chromeUrl: 'http://localhost:9222'
      };
      
      const result = resolveChrome(base);
      
      expect(result.options.browserURL).to.equal('http://localhost:9222');
      expect(result.options.browserWSEndpoint).to.be.undefined;
      expect(result.remote).to.equal(true);
    });

    it('should not override existing browserWSEndpoint with chromeUrl', () => {
      const base: PuppeteerDriverOptions = {
        chromeUrl: 'ws://browserless:3000',
        launchOptions: {
          browserWSEndpoint: 'ws://existing:9222'
        }
      };
      
      const result = resolveChrome(base);
      
      expect(result.options.browserWSEndpoint).to.equal('ws://existing:9222');
      expect(result.remote).to.equal(true);
    });

    it('should not override existing browserURL with chromeUrl', () => {
      const base: PuppeteerDriverOptions = {
        chromeUrl: 'http://browserless:3000',
        launchOptions: {
          browserURL: 'http://existing:9222'
        }
      };
      
      const result = resolveChrome(base);
      
      expect(result.options.browserURL).to.equal('http://existing:9222');
      expect(result.remote).to.equal(true);
    });

    it('should handle override with remote connection', () => {
      const base: PuppeteerDriverOptions = {
        chromeUrl: 'ws://browserless:3000'
      };
      const override: PuppeteerLaunchOptions = {
        timeout: 60000
      };
      
      const result = resolveChrome(base, override);
      
      expect(result.options.browserWSEndpoint).to.equal('ws://browserless:3000');
      expect(result.options.timeout).to.equal(60000);
      expect(result.remote).to.equal(true);
    });

    it('should allow override to set remote connection', () => {
      const base: PuppeteerDriverOptions = {
        launchOptions: {
          headless: true
        }
      };
      const override: PuppeteerLaunchOptions = {
        browserWSEndpoint: 'ws://override:9222'
      };
      
      const result = resolveChrome(base, override);
      
      expect(result.options.browserWSEndpoint).to.equal('ws://override:9222');
      expect(result.options.headless).to.equal(true);
      expect(result.remote).to.equal(true);
    });
  });

  describe('edge cases', () => {
    it('should handle empty base options', () => {
      const base: PuppeteerDriverOptions = {};
      
      const result = resolveChrome(base);
      
      expect(result.options).to.deep.equal({});
      expect(result.remote).to.equal(false);
    });

    it('should handle chromeUrl with case-insensitive protocol matching', () => {
      const base: PuppeteerDriverOptions = {
        chromeUrl: 'WS://browserless:3000'
      };
      
      const result = resolveChrome(base);
      
      expect(result.options.browserWSEndpoint).to.equal('WS://browserless:3000');
      expect(result.remote).to.equal(true);
    });

    it('should handle chromeUrl with WSS protocol (case-insensitive)', () => {
      const base: PuppeteerDriverOptions = {
        chromeUrl: 'WSS://browserless:3000'
      };
      
      const result = resolveChrome(base);
      
      expect(result.options.browserWSEndpoint).to.equal('WSS://browserless:3000');
      expect(result.remote).to.equal(true);
    });

    it('should treat empty string chromeUrl as non-remote', () => {
      const base: PuppeteerDriverOptions = {
        chromeUrl: ''
      };
      
      const result = resolveChrome(base);
      
      expect(result.options.browserWSEndpoint).to.be.undefined;
      expect(result.options.browserURL).to.be.undefined;
      expect(result.remote).to.equal(false);
    });
  });
});
