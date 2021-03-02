'use strict';
import { noAccessibleObjectOrChild, noAccessibleObject, elementsLikeHtml, textContainer } from './constants';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';

function getAccessibleNameSVGRecursion(element: QWElement, page: QWPage, recursion: boolean): string | undefined {
  let AName, ariaLabelBy, tag;

  tag = element.getElementTagName();
  if (!tag) tag = '';
  const regex = new RegExp('^fe[a-zA-Z]+');
  ariaLabelBy = element.getElementAttribute('aria-labelledby');
  if (ariaLabelBy !== null && page.getElementByID(ariaLabelBy) === null) {
    ariaLabelBy = '';
  }
  const ariaLabel = element.getElementAttribute('aria-label');
  const referencedByAriaLabel = AccessibilityUtils.isElementReferencedByAriaLabel(element, page);
  const title = element.getElementChildTextContent('title');
  const titleAtt = element.getElementAttribute('xlink:title'); //tem de ser a
  const href = element.getElementAttribute('href');
  const roleLink = tag === 'a' && href !== undefined;

  //console.log((DomUtil.isElementHidden(element) && !recursion) +"/"+ hasParentOfName(element,noAccessibleObjectOrChild) +"/"+ (noAccessibleObject.indexOf(tag) >= 0) +"/"+ (noAccessibleObjectOrChild.indexOf(tag) >= 0) +"/"+ regex.test(tag))
  if (
    (DomUtils.isElementHidden(element, page) ||
      hasParentOfName(element, noAccessibleObjectOrChild) ||
      noAccessibleObject.indexOf(tag) >= 0 ||
      noAccessibleObjectOrChild.indexOf(tag) >= 0 ||
      regex.test(tag)) &&
    !recursion
  ) {
    //noAName
  } else if (ariaLabelBy && ariaLabelBy !== '' && !(referencedByAriaLabel && recursion)) {
    AName = getAccessibleNameFromAriaLabelledBy(page, element, ariaLabelBy);
  } else if (elementsLikeHtml.indexOf(tag) >= 0) {
    AName = AccessibilityUtils.getAccessibleName(element, page);
  } else if (ariaLabel && ariaLabel.trim() !== '') {
    AName = ariaLabel;
  } else if (title && title.trim() !== '') {
    AName = title;
  } else if (titleAtt && titleAtt.trim() !== '' && roleLink) {
    //check if link
    AName = titleAtt;
  } else if (roleLink) {
    AName = getTextFromCss(element, page);
  } else if (tag && tag === 'text') {
    AName = DomUtils.getTrimmedText(element, page);
  }
  return AName;
}

function hasParentOfName(element: QWElement, name: string[]) {
  const parent = element.getElementParent();
  if (parent) {
    const parentName = parent.getElementTagName();
    return (parentName && name.indexOf(parentName) >= 0) || hasParentOfName(parent, name);
  } else {
    return false;
  }
}

function getAccessibleNameFromAriaLabelledBy(
  page: QWPage,
  element: QWElement,
  ariaLabelId: string
): string | undefined {
  const ListIdRefs = ariaLabelId.split(' ');
  let result: string | undefined;
  let accessNameFromId: string | undefined;
  let elem;
  const elementID = element.getElementAttribute('id');

  for (const id of ListIdRefs) {
    if (id !== '' && elementID !== id) elem = page.getElementByID(id);
    if (elem) accessNameFromId = getAccessibleNameSVGRecursion(elem, page, true);
    if (accessNameFromId) {
      if (result) {
        result += accessNameFromId;
      } else {
        result = accessNameFromId;
      }
    }
  }

  return result;
}

function getAccessibleNameFromChildren(element: QWElement, page: QWPage): string[] {
  let aName;
  const children = element.getElementChildren();
  const elementAnames: string[] = [];
  if (children) {
    for (const child of children) {
      const name = child.getElementTagName();
      if (textContainer.indexOf(name) >= 0) {
        aName = getAccessibleNameSVGRecursion(child, page, true);
        if (aName) {
          elementAnames.push(aName);
        } else {
          elementAnames.push('');
        }
      }
    }
  }
  return elementAnames;
}

function getTextFromCss(element: QWElement, page: QWPage): string {
  let before = element.getElementStyleProperty('content', ':before');
  let after = element.getElementStyleProperty('content', ':after');
  const aNameList = getAccessibleNameFromChildren(element, page);
  const textValue = getConcatentedText(element, aNameList);

  if (after === 'none') after = '';
  if (before === 'none') before = '';

  return before.replace(/["']/g, '') + textValue + after.replace(/["']/g, '');
}

function getConcatentedText(elementQW: QWElement, aNames: string[]): string {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  let result = '';
  for (const aName of aNames) {
    result += aName;
  }
  return result;
}

export default getAccessibleNameSVGRecursion;
