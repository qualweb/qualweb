import getAccessibleName from './getAccessibleName';
import getElementRoleAName from './getElementRoleAName';

function getElementRole(element: typeof window.qwElement): string | null {
  const aName = getAccessibleName(element);
  return getElementRoleAName(element, aName);
}

export default getElementRole;
