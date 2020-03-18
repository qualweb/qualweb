declare module '@qualweb/util' {
  import { ElementHandle, Page, Browser } from 'puppeteer';
  import { Node } from 'domhandler';

  namespace DomUtils {
    export function elementHasAttribute(element: ElementHandle, attribute: string): Promise<boolean>;
    export function elementHasAttributes(element: ElementHandle): Promise<boolean>;
    export function elementHasChild(element: ElementHandle, childName: string): Promise<boolean>;
    export function elementHasChildren(element: ElementHandle): Promise<boolean>;
    export function elementHasGlobalARIAPropertyOrAttribute(element: ElementHandle): Promise<boolean>;
    export function elementHasParent(element: ElementHandle, parent: string): Promise<boolean>;
    export function elementIDIsReferenced(page: Page, element: ElementHandle, id: string, attribute: string): Promise<boolean>;
    export function getContentComputedStylesAttribute(element: Node, computedStyle: string, attribute: string): string;
    export function getElementAttribute(element: ElementHandle, attribute: string): Promise<string | null>;
    export function getElementAttributes(element: ElementHandle): Promise<any>;
    export function getElementAttributesName(element: ElementHandle): Promise<Array<string>>;
    export function getElementByAttributeName(page: Page, name: string): Promise<ElementHandle | null>;
    export function getElementById(page: Page, element:ElementHandle,id:string): Promise<ElementHandle | null>;
    export function getElementChildren(element: ElementHandle): Promise<ElementHandle[]>;
    export function getElementChildTextContent(element: ElementHandle, childName: string): Promise<string | undefined>;
    export function getElementHtmlCode(element: ElementHandle, withText: boolean, fullElement: boolean): Promise<string>;
    export function getElementNextSibling(element: ElementHandle): Promise<ElementHandle | null>;
    export function getElementParent(element: ElementHandle): Promise<ElementHandle | null>;
    export function getElementPreviousSibling(element: ElementHandle): Promise<ElementHandle | null>;
    export function getElementReferencedByHREF(page: Page, element: ElementHandle): Promise<ElementHandle | null>;
    export function getElementSelector(element: ElementHandle): Promise<string>;
    export function getElementStyleProperty(element: ElementHandle, property: string, pseudoStyle: string | null): Promise<string>;
    export function getElementTagName(element: ElementHandle): Promise<string>;
    export function getElementText(element: ElementHandle): Promise<string>;
    export function getElementType(element: ElementHandle): Promise<string>;
    export function getPageRootElement(page: Page): Promise<ElementHandle | null>;
    export function getSourceElementAttribute(element: Node, attribute: string): string | null;
    export function getSourceElementHtmlCode(element: Node, withText: boolean, fullElement: boolean): string;
    export function getSourceElementSelector(element: Node): string;
    export function getVideoMetadata(element: ElementHandle): Promise<any>;
    export function isElementADescendantOf(element: ElementHandle, page: Page, names: string [], roles: string[]): Promise<boolean>;
    export function isElementADescendantOfExplicitRole(element: ElementHandle, page: Page, names: string [], roles: string[]): Promise<boolean>;
    export function isElementFocusable(element: ElementHandle): Promise<boolean>;
    export function isElementFocusableByDefault(element: ElementHandle): Promise<boolean>;
    export function isElementHidden(element: ElementHandle): Promise<boolean>;
    export function isElementHiddenByCSS(element: ElementHandle): Promise<boolean>;
    export function isElementHiddenByCSSAux(element: ElementHandle): Promise<boolean>;
    export function isElementPresentation(element: ElementHandle,page:Page): Promise<boolean>;
    export function isElementVisible(element: ElementHandle): Promise<boolean>;
    export function isFocusableBrowser(page: Page, element: ElementHandle): Promise<boolean>;
    export function isMathDocument(url: string): Promise<boolean>;
    export function isOffScreen(element: ElementHandle): Promise<boolean>;
    export function setElementAttribute(element: ElementHandle, attribute: string,value:string): Promise<void>;
    export function videoElementHasAudio(element: ElementHandle): Promise<boolean>;
  }

  namespace BrowserUtils {
    export function detectIfUnwantedTabWasOpened(browser: Browser, url: string): Promise<boolean>;
  }

  namespace AccessibilityUtils {
    export function allowsNameFromContent(element: ElementHandle): Promise<boolean>;
    export function elementHasRoleNoneOrPresentation(element: ElementHandle): Promise<boolean>;
    export function elementHasValidRole(element: ElementHandle, page:Page): Promise<boolean>;
    export function getAccessibleName(element: ElementHandle, page: Page): Promise<string | undefined>;
    export function getAccessibleNameSVG(element: ElementHandle, page: Page): Promise<string | undefined>;
    export function getDefaultName(element: ElementHandle): Promise<string>;
    export function getElementRole(element: ElementHandle, page: Page): Promise<string | null>;
    export function getImplicitRole(element: ElementHandle, page: Page): Promise<string | null>;
    export function getTextFromCss(element: ElementHandle, textContent: string): string;
    export function getTrimmedText(element: ElementHandle): Promise<string>;
    export function getValueFromEmbeddedControl(element: ElementHandle, page: Page,treeSelector:string): Promise<string>;
    export function isDataTable(element: ElementHandle, page: Page): Promise<boolean>;
    export function isElementChildOfDetails(element: Node): boolean;
    export function isElementControl(element: ElementHandle): Promise<boolean>;
    export function isElementInAT(element: ElementHandle, page: Page): Promise<boolean>;
    export function isElementReferencedByAriaLabel(element:ElementHandle, page:Page): Promise<boolean>;
    export function isElementWidget(element: ElementHandle): Promise<boolean>;
    export function getDisabledWidgets(page:Page): Promise<ElementHandle[]>;
    export function getAccessibleNameSelector(element: ElementHandle, page: Page): Promise<string[] | undefined>;
  }

  namespace CssUtils {
    export function trimImportant(value: string): string;
  }

  namespace ShadowDomUtils {
    export function areElementsInTheSameTree(elements: ElementHandle[]): Promise<boolean>;
    export function getTreeSelector(elements: ElementHandle): Promise<string>;
    export function processShadowDom(page: Page): Promise<Page>;
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