import { expect } from 'chai';
import { usePuppeteer } from './util';
import type {} from '../src/index';

describe('Concrete role classification', function () {
  this.timeout(30000);
  const proxy = usePuppeteer();

  async function classify(html: string): Promise<{ widget: boolean; groupOrWidget: boolean }> {
    await proxy.page.setContent(html);
    await proxy.page.addScriptTag({ path: require.resolve('@qualweb/qw-page') });
    await proxy.page.addScriptTag({ path: require.resolve('../dist/__webpack/util.bundle.js') });
    return proxy.page.evaluate(() => {
      const element = window.qwPage.getElements('#target')[0];
      return {
        widget: window.AccessibilityUtils.isElementWidget(element),
        groupOrWidget: window.AccessibilityUtils.isElementGroupOrWidget(element)
      };
    });
  }

  const cases: Array<[string, string, boolean, boolean]> = [
    ['native button', '<button id="target">Save</button>', true, true],
    ['native text input', '<input id="target">', true, true],
    ['native fieldset', '<fieldset id="target"></fieldset>', false, true],
    ['unknown and abstract token fallback', '<div id="target" role="unknown widget button"></div>', true, true],
    ['first concrete token wins', '<div id="target" role="heading button"></div>', false, false],
    ['unknown tokens use native semantics', '<button id="target" role="unknown widget">Save</button>', true, true],
    ['case and whitespace', '<div id="target" role="  BUTTON  "></div>', true, true],
    ['group', '<div id="target" role="group"></div>', false, true],
    ['toolbar', '<div id="target" role="toolbar"></div>', false, true],
    ['composite widget', '<div id="target" role="treegrid"></div>', true, true],
    ['separator', '<div id="target" role="separator"></div>', false, false],
    ['keyboard-focusable separator', '<div id="target" role="separator" tabindex="0" aria-valuenow="50"></div>', true, true],
    ['programmatically focusable separator', '<div id="target" role="separator" tabindex="-1" aria-valuenow="50"></div>', true, true],
    ['hidden separator', '<div id="target" role="separator" tabindex="-1" style="display:none"></div>', false, false],
    ['editable separator', '<div id="target" role="separator" contenteditable="true" aria-valuenow="50"></div>', true, true],
    ['plaintext editing host', '<div id="target" role="separator" contenteditable="plaintext-only"></div>', true, true],
    ['empty contenteditable attribute', '<div id="target" role="separator" contenteditable></div>', true, true],
    ['noneditable separator', '<div id="target" role="separator" contenteditable="false"></div>', false, false],
    ['hidden editing host', '<div id="target" role="separator" contenteditable style="display:none"></div>', false, false],
    ['editable descendant is not an editing host', '<div contenteditable><div id="target" role="separator"></div></div>', false, false],
    ['nested editable element is not independently focusable', '<div contenteditable><div id="target" role="separator" contenteditable></div></div>', false, false],
    ['nested editable element with tabindex', '<div contenteditable><div id="target" role="separator" contenteditable tabindex="0"></div></div>', true, true],
    ['invalid tabindex separator', '<div id="target" role="separator" tabindex="invalid"></div>', false, false],
    ['tabpanel', '<div id="target" role="tabpanel"></div>', false, false],
    ['DPUB widget', '<div id="target" role="doc-noteref"></div>', true, true],
    ['Graphics group', '<div id="target" role="graphics-object"></div>', false, true],
    ['extension token takes precedence', '<div id="target" role="doc-chapter button"></div>', false, false],
    ['presentation', '<div id="target" role="presentation button"></div>', false, false],
    ['focusable presentation falls back to native role', '<button id="target" role="none">Save</button>', true, true],
    ['programmatic focus overrides presentation', '<fieldset id="target" role="presentation" tabindex="-1"></fieldset>', false, true],
    ['programmatic focus overrides none', '<fieldset id="target" role="none" tabindex="-1"></fieldset>', false, true],
    ['editing host overrides presentation', '<fieldset id="target" role="presentation" contenteditable></fieldset>', false, true],
    ['editing host overrides none', '<fieldset id="target" role="none" contenteditable="true"></fieldset>', false, true],
    ['hidden fieldset retains presentation', '<fieldset id="target" role="presentation" tabindex="-1" style="display:none"></fieldset>', false, false],
    ['disabled input retains presentation', '<input id="target" role="presentation" tabindex="-1" disabled>', false, false],
    ['ARIA presentation conflict', '<fieldset id="target" role="presentation" aria-label="Settings"></fieldset>', false, true],
    ['no role', '<div id="target"></div>', false, false]
  ];

  for (const [name, html, widget, groupOrWidget] of cases) {
    it(name, async function () {
      expect(await classify(html)).to.deep.equal({ widget, groupOrWidget });
    });
  }

  it('includes disabled extension widgets without including non-widget roles', async function () {
    await classify('<div id="target" role="doc-noteref" aria-disabled="true"></div>' +
      '<div id="separator" role="separator" aria-disabled="true"></div>');
    const ids = await proxy.page.evaluate(() =>
      window.AccessibilityUtils.getDisabledWidgets().map((element) => element.getElementAttribute('id'))
    );
    expect(ids).to.deep.equal(['target']);
  });

  it('computes an accessible name containing an embedded native textbox', async function () {
    await classify('<button id="target">Search <input value="documents"></button>');
    const name = await proxy.page.evaluate(() =>
      window.AccessibilityUtils.getAccessibleName(window.qwPage.getElements('#target')[0])
    );
    expect(name).to.equal('Search documents');
  });

  it('collects disabled focusable separators but excludes static separators', async function () {
    await classify('<div id="target" role="separator" tabindex="0" aria-valuenow="50" aria-disabled="true"></div>' +
      '<div id="programmatic" role="separator" tabindex="-1" aria-valuenow="50" aria-disabled="true"></div>' +
      '<div id="editable" role="separator" contenteditable aria-valuenow="50" aria-disabled="true"></div>' +
      '<div id="static" role="separator" aria-disabled="true"></div>');
    const ids = await proxy.page.evaluate(() =>
      window.AccessibilityUtils.getDisabledWidgets().map((element) => element.getElementAttribute('id'))
    );
    expect(ids).to.deep.equal(['target', 'programmatic', 'editable']);
  });
});
