'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { 
  ACTRule, 
  ElementExists,
  ElementIsInAccessibilityTree,
  ElementHasAttributeRole,
  ElementHasAttribute,
  ElementSrcAttributeFilenameEqualsAccessibleName
} from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";

@ACTRule
class QW_ACT_R8 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementIsInAccessibilityTree
  @ElementHasAttributeRole('img')
  @ElementHasAttribute('src')
  @ElementSrcAttributeFilenameEqualsAccessibleName
  execute(element: QWElement): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const imageFile = new RegExp('(.apng|.bmp|.gif|.ico|.cur|.jpg|.jpeg|.jfif|.pjpeg|.pjp|.png|.svg|.tif|.tiff|.webp)(\\?.+)?$');

    const src = <string> element.getElementAttribute('src');

    const filePath = src.split('/');
    const filenameWithExtension = filePath[filePath.length - 1];

    const parent = element.getElementParent();

    if (parent && imageFile.test(filenameWithExtension)) {
      const tagName = element.getElementTagName();
      const elementText = element.getElementText();

      if (tagName && elementText){
        evaluation.verdict = 'passed';
        evaluation.description = `The test target accessible name includes the filename but with the text content of the \`a\` element, the image is accurately described.`;
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The presence of the file extension in the accessible name doesn't accurately describe the image.`;
        evaluation.resultCode = 'RC2';
      }
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = `This element's accessible name uses the filename which accurately describes the image.`;
      evaluation.resultCode = 'RC3';
    }
    
    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R8;
