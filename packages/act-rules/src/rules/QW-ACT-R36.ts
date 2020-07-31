'use strict';

import {ACTRuleResult} from '@qualweb/act-rules';
import {DomUtils, AccessibilityUtils} from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";
import {QWPage} from "@qualweb/qw-page";

@ACTRuleDecorator
class QW_ACT_R36 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    let evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const parentTableElem = getFirstAncestorElementByNameOrRoles(element, page, ['table'], []);
    if (parentTableElem === null) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = "The rule applies only to headers attribute within a table element.";
      evaluation.resultCode = 'RC1';
    } else {
      let isInAT = AccessibilityUtils.isElementInAT(parentTableElem, page);
      if (!isInAT) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = "This table is not included in the accessibility tree";
        evaluation.resultCode = 'RC2';
      } else {
        let isVisible = DomUtils.isElementVisible(parentTableElem,page);
        if (!isVisible) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = "This table is not visible in page";
          evaluation.resultCode = 'RC3';
        } else {
          let headerAttributes: string[] = [];
          let elementHeaders = element.getElementAttribute('headers');
          let headers = (elementHeaders ? elementHeaders : "").split(" ");
          for (const header of headers) {
            if (headerAttributes.indexOf(header) < 0) {
              headerAttributes.push(header);
            }
          }

          let i = 0;
          let idElem, idElemRole;
          while(evaluation.verdict !== 'failed' && i < headerAttributes.length) {
            idElem = getElementByIdInElement(parentTableElem, headerAttributes[i]);
            if (idElem === null) {
              evaluation.verdict = 'failed';
              evaluation.description = "The headers attribute '" + headerAttributes[i] + "' refers to an ID that does not exist within the same table";
              evaluation.resultCode = 'RC5';
            } else {
              idElemRole = AccessibilityUtils.getElementRole(idElem, page);
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
    super.addEvaluationResult(evaluation,element,true,true);
  }
}

function getFirstAncestorElementByNameOrRoles(element: QWElement, page: QWPage, names: string[], roles: string[]): QWElement | null {
  if (!element) {
    throw Error('Element is not defined');
  }

  let parent = element.getElementParent();
  let result = false;
  let sameRole, sameName;

  if (parent !== null) {
    let parentName = parent.getElementTagName();
    let parentRole = AccessibilityUtils.getElementRole(parent, page);

    if (parentName !== null) {
      sameName = names.includes(parentName);
    }
    if (parentRole !== null) {
      sameRole = roles.includes(parentRole);
    }
    result = sameName || sameRole;
    if (!result) {
      return getFirstAncestorElementByNameOrRoles(parent, page, names, roles);
    } else {
      return parent;
    }
  } else {
    return null;
  }
}

function getElementByIdInElement(element: QWElement, id: string): QWElement | null {
  if (!id) {
    throw new Error('Invalid id');
  }
  return element.getElement(`#${id}`);
}

export = QW_ACT_R36;
