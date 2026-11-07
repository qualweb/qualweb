import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { ClusterPoolStrategy } from '../src/lib/driver/puppeteer/strategy/ClusterPoolStrategy';
import { Cluster } from 'puppeteer-cluster';
import puppeteer from 'puppeteer-extra';
import type { PoolRequest } from '../src/lib/driver/puppeteer/strategy/PoolStrategy';
import type { PuppeteerLaunchOptions } from '../src/lib/driver/puppeteer/PuppeteerDriverOptions';

describe('ClusterPoolStrategy', () => {
  let strategy: ClusterPoolStrategy;
  let clusterLaunchStub: sinon.SinonStub;
  let puppeteerConnectStub: sinon.SinonStub;
  let mockCluster: any;

  beforeEach(() => {
    strategy = new ClusterPoolStrategy();
    
    mockCluster = {
      task: sinon.stub(),
      execute: sinon.stub(),
      idle: sinon.stub().resolves(),
      close: sinon.stub().resolves(),
    };

    clusterLaunchStub = sinon.stub(Cluster, 'launch').resolves(mockCluster);
    puppeteerConnectStub = sinon.stub(puppeteer, 'connect').resolves({} as any);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('launch with local Chrome', () => {
    it('should launch cluster with local Chrome options', async () => {
      const request: PoolRequest = {
        chrome: {
          options: {
            headless: true,
            args: ['--no-sandbox'],
          },
          remote: false,
        },
        maxConcurrency: 3,
        timeout: 30000,
        monitor: undefined as any,
      };

      const pool = await strategy.launch(request);

      expect(clusterLaunchStub.calledOnce).to.be.true;
      
      const launchArgs = clusterLaunchStub.firstCall.args[0];
      expect(launchArgs.concurrency).to.equal(Cluster.CONCURRENCY_CONTEXT);
      expect(launchArgs.maxConcurrency).to.equal(3);
      expect(launchArgs.timeout).to.equal(30000);
      expect(launchArgs.puppeteerOptions).to.deep.equal({
        headless: true,
        args: ['--no-sandbox'],
      });
      expect(launchArgs.puppeteer).to.equal(puppeteer);
      
      expect(pool).to.exist;
    });

    it('should use default puppeteer for local Chrome', async () => {
      const request: PoolRequest = {
        chrome: {
          options: {},
          remote: false,
        },
        maxConcurrency: 1,
        timeout: 60000,
        monitor: undefined as any,
      };

      await strategy.launch(request);

      const launchArgs = clusterLaunchStub.firstCall.args[0];
      expect(launchArgs.puppeteer).to.equal(puppeteer);
    });

    it('should pass monitor option when provided', async () => {
      const request: PoolRequest = {
        chrome: {
          options: {},
          remote: false,
        },
        maxConcurrency: 2,
        timeout: 30000,
        monitor: true,
      };

      await strategy.launch(request);

      const launchArgs = clusterLaunchStub.firstCall.args[0];
      expect(launchArgs.monitor).to.be.true;
    });

    it('should pass monitor as undefined when not provided', async () => {
      const request: PoolRequest = {
        chrome: {
          options: {},
          remote: false,
        },
        maxConcurrency: 2,
        timeout: 30000,
        monitor: undefined as any,
      };

      await strategy.launch(request);

      const launchArgs = clusterLaunchStub.firstCall.args[0];
      expect(launchArgs).to.have.property('monitor');
      expect(launchArgs.monitor).to.be.undefined;
    });
  });

  describe('launch with remote Chrome', () => {
    it('should launch cluster with remote Chrome using WebSocket endpoint', async () => {
      const request: PoolRequest = {
        chrome: {
          options: {
            browserWSEndpoint: 'ws://localhost:9222',
          },
          remote: true,
        },
        maxConcurrency: 5,
        timeout: 45000,
        monitor: undefined as any,
      };

      const pool = await strategy.launch(request);

      expect(clusterLaunchStub.calledOnce).to.be.true;
      
      const launchArgs = clusterLaunchStub.firstCall.args[0];
      expect(launchArgs.concurrency).to.equal(Cluster.CONCURRENCY_CONTEXT);
      expect(launchArgs.maxConcurrency).to.equal(5);
      expect(launchArgs.timeout).to.equal(45000);
      expect(launchArgs.puppeteerOptions).to.deep.equal({
        browserWSEndpoint: 'ws://localhost:9222',
      });
      
      // Should use connecting puppeteer adapter, not the default puppeteer
      expect(launchArgs.puppeteer).to.not.equal(puppeteer);
      expect(launchArgs.puppeteer).to.have.property('launch');
      
      expect(pool).to.exist;
    });

    it('should launch cluster with remote Chrome using browser URL', async () => {
      const request: PoolRequest = {
        chrome: {
          options: {
            browserURL: 'http://localhost:9222',
          },
          remote: true,
        },
        maxConcurrency: 2,
        timeout: 30000,
        monitor: undefined as any,
      };

      await strategy.launch(request);

      const launchArgs = clusterLaunchStub.firstCall.args[0];
      expect(launchArgs.puppeteerOptions).to.deep.equal({
        browserURL: 'http://localhost:9222',
      });
      expect(launchArgs.puppeteer).to.not.equal(puppeteer);
    });

    it('should create connecting puppeteer adapter that calls puppeteer.connect', async () => {
      const request: PoolRequest = {
        chrome: {
          options: {
            browserWSEndpoint: 'ws://browserless:3000',
          },
          remote: true,
        },
        maxConcurrency: 3,
        timeout: 30000,
        monitor: undefined as any,
      };

      await strategy.launch(request);

      const launchArgs = clusterLaunchStub.firstCall.args[0];
      const connectingPuppeteer = launchArgs.puppeteer;
      
      // Simulate puppeteer-cluster calling launch
      const connectOptions: PuppeteerLaunchOptions = {
        browserWSEndpoint: 'ws://browserless:3000',
      };
      
      await connectingPuppeteer.launch(connectOptions);
      
      expect(puppeteerConnectStub.calledOnce).to.be.true;
      expect(puppeteerConnectStub.firstCall.args[0]).to.deep.equal(connectOptions);
    });
  });

  describe('return value', () => {
    it('should return ClusterDriverPool instance', async () => {
      const request: PoolRequest = {
        chrome: {
          options: {},
          remote: false,
        },
        maxConcurrency: 1,
        timeout: 30000,
        monitor: undefined as any,
      };

      const pool = await strategy.launch(request);

      expect(pool).to.exist;
      expect(pool.constructor.name).to.equal('ClusterDriverPool');
      expect(typeof pool.queue).to.equal('function');
      expect(typeof pool.idle).to.equal('function');
      expect(typeof pool.close).to.equal('function');
    });
  });

  describe('concurrency configuration', () => {
    it('should always use CONCURRENCY_CONTEXT', async () => {
      const request: PoolRequest = {
        chrome: {
          options: {},
          remote: false,
        },
        maxConcurrency: 10,
        timeout: 30000,
        monitor: undefined as any,
      };

      await strategy.launch(request);

      const launchArgs = clusterLaunchStub.firstCall.args[0];
      expect(launchArgs.concurrency).to.equal(Cluster.CONCURRENCY_CONTEXT);
    });

    it('should respect maxConcurrency setting', async () => {
      const request: PoolRequest = {
        chrome: {
          options: {},
          remote: false,
        },
        maxConcurrency: 7,
        timeout: 30000,
        monitor: undefined as any,
      };

      await strategy.launch(request);

      const launchArgs = clusterLaunchStub.firstCall.args[0];
      expect(launchArgs.maxConcurrency).to.equal(7);
    });
  });

  describe('timeout configuration', () => {
    it('should pass timeout to cluster', async () => {
      const request: PoolRequest = {
        chrome: {
          options: {},
          remote: false,
        },
        maxConcurrency: 1,
        timeout: 90000,
        monitor: undefined as any,
      };

      await strategy.launch(request);

      const launchArgs = clusterLaunchStub.firstCall.args[0];
      expect(launchArgs.timeout).to.equal(90000);
    });
  });

  describe('error handling', () => {
    it('should propagate cluster launch errors', async () => {
      const launchError = new Error('Failed to launch cluster');
      clusterLaunchStub.rejects(launchError);

      const request: PoolRequest = {
        chrome: {
          options: {},
          remote: false,
        },
        maxConcurrency: 1,
        timeout: 30000,
        monitor: undefined as any,
      };

      try {
        await strategy.launch(request);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).to.equal(launchError);
      }
    });

    it('should propagate puppeteer.connect errors for remote Chrome', async () => {
      const connectError = new Error('Failed to connect to remote Chrome');
      puppeteerConnectStub.rejects(connectError);

      const request: PoolRequest = {
        chrome: {
          options: {
            browserWSEndpoint: 'ws://invalid:9222',
          },
          remote: true,
        },
        maxConcurrency: 1,
        timeout: 30000,
        monitor: undefined as any,
      };

      await strategy.launch(request);

      const launchArgs = clusterLaunchStub.firstCall.args[0];
      const connectingPuppeteer = launchArgs.puppeteer;

      try {
        await connectingPuppeteer.launch({ browserWSEndpoint: 'ws://invalid:9222' });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).to.equal(connectError);
      }
    });
  });
});
