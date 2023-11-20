import { childPresentationalRole } from '../accessibilityUtils/constants';

function isElementChildPresentationalAux(element: typeof window.qwElement): boolean {
  const role = window.AccessibilityUtils.getElementRole(element);

  let childPresentational = false;
  if (role !== null) {
    childPresentational = childPresentationalRole.includes(role);
  }

  const parent = element.getElementParent();
  let isParentChildPresentationalVar = false;

  if (parent && !childPresentational) {
    isParentChildPresentationalVar = isElementChildPresentationalAux(parent);
  }

  return childPresentational || isParentChildPresentationalVar;
}
export default isElementChildPresentationalAux;
