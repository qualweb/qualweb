import { notDefaultAT, needsToBeInsideDetails, notExposedIfEmpty } from './constants';
import isElementChildPresentational from './isElementChildPresentational';
import getElementRole from './getElementRole';
import elementHasValidRole from './elementHasValidRole';
import isElementFocusable from './isElementFocusable';
import elementHasGlobalARIAPropertyOrAttribute from './elementHasGlobalARIAPropertyOrAttribute';
import isElementHidden from '../domUtils/isElementHidden';
import elementIdIsReferenced from '../domUtils/elementIdIsReferenced';

function isElementInAT(element: typeof window.qwElement): boolean {
  const childPresentational = isElementChildPresentational(element);
  const isHidden = isElementHidden(element);
  let result = false;
  const role = getElementRole(element);
  const validRole = elementHasValidRole(element);

  if (!isHidden && !childPresentational && role !== 'presentation' && role !== 'none') {
    const name = element.getElementTagName();
    const notExposedIfEmpyTag = notExposedIfEmpty.includes(name);
    const needsToBeInsideDetailsTag = needsToBeInsideDetails.includes(name);

    if (notDefaultAT.includes(name) || notExposedIfEmpyTag || needsToBeInsideDetailsTag) {
      let specialCondition = false;
      if (notExposedIfEmpyTag) {
        const text = element.getElementText();
        specialCondition = !!text && text.trim() !== '';
      } else if (needsToBeInsideDetailsTag) {
        const parent = element.getElementParent();
        specialCondition = !!parent && parent.getElementTagName() === 'details';
      } else if (name === 'picture') {
        const child = element.getElement('img');
        specialCondition = !!child;
      }
      const type = element.getElementType();
      const focusable = isElementFocusable(element);
      const id = element.getElementAttribute('id');
      let ariaActivedescendant = false;
      let ariaControls = false;
      let ariaDescribedby = false;
      let ariaDetails = false;
      let ariaErrormessage = false;
      let ariaFlowto = false;
      let ariaLabelledby = false;
      let ariaOwns = false;
      if (id !== null) {
        ariaActivedescendant = elementIdIsReferenced(element, id, 'aria-activedescendant');
        ariaControls = elementIdIsReferenced(element, id, ' aria-controls');
        ariaDescribedby = elementIdIsReferenced(element, id, ' aria-describedby');
        ariaDetails = elementIdIsReferenced(element, id, ' aria-details');
        ariaErrormessage = elementIdIsReferenced(element, id, 'aria-errormessage');
        ariaFlowto = elementIdIsReferenced(element, id, 'aria-flowto');
        ariaLabelledby = elementIdIsReferenced(element, id, 'aria-labelledby');
        ariaOwns = elementIdIsReferenced(element, id, 'aria-owns');
      }
      const globalWaiARIA = elementHasGlobalARIAPropertyOrAttribute(element);

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
