import type { QualwebPlugin } from '.';
import type { Page } from 'puppeteer';

export class PluginManager {
  /**
   * Array of plugins added with QualWeb.use().
   */
  private readonly plugins: QualwebPlugin[] = [];

  /**
   * Adds a plugin to be run when executing a QualWeb evaluation.
   * Plugins are called in the same order they were added to the instance.
   *
   * @param {QualwebPlugin} plugin - The plugin to add.
   */
  public use(plugin: QualwebPlugin): void {
    this.plugins.push(plugin);
  }

  /**
   * Execute beforePageLoad on all plugins in order.
   * If any exceptions occur during the execution of a plugin, it should bubble up past the
   * call to Qualweb.evaluate() so the user can handle it on their own.
   *
   * @param {Page} page - Puppeteer page
   * @param {string} url - URL currently being evaluated. Note that the page's
   * URL is probably "about:blank" at this point, since we haven't navigated to
   * the URL yet.
   */
  public async executeBeforePageLoad(page: Page, url?: string): Promise<void> {
    this.plugins.forEach(async (plugin) => await plugin.beforePageLoad?.(page, url || 'customHtml'));
  }

  /**
   * Execute afterPageLoad on all plugins in order.
   * Same assumptions for exceptions apply as they did for beforePageLoad.
   *
   * @param {Page} page - Puppeteer page
   */
  public async executeAfterPageLoad(page: Page): Promise<void> {
    this.plugins.forEach(async (plugin) => await plugin.afterPageLoad?.(page, page.url() || 'customHtml'));
  }
}
