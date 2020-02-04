'use strict';

import {ElementHandle, Page} from 'puppeteer';
import Rule from './Rule.object';
import {ACTRuleResult} from '@qualweb/act-rules';
import {AccessibilityUtils, DomUtils} from '@qualweb/util';

class QW_ACT_R39 extends Rule {

  constructor() {
    super({
      name: 'All table header cells have assigned data cells',
      code: 'QW-ACT-R39',
      mapping: 'd0f69e',
      description: 'This rule checks that each table header has assigned data cells in a table element.',
      metadata: {
        target: {
          element: ['th', '*[role="columnheader"]', '*[role="rowheader"]'],
        },
        'success-criteria': [
          {
            name: '1.3.1',
            level: 'A',
            principle: 'Perceivable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/d0f69e',
        passed: 0,
        warning: 0,
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

    const role = await AccessibilityUtils.getElementRole(element, page);

    if (role !== 'columnheader' && role !== 'rowheader') {
      return;
    }

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const isInAT = await AccessibilityUtils.isElementInAT(element, page);
    if (isInAT) {
      const isVisible = await DomUtils.isElementVisible(element);
      if (isVisible) {
        let ancestorTableOrGrid = await getFirstAncestorElementByNameOrRoles(element, page, [], ['grid', 'table']);
        if (ancestorTableOrGrid !== null) {
          let isAncestorTableOrGridInAT = await AccessibilityUtils.isElementInAT(ancestorTableOrGrid, page);
          if (isAncestorTableOrGridInAT) {
            let rowElements = await ancestorTableOrGrid.$$('tr, [role="row"]');
            let headerIndex = Array.from(await DomUtils.getElementChildren(ancestorTableOrGrid)).indexOf(element);
            let headerId = await DomUtils.getElementAttribute(element, 'id');

            let found = false;
            let index = 0;
            while (!found || index < rowElements.length) {
              const rowIndexElement = (await DomUtils.getElementChildren(rowElements[index]))[headerIndex];
              const rowIndexElementRole = await AccessibilityUtils.getElementRole(rowIndexElement, page);
              const headersElements = await rowIndexElement.$$('[headers="' + headerId + '"');
              found = rowIndexElementRole === 'cell' || rowIndexElementRole === 'gridcell' || headersElements !== null;
              index++;
            }



            //todo ver as rows todas à procura de pelo menos um elemento com role cell ou gridcell que esteja na mesma posicao que o header ou que tenha atributo headers


          } else {
            evaluation.verdict = 'inapplicable';
            evaluation.description = `The test target's closest ancestor is not included in the accessibility tree`;
            evaluation.resultCode = 'RC2';
          }
        } else {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target does not have a closest ancestor with a semantic role of either table or grid`;
          evaluation.resultCode = 'RC2';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target is not visible`;
        evaluation.resultCode = 'RC2';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The test target is not included in the accessibility tree.';
      evaluation.resultCode = 'RC3';
    }
    await super.addEvaluationResult(evaluation, element);
  }
}

async function getFirstAncestorElementByNameOrRoles(element: ElementHandle, page: Page, names: string[], roles: string[]): Promise<ElementHandle | null> {
  if (!element) {
    throw Error('Element is not defined');
  }

  let parent = await DomUtils.getElementParent(element);
  let result = false;
  let sameRole, sameName;

  if (parent !== null) {
    let parentName = await DomUtils.getElementTagName(parent);
    let parentRole = await AccessibilityTreeUtils.getElementRole(parent, page);

    if (parentName !== null) {
      sameName = names.includes(parentName);
    }
    if (parentRole !== null) {
      sameRole = roles.includes(parentRole);
    }
    result = sameName || sameRole;
    if (!result) {
      return await getFirstAncestorElementByNameOrRoles(parent, page, names, roles);
    } else {
      return parent;
    }
  } else {
    return null;
  }
}

export = QW_ACT_R39;
