import { childPresentationalRole } from '../accessibilityUtils/constants';
import getElementRole from './getElementRole';

function isElementChildPresentationalAux(element: typeof window.qwElement): boolean {
  let result;
  const role = getElementRole(element);
  let childPresentational;
  if (role !== null) childPresentational = childPresentationalRole.includes(role);
  const parent = element.getElementParent();
  let isParentChildPresentationalVar = false;

  if (parent && !childPresentational) {
    isParentChildPresentationalVar = isElementChildPresentationalAux(parent);
  }
  result = childPresentational || isParentChildPresentationalVar;

  return result;
}
export default isElementChildPresentationalAux;
