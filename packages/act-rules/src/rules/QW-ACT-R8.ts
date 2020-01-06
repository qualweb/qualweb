'use strict';

import {ACTRule, ACTRuleResult} from '@qualweb/act-rules';
import Rule from './Rule.object';
import {ElementHandle, Page} from 'puppeteer';

import { DomUtils, AccessibilityTreeUtils } from '@qualweb/util';

/**
 * Technique information
 * @type {Object}
 */
const rule: ACTRule = {
  name: 'Image filename is accessible name for image',
  code: 'QW-ACT-R8',
  mapping: '9eb3f6',
  description: 'This rule checks that image elements that use their source filename as their accessible name do so without loss of information to the user.',
  metadata: {
    target: {
      element: ['img', 'input[type="image"]'],
      attributes: ['src']
    },
    'success-criteria': [{
      name: '1.1.1',
      level: 'A',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content'
    }],
    related: [],
    url: 'https://act-rules.github.io/rules/9eb3f6',
    passed: 0,
    inapplicable: 0,
    warning: 0,
    failed: 0,
    type: ['ACTRule', 'TestCase'],
    a11yReq: ['WCAG21:language'],
    outcome: '',
    description: ''
  },
  results: new Array<ACTRuleResult>()
};

class QW_ACT_R8 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: ElementHandle | undefined,page:Page): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let imageFile = new RegExp('(.apng|.bmp|.gif|.ico|.cur|.jpg|.jpeg|.jfif|.pjpeg|.pjp|.png|.svg|.tif|.tiff|.webp)(\\?.+)?$');

    if (element === undefined ) { // if the element doesn't exist, there's nothing to test
      evaluation.verdict = 'inapplicable';
      evaluation.description = `There are no HTML elements with semantic role of image`;
      evaluation.resultCode = 'RC1';
    } else {
      let accessName = await AccessibilityTreeUtils.getAccessibleName(element,page);
      let isHidden = await DomUtils.isElementHidden(element);
      let role = await DomUtils.getElementAttribute(element,"role");
      if (isHidden) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `This element is not included in the accessibility tree`;
        evaluation.resultCode = 'RC2';
      } else if (role !== null &&await DomUtils.getElementAttribute(element,"role") !== 'img') {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `This element doesn't have the semantic role of image`;
        evaluation.resultCode = 'RC3';
      } else {
        let src = await DomUtils.getElementAttribute(element,"src");
        if(src){
        let filepath = src.split('/');
        let filenameWithExtension = filepath[filepath.length - 1];
        let parent = await DomUtils.getElementParent(element);

        if (filenameWithExtension === accessName) {
          if (imageFile.test(filenameWithExtension)) {
            if (parent && await DomUtils.getElementTagName(parent) && await DomUtils.getElementText(parent)){
              evaluation.verdict = 'passed';
              evaluation.description = `This element's accessible name includes the filename but, with the text content of the a element, the image is accurately described`;
              evaluation.resultCode = 'RC4';DomUtils
            } else {
              evaluation.verdict = 'failed';
              evaluation.description = `The presence of the file extension in the accessible name doesn't accurately describe the image`;
              evaluation.resultCode = 'RC5';
            }
          } else {
            evaluation.verdict = 'passed';
            evaluation.description = `This element's accessible name uses the filename which accurately describes the image`;
            evaluation.resultCode = 'RC6';
          }
        } else {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `This element's accessible name is not equivalent to the file name specified in the src attribute.`;
          evaluation.resultCode = 'RC7';
        }
      }else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `This element's accessible name is not equivalent to the file name specified in the src attribute.`;
        evaluation.resultCode = 'RC8';
      }
    }

      if (element !== undefined) {
        evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
        evaluation.pointer = await DomUtils.getElementSelector(element);
      }

    super.addEvaluationResult(evaluation);
  }
}}

export = QW_ACT_R8;
