import { childPresentationalRole } from '../accessibilityUtils/constants';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getElementRole from './getElementRole';

function isElementChildPresentationalAux(element: QWElement, page: QWPage): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }

  let result;
  const role = getElementRole(element, page);
  let childPresentational;
  if (role !== null) childPresentational = childPresentationalRole.includes(role);
  const parent = element.getElementParent();
  let isParentChildPresentationalVar = false;

  if (parent && !childPresentational) {
    isParentChildPresentationalVar = isElementChildPresentationalAux(parent, page);
  }
  result = childPresentational || isParentChildPresentationalVar;

  return result;
}
export default isElementChildPresentationalAux;
