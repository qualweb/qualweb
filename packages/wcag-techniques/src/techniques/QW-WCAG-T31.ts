import Technique from "../lib/Technique.object";
import { WCAGTechniqueResult } from "@qualweb/wcag-techniques";
import { WCAGTechnique, ElementExists } from "../lib/decorators";
import { QWElement } from "@qualweb/qw-element";

@WCAGTechnique
class QW_WCAG_T31 extends Technique {
  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement): void {
    if (
      element.getElementTagName() === "head" ||
      element.getElementParent()?.getElementTagName() === "head" ||
      !element.hasTextNode()
    ) {
      return;
    }

    const evaluation: WCAGTechniqueResult = {
      verdict: "",
      description: "",
      resultCode: "",
    };

    let foundColorProperty = false;
    let foundBackgroundProperty = false;

    let parent: QWElement | null = element;
    while (parent !== null) {
      const hasColor = parent.hasCSSProperty("color");
      const hasBackgroundColor = parent.hasCSSProperty("background-color");
      const hasBackgroundImage = parent.hasCSSProperty("background-image");
      const hasBackground = parent.hasCSSProperty("background");

      if (hasColor && !foundColorProperty) {
        foundColorProperty = true;
      }

      if (
        (hasBackground || hasBackgroundColor || hasBackgroundImage) &&
        !foundBackgroundProperty
      ) {
        foundBackgroundProperty = true;
      }

      if (foundColorProperty && foundBackgroundProperty) {
        parent = null;
      } else {
        parent = parent.getElementParent();
      }
    }

    if (foundColorProperty && foundBackgroundProperty) {
      evaluation.verdict = "passed";
      evaluation.description = `The test target has a author defined color and background css properties.`;
      evaluation.resultCode = "RC1";

      evaluation.elements = [
        {
          pointer: element.getElementSelector(),
          htmlCode: element.getElementHtmlCode(true, false),
        },
      ];

      super.addEvaluationResult(evaluation);
    } else if (foundColorProperty) {
      evaluation.verdict = "failed";
      evaluation.description = `The test target has a author defined color css property but not a background css property.`;
      evaluation.resultCode = "RC2";

      evaluation.elements = [
        {
          pointer: element.getElementSelector(),
          htmlCode: element.getElementHtmlCode(true, false),
        },
      ];

      super.addEvaluationResult(evaluation);
    } else if (foundBackgroundProperty) {
      evaluation.verdict = "failed";
      evaluation.description = `The test target has a author defined background property but not a color css property.`;
      evaluation.resultCode = "RC3";

      evaluation.elements = [
        {
          pointer: element.getElementSelector(),
          htmlCode: element.getElementHtmlCode(true, false),
        },
      ];

      super.addEvaluationResult(evaluation);
    }
  }

  /*execute(styleSheets: CSSStylesheet[], page: QWPage): void {
    const styleElements = page.getElements('style');
    for (const element of styleElements || []) {
      const sheet = <any> element.getElementProperty('sheet');
      for (const rule of sheet.cssRules || []) {
        const style = rule.style.cssText;
        this.checkCssProperty(style, element);
      }
    }

    const elements = page.getElements(['style']);
  }

  private checkCssProperty(style: string, element: QWElement): void {
    
    const evaluation: CSSTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const properties = style.split(';').filter(p => p.trim() !== '') || [style];
      
    for (const property of properties) {
      if (property.includes('font-size')) {
        const fontSize = property.split(':')[1];
        const hasImportant = fontSize.includes('!important');
        
        if (hasImportant) {
          const hasAbsoluteUnit = fontSize.includes('cm') || fontSize.includes('mm') || fontSize.includes('in') || fontSize.includes('px') || fontSize.includes('pt') || fontSize.includes('pt');
          
          if (!hasAbsoluteUnit) {
            evaluation.verdict = 'passed';
            evaluation.description = 'This test target has a font-size css property using an relative unit value with the important flag.';
            evaluation.resultCode = 'RC1';
          } else {
            evaluation.verdict = 'failed';
            evaluation.description = 'This test target has a font-size css property using an absolute unit value with the important flag.';
            evaluation.resultCode = 'RC2';
          }

          evaluation.pointer = element.getElementSelector();
          evaluation.htmlCode = element.getElementHtmlCode(true, true);
          evaluation.attributes = property;

          super.addEvaluationResult(evaluation);
        }
      }
    }
  }

  execute(styleSheets: CSSStylesheet[], mappedDOM: any): void {
    if(mappedDOM){
      let backgroundChecked = {};

      let keys = Object.keys(mappedDOM)

      for(let key of keys || []){
        if(mappedDOM[key])
          if(this.getStyle(mappedDOM[key], "color") || this.getStyle(mappedDOM[key], "text")){
            let parent = this.getParent(mappedDOM, key);
            let hasBGColor = false;
            while(parent && !hasBGColor){
              if(this.getStyle(parent, "background-color") || this.getStyle(parent, "bgcolor")){
                super.fillEvaluation('RC1','passed', `Element has color and background-color set`);
                hasBGColor = true;
                backgroundChecked[parent['startIndex']] = true;
              }
              parent = this.getParent(mappedDOM, parent['startIndex']);
            }
            if(!hasBGColor)
              if(mappedDOM[key]['attribs']['css'])
                super.fillEvaluation('RC2','failed', `Element has color set but not background-color`,
                                      mappedDOM[key]['attribs']['css']?mappedDOM[key]['attribs']['css']: undefined,
                                      undefined,
                                      mappedDOM[key]['name'],
                                      undefined,
                                      mappedDOM[key]['attribs']['css']["color"]?mappedDOM[key]['attribs']['css']["color"]:mappedDOM[key]['attribs']['css']["text"],
                                      mappedDOM[key]['attribs']['css']["color"]?mappedDOM[key]['attribs']['css']["color"]['value']:mappedDOM[key]['attribs']['css']["text"]['value'],
                                      undefined);
              else
                super.fillEvaluation('RC3','failed', `Element has color set but not background-color`,
                        undefined,
                        undefined,
                        mappedDOM[key]['name'],
                        undefined,
                        undefined,
                        undefined,
                        undefined);
          } else if(this.getStyle(mappedDOM[key], "background-color") || this.getStyle(mappedDOM[key], "bgcolor")){
              if(!backgroundChecked.hasOwnProperty(key)){
                backgroundChecked[key] = false;
              }
          }
      }

      keys = Object.keys(backgroundChecked);

      for(let key of keys || []){
        if(!backgroundChecked[key]){
          if(mappedDOM[key]['attribs']['css'])
          super.fillEvaluation('RC4','failed', `Element has background-color set but not color`,
                              mappedDOM[key]['attribs']['css'],
                              undefined,
                              mappedDOM[key]['name'],
                              undefined,
                              mappedDOM[key]['attribs']['css']["background-color"]?mappedDOM[key]['attribs']['css']["background-color"]:mappedDOM[key]['attribs']['css']["bgcolor"],
                              mappedDOM[key]['attribs']['css']["background-color"]?mappedDOM[key]['attribs']['css']["background-color"]['value']:mappedDOM[key]['attribs']['css']["bgcolor"]['value'],
                              undefined);
              else
                super.fillEvaluation('RC5','failed', `Element has color set but not background-color`,
                                      undefined,
                                      undefined,
                                      mappedDOM[key]['name'],
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined);
        }
      }
    }
  }

  private getStyle(element: Object, property: string): string | undefined{

    if(element['attribs']['css'] && element['attribs']['css'][property])
      return element['attribs']['css'][property]['value'];
    else
      return undefined;
  }

  private getParent(mappedDOM:any, myID: string): Object | undefined{
    if(mappedDOM[myID]['parent']){
      let parentID = mappedDOM[myID]['parent']['startIndex'];
      if(mappedDOM.hasOwnProperty(parentID))
        return mappedDOM[parentID];
    }
    return undefined;
  }*/
}

export = QW_WCAG_T31;
