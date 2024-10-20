import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer';

const defaultOptions: PuppeteerLaunchOptions = {
  devtools: false,
  headless: true,
};

export async function launchBrowser(launchOptions: PuppeteerLaunchOptions = {}) {
  // Overwrite default options with the ones provided, if any.
  const options = { ...defaultOptions, ...launchOptions };

  if (!options.headless) {
    options.headless = process.env.TEST_PUPPETEER_HEADLESS?.toLowerCase() === 'false' || false;
  }

  if (!options.args) {
    options.args = ['--no-sandbox']
  }

  return await puppeteer.launch(options);
}
