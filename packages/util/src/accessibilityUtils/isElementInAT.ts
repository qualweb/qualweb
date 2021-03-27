import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

import { notDefaultAT, needsToBeInsideDetails, notExposedIfEmpy } from './constants';
import isElementChildPresentational from './isElementChildPresentational';
import getElementRole from './getElementRole';
import elementHasValidRole from './elementHasValidRole';
import isElementFocusable from './isElementFocusable';
import elementHasGlobalARIAPropertyOrAttribute from './elementHasGlobalARIAPropertyOrAttribute';
import isElementHidden from '../domUtils/isElementHidden';
import elementIDIsReferenced from '../domUtils/elementIDIsReferenced';

function isElementInAT(elementQW: QWElement, pageQW: QWPage): boolean {
  const childPresentational = isElementChildPresentational(elementQW, pageQW);
  const isHidden = isElementHidden(elementQW, pageQW);
  let result = false;
  const role = getElementRole(elementQW, pageQW);
  const validRole = elementHasValidRole(elementQW, pageQW);

  if (!isHidden && !childPresentational && role !== 'presentation' && role !== 'none') {
    const name = elementQW.getElementTagName();
    const notExposedIfEmpyTag = notExposedIfEmpy.includes(name);
    const needsToBeInsideDetailsTag = needsToBeInsideDetails.includes(name);

    if (notDefaultAT.includes(name) || notExposedIfEmpyTag || needsToBeInsideDetailsTag) {
      let specialCondition = false;
      if (notExposedIfEmpyTag) {
        const text = elementQW.getElementText();
        specialCondition = !!text && text.trim() !== '';
      } else if (needsToBeInsideDetailsTag) {
        const parent = elementQW.getElementParent();
        specialCondition = !!parent && parent.getElementTagName() === 'details';
      } else if (name === 'picture') {
        const child = elementQW.getElement('img');
        specialCondition = !!child;
      }
      const type = elementQW.getElementType();
      const focusable = isElementFocusable(elementQW, pageQW);
      const id = elementQW.getElementAttribute('id');
      let ariaActivedescendant = false;
      let ariaControls = false;
      let ariaDescribedby = false;
      let ariaDetails = false;
      let ariaErrormessage = false;
      let ariaFlowto = false;
      let ariaLabelledby = false;
      let ariaOwns = false;
      if (id !== null) {
        ariaActivedescendant = elementIDIsReferenced(elementQW, pageQW, id, 'aria-activedescendant');
        ariaControls = elementIDIsReferenced(elementQW, pageQW, id, ' aria-controls');
        ariaDescribedby = elementIDIsReferenced(elementQW, pageQW, id, ' aria-describedby');
        ariaDetails = elementIDIsReferenced(elementQW, pageQW, id, ' aria-details');
        ariaErrormessage = elementIDIsReferenced(elementQW, pageQW, id, 'aria-errormessage');
        ariaFlowto = elementIDIsReferenced(elementQW, pageQW, id, 'aria-flowto');
        ariaLabelledby = elementIDIsReferenced(elementQW, pageQW, id, 'aria-labelledby');
        ariaOwns = elementIDIsReferenced(elementQW, pageQW, id, 'aria-owns');
      }
      const globalWaiARIA = elementHasGlobalARIAPropertyOrAttribute(elementQW);

      result =
        specialCondition ||
        type === 'text' ||
        focusable ||
        ariaActivedescendant ||
        ariaControls ||
        ariaDescribedby ||
        ariaDetails ||
        ariaErrormessage ||
        ariaFlowto ||
        ariaLabelledby ||
        ariaOwns ||
        validRole ||
        globalWaiARIA;
    } else {
      //defaultInAT
      result = true;
    }
  }
  return result;
}

export default isElementInAT;
