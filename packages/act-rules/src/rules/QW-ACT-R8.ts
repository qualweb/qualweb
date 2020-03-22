'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R8 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  async execute(element: ElementHandle, page:Page): Promise<void> {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const imageFile = new RegExp('(.apng|.bmp|.gif|.ico|.cur|.jpg|.jpeg|.jfif|.pjpeg|.pjp|.png|.svg|.tif|.tiff|.webp)(\\?.+)?$');

    const [isInAT, role] = await Promise.all([
      AccessibilityUtils.isElementInAT(element,page),
      DomUtils.getElementAttribute(element, 'role')
    ]);

    if (!isInAT) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target is not included in the accessibility tree.`;
      evaluation.resultCode = 'RC1';
    } else if (role && role !== 'img') {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target doesn't have the semantic role of image`;
      evaluation.resultCode = 'RC2';
    } else {
      const src = await DomUtils.getElementAttribute(element, 'src');
      if(src) {
        const filepath = src.split('/');
        const filenameWithExtension = filepath[filepath.length - 1];

        const [parent, accessibleName] = await Promise.all([
          DomUtils.getElementParent(element),
          AccessibilityUtils.getAccessibleName(element, page)
        ]);

        if (filenameWithExtension === accessibleName) {
          if (parent && imageFile.test(filenameWithExtension)) {
            const [tagName, elementText] = await Promise.all([
              DomUtils.getElementTagName(parent),
              DomUtils.getElementText(parent)
            ]);

            if (tagName && elementText){
              evaluation.verdict = 'passed';
              evaluation.description = `The test target accessible name includes the filename but with the text content of the \`a\` element, the image is accurately described.`;
              evaluation.resultCode = 'RC3';DomUtils
            } else {
              evaluation.verdict = 'failed';
              evaluation.description = `The presence of the file extension in the accessible name doesn't accurately describe the image.`;
              evaluation.resultCode = 'RC4';
            }
          } else {
            evaluation.verdict = 'passed';
            evaluation.description = `This element's accessible name uses the filename which accurately describes the image.`;
            evaluation.resultCode = 'RC5';
          }
        } else {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target accessible name is not equivalent to the file name specified in the \`src\` attribute.`;
          evaluation.resultCode = 'RC6';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target accessible name is not equivalent to the file name specified in the \`src\` attribute.`;
        evaluation.resultCode = 'RC7';
      }
    }
    
    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R8;
