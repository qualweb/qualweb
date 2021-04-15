import { notDefaultAT, needsToBeInsideDetails, notExposedIfEmpty } from './constants';

function isElementInAT(element: typeof window.qwElement): boolean {
  const childPresentational = window.AccessibilityUtils.isElementChildPresentational(element);
  const isHidden = window.DomUtils.isElementHidden(element);
  let result = false;
  const role = window.AccessibilityUtils.getElementRole(element);
  const validRole = window.AccessibilityUtils.elementHasValidRole(element);

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
      const focusable = window.AccessibilityUtils.isElementFocusable(element);
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
        ariaActivedescendant = window.DomUtils.elementIdIsReferenced(element, id, 'aria-activedescendant');
        ariaControls = window.DomUtils.elementIdIsReferenced(element, id, ' aria-controls');
        ariaDescribedby = window.DomUtils.elementIdIsReferenced(element, id, ' aria-describedby');
        ariaDetails = window.DomUtils.elementIdIsReferenced(element, id, ' aria-details');
        ariaErrormessage = window.DomUtils.elementIdIsReferenced(element, id, 'aria-errormessage');
        ariaFlowto = window.DomUtils.elementIdIsReferenced(element, id, 'aria-flowto');
        ariaLabelledby = window.DomUtils.elementIdIsReferenced(element, id, 'aria-labelledby');
        ariaOwns = window.DomUtils.elementIdIsReferenced(element, id, 'aria-owns');
      }
      const globalWaiARIA = window.AccessibilityUtils.elementHasGlobalARIAPropertyOrAttribute(element);

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
