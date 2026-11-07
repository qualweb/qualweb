import type { DriverContext, DriverContextPage } from '../../types';
import { openBrowser, releaseBrowser } from './browserLifecycle';
import type { ResolvedChrome } from './resolveChrome';

/**
 * Opens a browser and creates an incognito context exposed as a {@link DriverContext}.
 */
export async function createDriverContext(chrome: ResolvedChrome): Promise<DriverContext> {
  const browser = await openBrowser(chrome);
  const incognito = await browser.createBrowserContext();

  return {
    newPage: async (): Promise<DriverContextPage> => {
      // Type cast required to bridge Puppeteer's Page type with DriverContextPage interface.
      return (await incognito.newPage()) as unknown as DriverContextPage;
    },
    close: async (): Promise<void> => {
      await incognito.close();
      await releaseBrowser(browser, chrome.remote);
    },
  };
}
