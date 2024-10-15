import { expect } from 'chai';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { usePuppeteer } from './util';

describe('url.spec.js', function() {
    const proxy = usePuppeteer();

    it('Evaluates url', async function() {
        this.timeout(0);

        const url = 'https://amagovpt.github.io/booka11y/testes/tabela-2throws.html';

        const dom = new Dom(proxy.page);
        await dom.process(
            {
                execute: { wcag: true },
                'wcag-techniques': { techniques: ['QW-WCAG-T14'] }
            },
            url,
            ''
        );

        await proxy.page.addScriptTag({
            path: require.resolve('@qualweb/qw-page')
        });

        await proxy.page.addScriptTag({
            path: require.resolve('@qualweb/util')
        });

        await proxy.page.addScriptTag({
            path: require.resolve('../dist/wcag.bundle.js')
        });
        await new Promise(r => setTimeout(r, 2000));

        const report = await proxy.page.evaluate((locale) => {
            // @ts-expect-error: WCAGTechniques should be defined within the executing context.
            const wcag = new WCAGTechniques(
                {
                    translate: locale,
                    fallback: locale
                },
                {
                    techniques: ['QW-WCAG-T14']
                }
            );
            return wcag.execute(false, undefined);
        }, locales.en);

        console.log(report);
        console.log(report.assertions['QW-WCAG-T14'].results);
        expect(report);
    });
});
