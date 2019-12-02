'use strict';

import { CSSTechnique, CSSTechniqueResult } from '@qualweb/css-techniques';
import { CSSStylesheet } from '@qualweb/get-dom-puppeteer';
import css from 'css';

const sectionAndGrouping = ['span', 'article', 'section', 'nav', 'aside', 'hgroup', 'header', 'footer', 'address', 'p', 'hr'
        , 'blockquote', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'dd', 'dt', 'dl', 'figcaption'];

import Technique from './Technique.object';

const technique: CSSTechnique = {
  name: 'Using percentage values in CSS for container sizes',
  code: 'QW-CSS-T5',
  mapping: 'C24',
  description: 'The objective of this technique is to enable users to increase the size of text without having to scroll horizontally to read that text. To use this technique, an author specifies the width of text containers using percent values.',
  metadata: {
    target: {
      element: '*',
      attributes: 'width'
    },
    'success-criteria': [
      {
        name: '1.4.8',
        level: 'AAA',
        principle: 'Perceivable',
        url: 'https://www.w3.org/WAI/WCAG21/Techniques/css/C24'
      }
    ],
    related: ['C20'],
    url: {
      'C20': 'https://www.w3.org/WAI/WCAG21/Techniques/css/C20'
    },
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<CSSTechniqueResult>()
};

class QW_CSS_T5 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(styleSheets: CSSStylesheet[]): Promise<void> {
    for (const styleSheet of styleSheets || []) {
      if(styleSheet.content && styleSheet.content.plain){
        this.analyseAST(styleSheet.content.parsed, styleSheet.file);
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
      this.loopDeclarations(cssObject, fileName)
    } else {
      if (cssObject['type'] === 'stylesheet') {
        for (const key of cssObject['stylesheet']['rules']) {
          this.analyseAST(key, fileName);
        }
      } else {
        for (const key of cssObject['rules']) {
          this.analyseAST(key, fileName);
        }
      }
    }
  }

  private loopDeclarations(cssObject: any, fileName: string): void {
    let declarations = cssObject['declarations'];
    if(declarations){
      for (const declaration of declarations) {
        if (declaration['property'] && declaration['value'] ) {
          if (declaration['property'] === 'width'){
            this.extractInfo(cssObject, declaration, fileName);
          }
        }
      }
    }
  }

  private extractInfo(cssObject: any, declaration: any, fileName: string): void {
    if(sectionAndGrouping.includes(cssObject['selectors'][0])){
      if(declaration['value'].endsWith('%')){
        super.fillEvaluation('warning', `Element 'width' style attribute uses '%'`,
        css.stringify({ type: 'stylesheet', stylesheet:{rules: [cssObject]}}),
        fileName, cssObject['selectors'].toString(), cssObject['position'],
        declaration['property'], declaration['value'], declaration['position'])
      }else {
        super.fillEvaluation('failed', `Element 'width' style attribute doesn't use '%'`)
      }
    } 
  }
}

export = QW_CSS_T5;
