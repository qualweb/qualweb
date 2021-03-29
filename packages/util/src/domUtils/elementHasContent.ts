import { alwaysNotVisible, needsControls, alwaysVisible, needsOpen } from './constants';
import textHasTheSameColorOfBackground from './textHasTheSameColorOfBackground';

function elementHasContent(element: typeof window.qwElement, checkChildren: boolean): boolean {
  let result = false;
  const name = element.getElementTagName();
  if (alwaysNotVisible.includes(name)) {
    //Do nothing (dont delete)
  } else if (needsControls.includes(name)) {
    const controls = element.getElementProperty('controls');
    result = !!controls;
  } else if (needsOpen.includes(name)) {
    const open = element.getElementProperty('open');
    result = !!open;
  } else if (alwaysVisible.includes(name)) {
    result = true;
  } else {
    const textHasTheSameColor = textHasTheSameColorOfBackground(element);
    let text = element.getElementText();
    if (text) {
      text = text.trim();
      result = text !== '' && !textHasTheSameColor;
    }
  }
  const childrenVisible = false;
  if (checkChildren) {
    const children = element.getElementChildren();
    for (const child of children) {
      checkChildren = childrenVisible || elementHasContent(child, checkChildren);
    }
  }
  return result || checkChildren;
}
/*function isElementGroupingOrSection(elementQW:QWElement):boolean{
  let tagName =  elementQW.getElementTagName();
  let isGroupingOrSection = sectionAndGrouping.includes(tagName);
  let children= elementQW.getElementChildren();
  let counter = 0;
  while(isGroupingOrSection && counter < children.length){
    isGroupingOrSection = isElementGroupingOrSection(children[counter])
    counter++;
  }
  return isGroupingOrSection;
}*/

export default elementHasContent;
