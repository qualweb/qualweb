'use strict';

import { CSSTechnique, CSSTechniqueResult } from '@qualweb/css-techniques';
import { CSSStylesheet } from '@qualweb/get-dom-puppeteer';
import css from 'css';

import Technique from './Technique.object';

const technique: CSSTechnique = {
  name: 'Specifying alignment either to the left or right in CSS',
  code: 'QW-CSS-T2',
  mapping: 'C19',
  description: 'This technique describes how to align blocks of text either left or right by setting the CSS text-align property.',
  metadata: {
    target: {
      element: '*',
      attributes: 'text-align'
    },
    'success-criteria': [
      {
        name: '1.4.8',
        level: 'AAA',
        principle: 'Perceivable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation'
      }
    ],
    related: [],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/css/C19',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<CSSTechniqueResult>()
};

class QW_CSS_T2 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(styleSheets: CSSStylesheet[]): Promise<void> {
    for (const styleSheet of styleSheets || []) {
      if(styleSheet.content && styleSheet.content.plain){
        if (styleSheet.content.plain.includes('text-align')){
          this.analyseAST(styleSheet.content.parsed, styleSheet.file);
        }
      }
    }
  }

  private analyseAST(cssObject: any, fileName: string): void {
    if (cssObject === undefined ||
      cssObject['type'] === 'comment' ||
      cssObject['type'] === 'keyframes' ||
      cssObject['type'] === 'import'){ // ignore
      return;
    }
    if (cssObject['type'] === 'rule' || cssObject['type'] === 'font-face' || cssObject['type'] === 'page') {
      if(cssObject['selectors'])
        this.loopDeclarations(cssObject, fileName)
    } else {
      if (cssObject['type'] === 'stylesheet') {
        for (const key of cssObject['stylesheet']['rules'] || []) {
          this.analyseAST(key, fileName);
        }
      } else {
        for (const key of cssObject['rules'] || []) {
          this.analyseAST(key, fileName);
        }
      }
    }
  }

  private loopDeclarations(cssObject: any, fileName: string): void {
    let declarations = cssObject['declarations'];
    if(declarations){
      for (const declaration of declarations || []) {
        if (declaration['property'] && declaration['value']) {
          if (declaration['property'] === 'text-align'){
            this.extractInfo(cssObject, declaration, fileName);
          }else{
            super.fillEvaluation('failed', `Text block doesn't have alignment property.`,
              css.stringify({ type: 'stylesheet', stylesheet:{rules: [cssObject]}}),
              fileName, cssObject['selectors'].toString(), cssObject['position'],
              declaration['property'], declaration['value'], declaration['position']);
          }
        }
      }
    }
  }

  private extractInfo(cssObject: any, declaration: any, fileName: string): void {
    if(declaration['value'].includes('left') || declaration['value'].includes('right')){
      super.fillEvaluation('passed', `Text block is aligned either left or right.`,
        css.stringify({ type: 'stylesheet', stylesheet:{rules: [cssObject]}}),
        fileName, cssObject['selectors'].toString(), cssObject['position'],
        declaration['property'], declaration['value'], declaration['position']);

    } else {
      super.fillEvaluation('failed', `Text block is aligned neither left nor right.`,
        css.stringify({ type: 'stylesheet', stylesheet:{rules: [cssObject]}}),
        fileName, cssObject['selectors'].toString(), cssObject['position'],
        declaration['property'], declaration['value'], declaration['position']);
    }
  }
}

export = QW_CSS_T2;