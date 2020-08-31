
declare module '@qualweb/util' {
  import { Browser } from "puppeteer";
  import { QWElement } from "@qualweb/qw-element";
  import { QWPage } from "@qualweb/qw-page";
  import { Node } from 'domhandler';

  namespace DomUtils {
    export function elementHasGlobalARIAPropertyOrAttribute(elementQW: QWElement): boolean;
    export function elementIDIsReferenced(pageQW: QWPage, elementQW: QWElement, id: string, attribute: string): boolean;
    export function getElementReferencedByHREF(pageQW: QWPage, elementQW: QWElement): QWElement | null;
    export function getSourceElementAttribute(element: Node, attribute: string): string | null;
    export function getSourceElementHtmlCode(element: Node, withText: boolean, fullElement: boolean): string;
    export function getSourceElementSelector(element: Node): string;
    export function getVideoMetadata(elementQW: QWElement): any;
    export function isElementADescendantOf(elementQW: QWElement, pageQW: QWPage, names: string[], roles: string[]): boolean;
    export function isElementADescendantOfExplicitRole(elementQW: QWElement, pageQW: QWPage, names: string[], roles: string[]): boolean;
    export function isElementFocusable(elementQW: QWElement,pageQW: QWPage): boolean;
    export function isElementFocusableByDefault(elementQW: QWElement): boolean;
    export function isElementHidden(elementQW: QWElement,pageQW: QWPage): boolean;
    export function isElementHiddenByCSS(elementQW: QWElement,pageQW: QWPage): boolean;
    export function isElementHiddenByCSSAux(elementQW: QWElement): boolean;
    export function isElementVisible(elementQW: QWElement,pageQW: QWPage): boolean;
    export function isFocusableBrowser(page: QWPage, element: QWElement): boolean;
    //export function isMathDocument(url: string): boolean;
    export function videoElementHasAudio(elementQW: QWElement): boolean;
  }

  namespace BrowserUtils {
    export function detectIfUnwantedTabWasOpened(browser: Browser, url: string): Promise<boolean>;
  }

  namespace AccessibilityUtils {
    export function getLinkContext(element: QWElement, page: QWPage): string[] 
    export function allowsNameFromContent(element: QWElement): boolean;
    export function elementHasRoleNoneOrPresentation(elementQW: QWElement): boolean;
    export function elementHasValidRole(elementQW: QWElement, pageQW: QWPage): boolean;
    export function getAccessibleName(elementQW: QWElement, pageQW: QWPage): string | undefined;
    export function getAccessibleNameSelector(element: QWElement, pageQW: QWPage): string[] | undefined;
    export function getAccessibleNameSVG(element: QWElement, page: QWPage): string | undefined;
    export function getAccessibleNameSVGRecursion(element: QWElement, page: QWPage, recursion: boolean): string | undefined;
    export function getDefaultName(elementQW: QWElement): string;
    export function getDisabledWidgets(pageQW: QWPage): QWElement[];
    export function getElementRole(elementQW: QWElement, pageQW: QWPage): string | null;
    export function getElementRoleAName(elementQW: QWElement, pageQW: QWPage, aName: string | undefined): string | null;
    export function getTextFromCss(elementQW: QWElement, textContent: string): string;
    export function getTrimmedText(elementQW: QWElement): string;
    export function getValueFromEmbeddedControl(element: QWElement, page: QWPage, treeSelector: string): string;
    export function isDataTable(element: QWElement, pageQW: QWPage): boolean;
    export function isElementChildOfDetails(element: Node): boolean;
    export function isElementControl(elementQW: QWElement, pageQW: QWPage): boolean;
    export function isElementInAT(elementQW: QWElement, pageQW: QWPage): boolean;
    export function isElementReferencedByAriaLabel(elementQW: QWElement, pageQW: QWPage): boolean;
    export function isElementWidget(elementQW: QWElement, pageQW: QWPage): boolean;
    export function getImplicitRole(elementQW: QWElement, pageQW: QWPage, accessibleName: string | undefined): string | null;
  }

  namespace CssUtils {
    export function trimImportant(value: string): string;
  }

  namespace ShadowDomUtils {
    export function areElementsInTheSameTree(elements: QWElement[]): boolean;
  }

  enum Optimization {
    Performance = 1,
    ErrorDetection = 2
  }

  export {
    DomUtils,
    BrowserUtils,
    AccessibilityUtils,
    CssUtils,
    ShadowDomUtils,
    Optimization
  }
}
