const {
    configure,
    executeACTR
} = require('../../dist/index');
const {
    getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');

describe('Rule QW-ACT-R13', function () {

    const tests = [
        {
            url: 'https://act-rules.github.io/testcases/b4f0c3/7586e3500c241da9a4d27d5495ef8d5c58d7dce5.html',
            outcome: 'passed'
        },
        {
            url: 'https://act-rules.github.io/testcases/b4f0c3/04e2ffae5716c8c5cb215ccf924ae70e444409ef.html',
            outcome: 'passed'
        },
        {
            url: 'https://act-rules.github.io/testcases/b4f0c3/c1364984e3d76d59d940e989901a2bf7619ad491.html',
            outcome: 'passed'
        },
        {
            url: 'https://act-rules.github.io/testcases/b4f0c3/45284eee86781e6bdcecc8211674449d81631e8d.html',
            outcome: 'passed'
        },

        {
            url: 'https://act-rules.github.io/testcases/b4f0c3/900e431123d594638cfffacd3930e63a17645a09.html',
            outcome: 'failed'
        },
        {
            url: 'https://act-rules.github.io/testcases/b4f0c3/38aa06d7736bdb3f82aa9ae75d05e5b4b747f440.html',
            outcome: 'failed'
        },
        {
            url: 'https://act-rules.github.io/testcases/b4f0c3/97368ebf283cb7c4b933a3989e983ef862bb0d65.html',
            outcome: 'failed'
        },
        {
            url: 'https://act-rules.github.io/testcases/b4f0c3/d6d0c983905d0c8b59ed4ecb6cb07d801532d530.html',
            outcome: 'failed'
        },
        {
            url: 'https://act-rules.github.io/testcases/b4f0c3/92d0a60559f3e41f7072dcc88330a5cd8c693a0d.html',
            outcome: 'failed'
        },

        {
            url: 'https://act-rules.github.io/testcases/b4f0c3/b790de4e60b09fb9e7a3c03a00a82499e7474d0d.html',
            outcome: 'inapplicable'
        },
        {
            url: 'https://act-rules.github.io/testcases/b4f0c3/ebca0ed6d2a77a86c34b646e4ee08834b1aa67cc.html',
            outcome: 'inapplicable'
        }
    ];

    let i = 0;
    let lastOutcome = 'passed';
    for (const test of tests || []) {
        if (test.outcome !== lastOutcome) {
            lastOutcome = test.outcome;
            i = 0;
        }
        i++;
        describe(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, function () {
            it(`should have outcome="${test.outcome}"`, async function () {
                this.timeout(10 * 1000);
                const { source, processed, stylesheets } = await getDom(test.url);
                configure({ rules: ['QW-ACT-R14'] });
                const report = await executeACTR(test.url, source.html.parsed, processed.html.parsed, stylesheets);
                expect(report.rules['QW-ACT-R14'].metadata.outcome).to.be.equal(test.outcome);
            });
        });
    }
});
