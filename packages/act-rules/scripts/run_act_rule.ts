import { Command } from 'commander';

import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { launch } from 'puppeteer';

import rules from '../src/lib/rules.json';

/**
 * Retrieves data for a specific QualWeb ACT rule in rules.json, if they exist.
 * Throws if the rule could not be found.
 * @param rule ACT rule to find data for. Must either be in QW rule format
 * (QW-ACT-Rxx) or the has of an ACT rule (such as "b4f0c3").
 * @returns Matching rule data from rules.json.
 */
function getRuleData(rule: string): { code: string, mapping: string} {
  let ruleData;

  if (rule.length === 6) {
    // Hash format.
    ruleData = Object.values(rules).find(r => typeof r === 'object' && 'mapping' in r && r.mapping === rule);
  } else {
    // QW format.
    ruleData = rules[rule.replace(/-/g, '_') as keyof typeof rules];
  }

  if (typeof ruleData === 'object' && 'code' in ruleData && 'mapping' in ruleData) {
    return ruleData;
  }

  throw new Error(`No such rule, ${rule}`);
}

async function main(): Promise<void> {
  // Create a command object. This handles known options/arguments and will
  // handle parsing.
  const command = new Command('run-act')
    .requiredOption('--url <url>', 'URL to run the ACT rule on.')
    .requiredOption('--act-rule <rule>', 'Which ACT rule to run. Must either be the QualWeb name (QW-ACT-Rxx)')
    .option('--headless', 'Runs Puppeteer in headless mode (default).', 'new')
    .option('--no-headless', 'Runs Puppeteer in a window.')
    ;

  await command.parseAsync();

  const { actRule, url, headless }: { actRule: string, url: string, headless?: 'new' } = command.opts();

  // Retrieve the relevant rule's data.
  const ruleData = getRuleData(actRule);

  if (!ruleData) {
    throw new Error(`No rule with ID ${actRule} found.`);
  }

  console.info(`Running ${ruleData.code} (${ruleData.mapping}) against URL ${url}`);

  // Fire up puppeteer.
  const browser = await launch({ headless });
  const page = await browser.newPage();

  // Most of this code was pulled from rule.spec.mjs
  try {
    const dom = new Dom(page);
    const { sourceHtml } = await dom.process(
      {
        execute: { act: true },
        'act-rules': {
          rules: [ruleData.code]
        },
        waitUntil: ruleData.code === 'QW-ACT-R4' || ruleData.code === 'QW-ACT-R71' ? ['load', 'networkidle0'] : 'load'
      },
      url,
      ''
    );

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/act.bundle.js')
    });

    await page.evaluate(
      (locale, options) => {
        // @ts-expect-error: types and classes will be defined within the executing scope.
        window.act = new ACTRules({ translate: locale, fallback: locale }, options);
      },
      locales.en,
      { rules: [ruleData.code] }
    );

    if (ruleData.mapping === '8a213c') {
      await page.keyboard.press('Tab'); // for R72 that needs to check the first focusable element
    }
    await page.evaluate((sourceHtmlHeadContent) => {
      window.act.validateFirstFocusableElementIsLinkToNonRepeatedContent();

      const parser = new DOMParser();
      const sourceDoc = parser.parseFromString('', 'text/html');

      sourceDoc.head.innerHTML = sourceHtmlHeadContent;

      const elements = sourceDoc.querySelectorAll('meta');
      const metaElements = new Array();
      for (const element of elements) {
        metaElements.push(window.qwPage.createQWElement(element));
      }

      window.act.validateMetaElements(metaElements);
      window.act.executeAtomicRules();
      window.act.executeCompositeRules();
    }, sourceHtml);

    if (ruleData.mapping === '59br37') {
      await page.setViewport({
        width: 640,
        height: 512
      });
    }

    // const report = await page.evaluate(() => {
    //   window.act.validateZoomedTextNodeNotClippedWithCSSOverflow();
    //   return window.act.getReport();
    // });

    // console.debug(`Report done: ${report.assertions}`);
  } catch (_err: unknown) {
    // Pages should *always* close after the test.
    console.error('An error occurred while running the evaluation');
    console.error(_err);
  }

  await page.close();
  await browser.close();
}

// Only invoke main() directly if this script was invoked from the command line.
if (require.main === module) {
  main();
}
