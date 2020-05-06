'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle, Page } from 'puppeteer';
import { CSSStylesheet } from '@qualweb/core';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice } from '../lib/decorator';

@BestPractice
class QW_BP14 extends BestPracticeObject {

  private containers = ['span', 'article', 'section', 'nav', 'aside', 'hgroup', 'header', 'footer', 'address', 'p', 'hr', 'blockquote', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'dd', 'dt', 'dl', 'figcaption']

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  async execute(element: ElementHandle | undefined, page: Page | undefined, styleSheets: CSSStylesheet[] | undefined): Promise < void > {

    if (!styleSheets) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    for (const styleSheet of styleSheets) {
      if (styleSheet.content && styleSheet.content.plain) {
        this.analyseAST(styleSheet.content.parsed, styleSheet.file, evaluation);
      }
    }

    super.addEvaluationResult(evaluation);
  }
  private analyseAST(cssObject: any, fileName: string, evaluation: BestPracticeResult): void {
    if (cssObject === undefined ||
      cssObject['type'] === 'comment' ||
      cssObject['type'] === 'keyframes' ||
      cssObject['type'] === 'import') { // ignore
      return;
    }
    if (cssObject['type'] === 'rule' || cssObject['type'] === 'font-face' || cssObject['type'] === 'page') {
      this.loopDeclarations(cssObject, fileName, evaluation)
    } else {
      if (cssObject['type'] === 'stylesheet') {
        for (const key of cssObject['stylesheet']['rules']) {
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
    if (declarations && cssObject['selectors'] && this.selectorIsContainer(cssObject['selectors'])) {
      for (const declaration of declarations || []) {
        if (declaration['property'] && declaration['value']) {
          if (declaration['property'] === 'width') {
            this.extractInfo(cssObject, declaration, fileName, evaluation);
          }
        }
      }
    }
  }
  private selectorIsContainer(selectors: Array<string>): boolean {
    for(const selector of selectors || []){
      const splitSelector = selector.split(' ');
      for (const selector2 of splitSelector || []) {
        if(this.containers.includes(selector2)) {
          return true;
        }
      }
    }
    return false;
  }

  private extractInfo(cssObject: any, declaration: any, fileName: string, evaluation: BestPracticeResult): void {
    if (declaration['value'].endsWith('px')) {
      evaluation.verdict = 'failed';
      evaluation.description = `At least one container's width has been specified using values expressed in px`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = `At least one container's width has been specified using values expressed other metric than px`;
      evaluation.resultCode = 'RC2';
    }
  }
}

export = QW_BP14;
