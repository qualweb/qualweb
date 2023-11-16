import getAccessibleNameSVGRecursion from './getAccessibleNameSVGRecursion';

function getAccessibleNameSVG(element: typeof window.qwElement): string | undefined {
  return getAccessibleNameSVGRecursion(element, false);
}

export default getAccessibleNameSVG;
