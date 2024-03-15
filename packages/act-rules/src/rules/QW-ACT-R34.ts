import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, Test } from '@qualweb/lib';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R34 extends AtomicRule {

  @ElementExists
  execute(element: QWElement): void {
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
        if (attrib in ariaJSON) {
          //if is in the accessibility tree
          const values = ariaJSON[attrib]['values'];
          const attrValue = elem.getElementAttribute(attrib);
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
                  passed = result;
                }
                //console.log('values:', values, 'value:', value, 'result:', result);
              }
            } else {
              const role = window.AccessibilityUtils.getElementRole(elem);

              let requiredAriaList;
              if (role !== null && !!rolesJSON[role]) {
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

            const test = new Test();
            if (result) {
              test.verdict = 'passed';
              test.resultCode = 'P1';
            } else {
              test.verdict = 'failed';
              test.resultCode = 'F1';
            }

            test.description = this.translate(test.resultCode, { attr: attrib });

            test.addElement(elem);
            this.addTestResult(test);
          }
        }
      }
    }
  }
}

export { QW_ACT_R34 };
