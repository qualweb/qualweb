import { expect } from 'chai';

import {  CUIChecksRunner } from '../src';
import { QWCUI_Selectors } from '../src/lib/selectors';
import { mapping } from '../src/lib/mapping';
import { RuleTest } from '../src/lib/types';

describe('Mapping from selectors in core', () => {
  it('Running mapping ', async function () {
    

    const cuiSelectors = {
        QW_CC_WINDOW: 'div.rw-conversation-container',
        QW_CC_DIALOG: 'div.rw-messages-container',
        QW_CC_MESSAGES: 'div.rw-from-response',
        QW_CC_MIC: 'null',
        QW_CC_INPUT: 'textarea.rw-new-message',
        QW_QUESTIONS: 'div.rw-question-container',
        QW_CURRENCY: 'div.rw-currency-container',
        QW_DATE: 'div.rw-date-container',
        QW_UNIT: 'div.rw-unit-container',
      }
     const rules:RuleTest[] = [
       {
         code: "QW_TEST1",
         selector: "div.rw-test-container",
         result: "Test result"
       },
       {
         code: "QW_TEST2",
         selector: "div.rw-test-container",
         result: "Test result"
       },
       
     ]

    const cuiCheckInstance = new CUIChecksRunner({selectors:cuiSelectors}, {},"",rules);
    let mappingGenerated = (cuiCheckInstance as any).tester.mapping || {};
     console.log(mappingGenerated);
    Object.entries(mapping).forEach(([key, _]) => {
      if(key in cuiSelectors){
      expect(mappingGenerated[cuiSelectors.QW_CC_WINDOW + ' ' + cuiSelectors[key as keyof QWCUI_Selectors] ]).to.exist;
      }else{
        expect(mappingGenerated[cuiSelectors.QW_CC_WINDOW + ' ' + key ]).to.exist;
      }
  });
    
});
});