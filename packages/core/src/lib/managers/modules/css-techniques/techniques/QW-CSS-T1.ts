'use strict';

import { CSSTechnique, CSSTechniqueResult } from '@qualweb/css-techniques';
import { CSSStylesheet } from '@qualweb/get-dom-puppeteer';
import css from 'css';

import Technique from './Technique.object';

const technique: CSSTechnique = {
  name: 'Using "percent, em, names" for font sizes',
  code: 'QW-CSS-T1',
  mapping: 'C121314',
  description: 'This technique checks that all font-size attribute uses percent, em or names',
  metadata: {
    target: {
      element: '*',
      attributes: 'font-size'
    },
    'success-criteria': [{
      name: '1.4.4',
      level: 'AA',
      principle: 'Perceivable',
      url: 'https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-scale.html'
    },
      {
        name: '1.4.5',
        level: 'AA',
        principle: 'Perceivable',
        url: 'https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-text-presentation.html'
      },
      {
        name: '1.4.8',
        level: 'AAA',
        principle: 'Perceivable',
        url: 'https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-visual-presentation.html'
      },
      {
        name: '1.4.9	',
        level: 'AAA',
        principle: 'Perceivable',
        url: 'https://www.w3.org/WAI/GL/UNDERSTANDING-WCAG20/visual-audio-contrast-text-images.html'
      }
    ],
    related: ['C12', 'C13', 'C14'],
    url: {
      'C12': 'https://www.w3.org/TR/WCAG20-TECHS/C12.html',
      'C13': 'https://www.w3.org/TR/WCAG20-TECHS/C13.html',
      'C14': 'https://www.w3.org/TR/WCAG20-TECHS/C14.html'
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

class QW_CSS_T1 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(styleSheets: CSSStylesheet[]): Promise<void> {
    for (const styleSheet of styleSheets || []) {
      if(styleSheet.content && styleSheet.content.plain){
        if (styleSheet.content.plain.includes('font-size')){
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
          if (declaration['property'] === 'font-size'){
            this.extractInfo(cssObject, declaration, fileName);
          }
        }
      }
    }
  }

  private extractInfo(cssObject: any, declaration: any, fileName: string): void {
    const names = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', 'xsmaller', 'larger'];

    if(declaration['value'].includes('px')){
      super.fillEvaluation('warning', `Element 'font-size' style attribute uses 'px'`,
        css.stringify({ type: 'stylesheet', stylesheet:{rules: [cssObject]}}),
        fileName, cssObject['selectors'].toString(), cssObject['position'],
        declaration['property'], declaration['value'], declaration['position'])

    } else if(declaration['value'].endsWith('em') || declaration['value'].endsWith('%') || names.includes(declaration['value'].trim())){
      super.fillEvaluation('passed', `Element 'font-size' style attribute doesn't use 'px'`,
        css.stringify({ type: 'stylesheet', stylesheet:{rules: [cssObject]}}),
        fileName, cssObject['selectors'].toString(), cssObject['position'],
        declaration['property'], declaration['value'], declaration['position']);
    } else {
      super.fillEvaluation('inapplicable', `Element has 'font-size' style with unknown metric`)
    }
  }
}

export = QW_CSS_T1;