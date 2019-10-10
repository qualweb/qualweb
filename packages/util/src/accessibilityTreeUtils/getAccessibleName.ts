'use strict';

import {DomElement} from 'htmlparser2';
import {trim} from 'lodash';
import {isElementHidden, getElementById} from "../domUtils/domUtils";
import getTrimmedText from './getTrimmedText';
import getDefaultName from './getDefaultName';
import allowsNameFromContent from "./allowsNameFromContent";
import getTextAlternative from './getTextAlternative';
import elementHasRoleNoneOrPresentation from './elementHasRoleNoneOrPresentation';
import isElementReferencedByWidget from './isElementReferencedByWidget';
import hasControlElementWithinLabel from './hasControlElementWithinLabel';
import isElementChildOfDetails from './isElementChildOfDetails';
import isElementReferencedByLabelOrAriaLabel from './isElementReferencedByLabelOrAriaLabel';
import getAccessibleNameFromAriaLabelledBy from './getAccessibleNameFromAriaLabelledBy';
import getAccessibleNameFromChildren from './getAccessibleNameFromChildren';
import getTextFromCss from './getTextFromCss';
import getValueFromLabelWithControl from './getValueFromLabelWithControl';

function getAccessibleName(element: DomElement, processedHTML: DomElement[], reference: boolean): string | undefined {

  let id, title, ariaLabel, ariaLabelBy, isHidden, nameFromContent, textAlternative, isReferencedByWidget ;
  let hasRoleNoneOrPresentation, hasControlWithinLabel, isReferenced = false;
  let textElement = getTrimmedText(element);
  let defaultName = getDefaultName(element);
  let isChildOfDetails = isElementChildOfDetails(element);
  let isSummary = element.name === "summary";
  let summaryCheck = ((isSummary && isChildOfDetails) || !isSummary);

  if (element.attribs) {
    id = element.attribs["id"];
    title = element.attribs.title;
    ariaLabel = element.attribs["aria-label"];
    ariaLabelBy = getElementById(element.attribs["aria-labelledby"], processedHTML) ? element.attribs["aria-labelledby"] : "";
    isHidden = isElementHidden(element);
    nameFromContent = allowsNameFromContent(element);
    textAlternative = getTextAlternative(id, element, processedHTML);
    hasRoleNoneOrPresentation = elementHasRoleNoneOrPresentation(element);
  }
  isReferencedByWidget = isElementReferencedByWidget(id, element, processedHTML);
  hasControlWithinLabel = hasControlElementWithinLabel(id, element, processedHTML);

  if (id) {
    isReferenced = isElementReferencedByLabelOrAriaLabel(id, element, processedHTML);
  }

  if (isHidden && !reference && !isReferenced) { // A
    return undefined;
  } else if (ariaLabelBy !== "" && !reference && summaryCheck) { // B
    return getAccessibleNameFromAriaLabelledBy(ariaLabelBy, processedHTML);
  } else if (ariaLabel && trim(ariaLabel) !== "" && !(isReferencedByWidget && hasControlWithinLabel && reference) && summaryCheck) { // C
    return ariaLabel;
  } else if (textAlternative && !hasRoleNoneOrPresentation && summaryCheck && !(isReferencedByWidget && hasControlWithinLabel)) { // D
    return textAlternative;
  } else if (isReferencedByWidget && hasControlWithinLabel) { // E
    return getValueFromLabelWithControl(id, element, processedHTML);
  } else if ((nameFromContent || isReferenced)) { // F
    let textFromCss = getTextFromCss(element, textElement);
    return getAccessibleNameFromChildren(element, processedHTML, textFromCss);
  } else if (textElement !== "") { // G
    return textElement;
  } else if (title !== undefined) { // I
    return title;
  } else if (defaultName !== "" && summaryCheck) { // J
    return defaultName;
  } else {
    return undefined;
  }
}

export = getAccessibleName;
