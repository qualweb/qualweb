declare module "@qualweb/util" {
  import { Browser } from "puppeteer";
  import { QWElement } from "@qualweb/qw-element";
  import { QWPage } from "@qualweb/qw-page";

  class DomUtils {
    public static elementIDIsReferenced(
      elementQW: QWElement,
      pageQW: QWPage,
      id: string,
      attribute: string
    ): boolean;
    public static getElementReferencedByHREF(
      pageQW: QWPage,
      elementQW: QWElement
    ): QWElement | null;
    public static getSourceElementAttribute(
      element: Node,
      attribute: string
    ): string | null;
    public static getSourceElementHtmlCode(
      element: Node,
      withText: boolean,
      fullElement: boolean
    ): string;
    public static getSourceElementSelector(element: Node): string;
    public static getVideoMetadata(elementQW: QWElement): any;
    public static isElementADescendantOf(
      elementQW: QWElement,
      pageQW: QWPage,
      names: string[],
      roles: string[]
    ): boolean;
    public static isElementADescendantOfExplicitRole(
      elementQW: QWElement,
      pageQW: QWPage,
      names: string[],
      roles: string[]
    ): boolean;
    public static isElementHidden(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    public static isElementHiddenByCSS(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    public static isElementHiddenByCSSAux(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    public static isElementVisible(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    //public static isMathDocument(url: string): boolean;
    public static videoElementHasAudio(elementQW: QWElement): boolean;
    public static elementHasContent(
      elementQW: QWElement,
      pageQW: QWPage,
      checkChildren: boolean
    ): boolean;
    public static getTrimmedText(elementQW: QWElement, page: QWPage): string;
    public static objectElementisNonText(elementQW: QWElement): boolean;
  }

  class BrowserUtils {
    public static detectIfUnwantedTabWasOpened(
      browser: Browser,
      url: string
    ): Promise<boolean>;
  }

  class AccessibilityUtils {
    public static isElementChildPresentationalAux(
      element: QWElement,
      page: QWPage
    ): boolean;
    public static isElementChildPresentational(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    public static isFocusableBrowser(page: QWPage, element: QWElement): boolean;
    public static isElementFocusable(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    public static isElementFocusableByDefault(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    public static elementHasGlobalARIAPropertyOrAttribute(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    public static getAccessibleNameRecursion(
      element: QWElement,
      page: QWPage,
      recursion: boolean,
      isWidget: boolean
    ): string | undefined;
    public static getLinkContext(element: QWElement, page: QWPage): string[];
    public static allowsNameFromContent(element: QWElement): boolean;
    public static elementHasRoleNoneOrPresentation(
      elementQW: QWElement
    ): boolean;
    public static elementHasValidRole(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    public static getAccessibleName(
      elementQW: QWElement,
      pageQW: QWPage
    ): string | undefined;
    public static getAccessibleNameSelector(
      element: QWElement,
      pageQW: QWPage
    ): string[] | undefined;
    public static getAccessibleNameSVG(
      element: QWElement,
      page: QWPage
    ): string | undefined;
    public static getAccessibleNameSVGRecursion(
      element: QWElement,
      page: QWPage,
      recursion: boolean
    ): string | undefined;
    public static getDefaultName(elementQW: QWElement): string;
    public static getDisabledWidgets(pageQW: QWPage): QWElement[];
    public static getElementRole(
      elementQW: QWElement,
      pageQW: QWPage
    ): string | null;
    public static getElementRoleAName(
      elementQW: QWElement,
      pageQW: QWPage,
      aName: string | undefined
    ): string | null;
    public static getValueFromEmbeddedControl(
      element: QWElement,
      page: QWPage,
      treeSelector: string
    ): string;
    public static isDataTable(element: QWElement, pageQW: QWPage): boolean;
    public static isElementChildOfDetails(element: Node): boolean;
    public static isElementControl(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    public static isElementInAT(elementQW: QWElement, pageQW: QWPage): boolean;
    public static isElementReferencedByAriaLabel(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    public static isElementWidget(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    public static getImplicitRole(
      elementQW: QWElement,
      pageQW: QWPage,
      accessibleName: string | undefined
    ): string | null;
    public static getOwnerElement(
      elementQW: QWElement,
      pageQW: QWPage
    ): QWElement | null;
    public static isPartOfSequentialFocusNavigation(
      elementQW: QWElement,
      pageQW: QWPage
    ): boolean;
    public static getOwnedElements(
      elementQW: QWElement,
      pageQW: QWPage
    ): QWElement[];
  }

  class CssUtils {
    public static trimImportant(value: string): string;
  }

  class ShadowDomUtils {
    public static areElementsInTheSameTree(elements: QWElement[]): boolean;
  }

  export {
    DomUtils,
    BrowserUtils,
    AccessibilityUtils,
    CssUtils,
    ShadowDomUtils,
  };
}
