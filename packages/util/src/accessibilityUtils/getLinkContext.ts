'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getElementRole from './getElementRole';
import isElementPresentation from '../domUtils/isElementPresentation';
import isElementHidden from '../domUtils/isElementHidden';
//incomplete
//ignores being a header cell assigned to the closest ancestor of the link in the flat tree that has a semantic role of cell or gridcell;
function getLinkContext(element: QWElement, page: QWPage): string[] {
  let context: string [] = [];
  let parent = element.getElementParent();
  let ariaDescribedByATT = element.getElementAttribute("aria-describedby");
  let ariaDescribedBy: string[] = [];
  if(ariaDescribedByATT)
    ariaDescribedBy = ariaDescribedByATT.split(" ");
  if (parent) {
    let role = getElementRole(parent, page);
    let inAT = !isElementPresentation(parent, page) && !isElementHidden(parent,page);//isElementInAT(when added html list)
    let tagName = parent.getElementTagName();
    let id = parent.getElementAttribute("id");
    if(inAT && (tagName === "p"|| role === "cell" || role === "gridcell" || role === "listitem" || id && ariaDescribedBy.includes(id))){
      context.push(parent.getElementSelector())
    }
    getLinkContextAux(parent, page,ariaDescribedBy,context);
  }
  return context;
}

function getLinkContextAux(element: QWElement, page: QWPage,ariaDescribedBy:string[], context:string[]): void {
  let parent = element.getElementParent();
  if (parent) {
    let role = getElementRole(parent, page);
    let inAT = !isElementPresentation(parent, page) && !isElementHidden(parent,page);//isElementInAT(when added html list)
    let tagName = parent.getElementTagName();
    let id = parent.getElementAttribute("id");
    if(inAT && (tagName === "p"|| role === "cell" || role === "gridcell"|| role === "listitem"||(id && ariaDescribedBy.includes(id)))){
      context.push(parent.getElementSelector())
    }
    getLinkContextAux(parent, page,ariaDescribedBy,context);
  }
}

export default getLinkContext;
