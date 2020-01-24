'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import { createHash } from 'crypto';


const rule: ACTRule = {
    name: '`iframe` elements with identical accessible names have equivalent purpose',
    code: 'QW-ACT-R10',
    mapping: '4b1c6c',
    description: 'This rule checks that iframe elements with identical accessible names embed the same resource or equivalent resources.',
    metadata: {
        target: {
            element: 'iframe',
            attributes: ['src']
        },
        'success-criteria': [{
            name: '4.1.2',
            level: 'A',
            principle: 'Robust',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html'
        }],
        related: [],
        url: 'https://act-rules.github.io/rules/4b1c6c',
        passed: 0,
        inapplicable: 0,
        failed: 0,
        warning: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:language'],
        outcome: '',
        description: ''
    },
    results: new Array<ACTRuleResult>()
};

class QW_ACT_R10 extends Rule {

    constructor() {
        super(rule);
    }

    async execute(element: ElementHandle | undefined, page: Page): Promise<void> {
        let evaluation: ACTRuleResult = {
            verdict: '',
            description: '',
            resultCode: ''
        };

        if (element === undefined) { // if the element doesn't exist, there's nothing to test
            evaluation.verdict = 'inapplicable';
            evaluation.description = `body element doesn't exist`;
            evaluation.resultCode = 'RC1';
        } else {
            let iframes = await element.$$('iframe[src]');
            let iframesAlll = await element.$$("iframe");
            if (iframesAlll !== null) {

                for (let iframe of iframesAlll) {
                    let frame = await iframe.contentFrame();
                    if (frame !== null)
                        iframes.push(...(await frame.$$('iframe[src]')));
                }
            }
            let accessibleNames: string[] = [];
            let parent, aName;
            // add iframe contents
            for (let link of iframes) {
                parent = await DomUtils.getElementParent(element);
                if (parent !== null && await DomUtils.getElementTagName(parent) !== 'svg') {
                    aName = await AccessibilityUtils.getAccessibleName(link, page);
                    if (aName) {
                        accessibleNames.push(aName);
                    }

                }
            }
            let counter = 0;
            let hasEqualAn: number[];
            let blacklist: number[] = [];
            let elements: ElementHandle[] = [];
            for (let accessibleName of accessibleNames) {
                hasEqualAn = [];
                if (blacklist.indexOf(counter) >= 0) {
                    //element already evaluated
                }
                else if (accessibleName && accessibleName.trim() !== "") {
                    hasEqualAn = this.isInListExceptIndex(accessibleName, accessibleNames, counter);
                    if (hasEqualAn.length > 0) {
                        blacklist.push(...hasEqualAn);

                        hasEqualAn.push(counter);

                        for (let index of hasEqualAn) {
                            elements.push(iframes[index]);
                        }
                        let hashArray = await this.getContentHash(elements, page);
                        let firstHash = hashArray.pop();
                        let result = true;
                        for (let hash of hashArray) {
                            if (!firstHash || !hashArray || hash !== firstHash) {
                                result = false;
                            }
                        }
                        if (result) {//passed
                            evaluation.verdict = 'passed';
                            evaluation.description = `Iframes with the same accessible name have equal content`;
                            evaluation.resultCode = 'RC2';

                        } else { //failed
                            evaluation.verdict = 'warning';
                            evaluation.description = `Iframes with the same accessible name have different content`;
                            evaluation.resultCode = 'RC3';

                        }

                    } else {//inaplicable
                        evaluation.verdict = 'inapplicable';
                        evaluation.description = `There is no iframe with same the same accessible name`;
                        evaluation.resultCode = 'RC4';
                    }

                    evaluation.htmlCode = await DomUtils.getElementHtmlCode(iframes[counter]);
                    evaluation.pointer = await DomUtils.getElementSelector(iframes[counter]);
                    super.addEvaluationResult(evaluation);
                    evaluation = {
                        verdict: '',
                        description: '',
                        resultCode: ''
                    };
                } else {//inaplicable
                    evaluation.verdict = 'inapplicable';
                    evaluation.description = `iframe doesnt have accessible name`;
                    evaluation.resultCode = 'RC4';
                    evaluation.htmlCode = await DomUtils.getElementHtmlCode(iframes[counter]);
                    evaluation.pointer = await DomUtils.getElementSelector(iframes[counter]);
                    super.addEvaluationResult(evaluation);
                    evaluation = {
                        verdict: '',
                        description: '',
                        resultCode: ''
                    };

                }
                counter++;
                hasEqualAn = [];
                elements = [];
            }
            if (iframes.length === 0) {
                evaluation.verdict = 'inapplicable';
                evaluation.description = `iframe doesnt have accessible name`;
                evaluation.resultCode = 'RC4';
                super.addEvaluationResult(evaluation);
            }
        }
    }


    private async getContentHash(elements: ElementHandle[], page: Page) {
        let browser = await page.browser();
        const newPage = await browser.newPage();
        let content: string[] = [];
        let hash, htmlContent;
        try {
            for (let element of elements) {
                htmlContent = await element.contentFrame();
                if (htmlContent) {
                    hash = createHash('md5').update(await htmlContent.content()).digest('hex');//fixme md5
                }
                content.push(hash);
            }
        } catch (e) {
        }
        ;

        await newPage.close();
        return content;
    }
    private isInListExceptIndex(accessibleName: string, accessibleNames: string[], index: number) {
        let counter = 0;
        let result: number[] = [];
        for (let accessibleNameToCompare of accessibleNames) {
            if (accessibleNameToCompare === accessibleName && counter !== index) {
                result.push(counter);
            }
            counter++;
        }

        return result;
    }


}
export = QW_ACT_R10;