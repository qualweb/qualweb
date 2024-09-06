import type { QWElement } from '@qualweb/qw-element';
function elementHasOnePixel(element: QWElement): boolean {
  const height = element.getElementStyleProperty('height', '');
  const background = element.getElementStyleProperty('background-color', '');
  const parent = element.getElementParent();
  let parentBackGround: string | undefined;
  if (parent) {
    parentBackGround = element.getElementStyleProperty('background-color', '');
  }
  return (
    !!height && height.replace(' ', '') === '1px' && (parentBackGround === background || background === 'transparent')
  );
}

export default elementHasOnePixel;
