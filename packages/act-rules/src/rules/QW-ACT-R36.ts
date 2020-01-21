'use strict';

import {ElementHandle, Page} from 'puppeteer';
import Rule from './Rule.object';
import {ACTRuleResult} from '@qualweb/act-rules';
import {DomUtils, AccessibilityTreeUtils} from '@qualweb/util';
import _ from 'lodash';

class QW_ACT_R36 extends Rule {

  constructor() {
    super({
      name: 'Headers attribute specified on a cell refers to cells in the same table element',
      code: 'QW-ACT-R36',
      mapping: 'a25f45',
      description: 'This rule checks that the headers attribute on a cell refer to other cells in the same table element with a semantic role of columnheader or rowheader.',
      metadata: {
        target: {
          element: 'table',
        },
        'success-criteria': [
          {
            name: '1.3.1',
            level: 'A',
            principle: 'Perceivable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html'
          },
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/a25f45',
        passed: 0,
        warning: 0,
        inapplicable: 0,
        failed: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:language'],
        outcome: '',
        description: ''
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {

    if (!element) {
      return;
    }

    let evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const parentTableElem = DomUtils.isElementADescendantOf(element, page, ['table'], []);
    if (parentTableElem === null) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = "The rule applies only to headers attribute within a table element.";
      evaluation.resultCode = 'RC1';
    } else {
      let isInAT = AccessibilityTreeUtils.isElementInAt(parentTableElem, page);
      if (!isInAT) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = "This table is not included in the accessibility tree";
        evaluation.resultCode = 'RC2';
        evaluation.htmlCode = DomUtils.getElementHtmlCode(parentTableElem);
      } else {
        let isVisible = DomUtils.isElemenVisible(parentTableElem);
        if (!isVisible) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = "This table is not visible in page";
          evaluation.resultCode = 'RC3';
          evaluation.htmlCode = DomUtils.getElementHtmlCode(parentTableElem);
        } else {
          let headerAttributes: string[] = [];
          let headers = _.split(DomUtils.getElementAttribute(element, 'headers'), ' ');
          for (const header of headers) {
            if (_.indexOf(headerAttributes, header) < 0) {
              headerAttributes.push(header);
            }
          }

          for (const h of headerAttributes) {
            const idElem = await parentTableElem.$('[id="' + h + '"');
            if (idElem === null) {
              evaluation.verdict = 'failed';
              evaluation.description = "The headers attribute '" + h + "' refers to an ID that does not exist within the same table";
              evaluation.resultCode = 'RC5';
            } else {
              const idElemRole = AccessibilityTreeUtils.getElementRole(element);
              if (idElemRole !== 'rowheader' && idElemRole !== 'columnheader') {
                evaluation.verdict = 'failed';
                evaluation.description = "The headers attribute '" + h + "' refers to an element inside the same table which does not have a role of rowheader or columnheader";
                evaluation.resultCode = 'RC6';
              }
            }
          }
          if (evaluation.verdict === '') {
            evaluation.verdict = 'passed';
            evaluation.description = "All headers attributes refer to a cell with a semantic role of columnheader of rowheader within the same table";
            evaluation.resultCode = 'RC7';
          }
        }
      }
    }
  }
}

export = QW_ACT_R36;
