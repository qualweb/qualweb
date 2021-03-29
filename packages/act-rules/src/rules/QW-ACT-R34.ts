import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R34 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const ariaJSON = window.AccessibilityUtils.ariaAttributesRoles;
    const rolesJSON = window.AccessibilityUtils.roles;
    // get all aria attributes from json to combine it in a css selector
    let ariaSelector = '';
    for (const ariaAttrib of Object.keys(ariaJSON) || []) {
      ariaSelector = ariaSelector.concat('[', ariaAttrib, '], ');
    }
    ariaSelector = ariaSelector.substring(0, ariaSelector.length - 2);

    // get all elements that are using aria attributes
    const elementsWithAriaAttribs = element.getElements(ariaSelector);

    for (const elem of elementsWithAriaAttribs || []) {
      const isInAT = window.AccessibilityUtils.isElementInAT(elem);
      let elemAttribs = elem.getElementAttributesName();
      elemAttribs = elemAttribs.filter((elem) => elem.startsWith('ar'));

      for (const attrib of elemAttribs ?? []) {
        const test = new Test();

        if (attrib in ariaJSON) {
          //if is in the accessibility tree
          //@ts-ignore
          const values = ariaJSON[attrib]['values'];
          const attrValue = elem.getElementAttribute(attrib);
          //@ts-ignore
          const typeValue = ariaJSON[attrib]['typeValue'];

          let result = false;
          if (attrValue && isInAT) {
            if (typeValue === 'value') {
              result = values.includes(attrValue);
            } else if (typeValue === 'string') {
              result = values === '';
            } else if (typeValue === 'number') {
              result = !isNaN(Number(attrValue));
            } else if (typeValue === 'integer') {
              const regex = new RegExp('^[0-9]+$');
              result = regex.test(attrValue);
            } else if (typeValue === 'list') {
              const list = attrValue.split(' ');
              let passed = true;
              for (const value of list || []) {
                if (passed) {
                  result = values.includes(value);
                  passed = false;
                }
              }
            } else {
              const role = window.AccessibilityUtils.getElementRole(elem);

              let requiredAriaList;
              //@ts-ignore
              if (role !== null && !!rolesJSON[role]) {
                //@ts-ignore
                requiredAriaList = rolesJSON[role]['requiredAria'];
              }
              if (typeValue === 'id') {
                const isRequired = requiredAriaList && requiredAriaList.includes(attrib);
                if (isRequired) result = window.qwPage.getElement('#' + attrValue) !== null;
                else result = !attrValue.includes(' ');
              } else {
                //if (typeValue === 'idList')
                const list = attrValue.split(' ');
                const isRequired = requiredAriaList && requiredAriaList.includes(attrib);
                if (isRequired) {
                  for (const id of list || []) {
                    if (!result) {
                      result = window.qwPage.getElement('#' + id) !== null;
                    }
                  }
                } else {
                  result = true;
                }
              }
            }

            if (result) {
              test.verdict = 'passed';
              test.description = 'The test target `' + attrib + '` attribute has a valid value.';
              test.resultCode = 'RC3';
            } else {
              test.verdict = 'failed';
              test.description = 'The test target `' + attrib + '` attribute has an invalid value.';
              test.resultCode = 'RC4';
            }

            test.addElement(elem);
            super.addTestResult(test);
          }
        }
      }
    }
  }
}

export = QW_ACT_R34;
