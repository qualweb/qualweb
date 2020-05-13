'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import { CSSStylesheet } from '@qualweb/core';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@BestPractice
class QW_BP15 extends BestPracticeObject {

  private absoluteLengths = ['cm', 'mm', 'in', 'px', 'pt', 'pc'];

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  execute(element: QWElement | undefined, page: QWPage | undefined, styleSheets: CSSStylesheet[] | undefined): void {

    if (!styleSheets) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    for (const styleSheet of styleSheets || []) {
      if(styleSheet.content && styleSheet.content.plain) {
        this.analyseAST(styleSheet.content.parsed, styleSheet.file, evaluation);
      }
    }

    super.addEvaluationResult(evaluation);
  }

  private lengthIsAbsolute(value: String): boolean {
    for(const metric of this.absoluteLengths || []){
      if (value.includes(metric))
        return true
    }
    return false;
  }

  private analyseAST(cssObject: any, fileName: string, evaluation: BestPracticeResult): void {
    if (cssObject === undefined ||
      cssObject['type'] === 'comment' ||
      cssObject['type'] === 'keyframes' ||
      cssObject['type'] === 'import'){ // ignore
      return;
    }
    if (cssObject['type'] === 'rule' || cssObject['type'] === 'font-face' || cssObject['type'] === 'QWPage') {
      this.loopDeclarations(cssObject, fileName, evaluation)
    } else {
      if (cssObject['type'] === 'stylesheet') {
        for (const key of cssObject['stylesheet']['rules'] || []) {
          this.analyseAST(key, fileName, evaluation);
        }
      } else {
        for (const key of cssObject['rules'] || []) {
          this.analyseAST(key, fileName, evaluation);
        }
      }
    }
  }
  private loopDeclarations(cssObject: any, fileName: string, evaluation: BestPracticeResult): void {
    const declarations = cssObject['declarations'];
    if(declarations){
      for (const declaration of declarations || []) {
        if (declaration['property'] && declaration['value'] ) {
          if (declaration['property'] === 'width'){
            this.extractInfo(cssObject, declaration, fileName, evaluation);
          }
        }
      }
    }
  }
  private extractInfo(cssObject: any, declaration: any, fileName: string, evaluation: BestPracticeResult): void {
    if(this.lengthIsAbsolute(declaration['value'])){
      evaluation.verdict = 'failed';
      evaluation.description = 'At least one width attribute of an HTML element is expressed in absolute values';
      evaluation.resultCode = 'RC1';
    }else {
      evaluation.verdict = 'passed';
      evaluation.description = 'At least one width attribute of an HTML element is expressed in relative values';
      evaluation.resultCode = 'RC2';
    }
  }
}

export = QW_BP15;