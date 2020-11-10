import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";
import {QWPage} from "@qualweb/qw-page";
import LanguageDetect from "languagedetect";

@ACTRuleDecorator
class QW_ACT_R30 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const isWidget = AccessibilityUtils.isElementWidget(element, page);
    if(!isWidget) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target is not a \`widget\`.`;
      evaluation.resultCode = 'RC1';
    } else {
      const supportsNameFromContent = AccessibilityUtils.allowsNameFromContent(element);
      if(!supportsNameFromContent){
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target is not a \`widget\` that supports name from content.`;
        evaluation.resultCode = 'RC2';
      } else {
        const accessibleName = AccessibilityUtils.getAccessibleName(element, page);
        const elementText = DomUtils.getTrimmedText(element,page);
        let hasTextNode = element.elementHasTextNode();
        let isIconValue = this.isIcon(elementText,accessibleName,element);

        if(accessibleName === undefined) {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target doesn't have an accessible name.`;
          evaluation.resultCode = 'RC6';
        } else if(!hasTextNode || elementText === undefined || elementText === '' || elementText && !this.isHumanLanguage(elementText)&&!isIconValue) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target has no visible text content or contains non-text content.`;
          evaluation.resultCode = 'RC3';
        } else if(!!elementText &&(isIconValue ||accessibleName.toLowerCase().trim().includes(elementText.toLowerCase()))) {
          evaluation.verdict = 'passed';
          evaluation.description = `The complete visible text content of the test target either matches or is contained within its accessible name.`;
          evaluation.resultCode = 'RC4';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The complete visible text content of the test target neither matches or is contained within its accessible name.`;
          evaluation.resultCode = 'RC5';
        }
      }
    }
    console.log( evaluation.resultCode)

    super.addEvaluationResult(evaluation, element,true,false,true,page);

  }
   //      let isIconValue = this.isIcon(elementText,accessibleName,element);
   isIcon(elementText:string,accessibleName:string|undefined,element:QWElement): boolean {
    const iconMap=['i','x'];
    let fontStyle =element.getElementStyleProperty('font-family',null);
    return !!accessibleName && (iconMap.includes(elementText.toLowerCase()) || fontStyle.includes("Material Icons"));
  }

  isHumanLanguage(string: string): boolean {
    const detector = new LanguageDetect();
    return detector.detect(string).length > 0;
  }
}


export = QW_ACT_R30;
