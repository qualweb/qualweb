import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getAccessibleNameRecursion from './getAccessibleNameRecursion';

function getAccessibleName(elementQW: QWElement, pageQW: QWPage): string | undefined {
  return getAccessibleNameRecursion(elementQW, pageQW, false, false);
}
export default getAccessibleName;
