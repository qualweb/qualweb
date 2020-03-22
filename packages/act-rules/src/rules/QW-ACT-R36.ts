'use strict';

import {ElementHandle, Page} from 'puppeteer';
import {ACTRuleResult} from '@qualweb/act-rules';
import {DomUtils, AccessibilityUtils} from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R36 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  async execute(element: ElementHandle, page: Page): Promise<void> {

    let evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const parentTableElem = await getFirstAncestorElementByNameOrRoles(element, page, ['table'], []);
    if (parentTableElem === null) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = "The rule applies only to headers attribute within a table element.";
      evaluation.resultCode = 'RC1';
    } else {
      let isInAT = await AccessibilityUtils.isElementInAT(parentTableElem, page);
      if (!isInAT) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = "This table is not included in the accessibility tree";
        evaluation.resultCode = 'RC2';
        evaluation.htmlCode = await DomUtils.getElementHtmlCode(parentTableElem, true, true);
        evaluation.pointer = await DomUtils.getElementSelector(parentTableElem);
      } else {
        let isVisible = await DomUtils.isElementVisible(parentTableElem);
        if (!isVisible) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = "This table is not visible in page";
          evaluation.resultCode = 'RC3';
          evaluation.htmlCode = await DomUtils.getElementHtmlCode(parentTableElem, true, true);
          evaluation.pointer = await DomUtils.getElementSelector(parentTableElem);
        } else {
          let headerAttributes: string[] = [];
          let elementHeaders = await DomUtils.getElementAttribute(element, 'headers');
          let headers = (elementHeaders ? elementHeaders : "").split(" ");
          for (const header of headers) {
            if (headerAttributes.indexOf(header) < 0) {
              headerAttributes.push(header);
            }
          }

          let i = 0;
          let idElem, idElemRole;
          while(evaluation.verdict !== 'failed' && i < headerAttributes.length) {
            idElem = await getElementByIdInElement(parentTableElem, headerAttributes[i]);
            if (idElem === null) {
              evaluation.verdict = 'failed';
              evaluation.description = "The headers attribute '" + headerAttributes[i] + "' refers to an ID that does not exist within the same table";
              evaluation.resultCode = 'RC5';
            } else {
              idElemRole = await AccessibilityUtils.getElementRole(idElem, page);
              if (idElemRole !== 'rowheader' && idElemRole !== 'columnheader') {
                evaluation.verdict = 'failed';
                evaluation.description = "The headers attribute '" + headerAttributes[i] + "' refers to an element inside the same table which does not have a role of rowheader or columnheader";
                evaluation.resultCode = 'RC6';
              }
            }
            i++;
          }

          if (evaluation.verdict !== 'failed') {
            evaluation.verdict = 'passed';
            evaluation.description = "All headers attributes refer to a cell with a semantic role of columnheader of rowheader within the same table";
            evaluation.resultCode = 'RC7';
          }
        }
      }
    }

    if(!evaluation.htmlCode) {
      const [htmlCode, pointer] = await Promise.all([
        DomUtils.getElementHtmlCode(element, true, true),
        DomUtils.getElementSelector(element)
      ]);
      evaluation.htmlCode = htmlCode;
      evaluation.pointer = pointer;
    }
    await super.addEvaluationResult(evaluation);
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
    let parentRole = await AccessibilityUtils.getElementRole(parent, page);

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

async function getElementByIdInElement(element: ElementHandle, id: string): Promise<ElementHandle | null> {
  if (!id) {
    throw new Error('Invalid id');
  }
  return element.$(`#${id}`);
}

export = QW_ACT_R36;
