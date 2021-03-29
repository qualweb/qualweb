import getAccessibleNameRecursion from './getAccessibleNameRecursion';

function getAccessibleName(element: typeof window.qwElement): string | undefined {
  return getAccessibleNameRecursion(element, false, false);
}
export default getAccessibleName;
