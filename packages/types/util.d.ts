declare module "@qualweb/util" {
  import { QWElement } from "@qualweb/qw-element";

  interface AriaAttributesRoles {
    [attribute: string]: {
      global: string;
      typeValue: string;
      values: string | Array<string>;
      defaultValue: string;
    };
  }

  interface Roles {
    [role: string]: {
      baseConcept: string | Array<string>;
      attribute: string | Array<string>;
      requiredContextRole: string | Array<string>;
      requiredAria?: string | Array<string>;
      requiredRoles?: string | Array<string>;
      supportedAria?: string | Array<string>;
      supportedRoles?: string | Array<string>;
      implicitValueRoles: Array<Array<string>>;
      requiredOwnedElements: any;
    };
  }

  interface Languages { 
    [lang: string]: number;
  }

  class DomUtils {
    public static elementIdIsReferenced(element: QWElement, id: string, attribute: string): boolean;
    public static getElementReferencedByHREF(element: QWElement): QWElement | null;
    public static getVideoMetadata(element: QWElement): any;
    public static isHumanLanguage(text: string): boolean;
    public static getTextSize(font: string, fontSize: number, bold: boolean, italic: boolean, text: string): number
    public static isElementADescendantOf(element: QWElement, names: Array<string>, roles: Array<string>): boolean;
    public static isElementADescendantOfExplicitRole(element: QWElement, names: Array<string>, roles: Array<string>): boolean;
    public static isElementHidden(element: QWElement): boolean;
    public static isElementHiddenByCSS(element: QWElement): boolean;
    public static isElementHiddenByCSSAux(element: QWElement): boolean;
    public static isElementVisible(element: QWElement): boolean;
    public static videoElementHasAudio(element: QWElement): boolean;
    public static elementHasContent(element: QWElement, checkChildren: boolean): boolean;
    public static getTrimmedText(element: QWElement): string;
    public static objectElementIsNonText(element: QWElement): boolean;
  }

  class AccessibilityUtils {
    public static ariaAttributesRoles: AriaAttributesRoles;
    public static roles: Roles;
    public static languages: Languages;
    public static isElementChildPresentationalAux(element: QWElement): boolean;
    public static isElementChildPresentational(element: QWElement): boolean;
    public static isFocusableBrowser(element: QWElement): boolean;
    public static isElementFocusable(element: QWElement): boolean;
    public static isElementFocusableByDefault(element: QWElement): boolean;
    public static elementHasGlobalARIAPropertyOrAttribute(element: QWElement): boolean;
    public static getAccessibleNameRecursion(element: QWElement, recursion: boolean, isWidget: boolean): string | undefined;
    public static getLinkContext(element: QWElement): Array<string>;
    public static allowsNameFromContent(element: QWElement): boolean;
    public static elementHasRoleNoneOrPresentation(element: QWElement): boolean;
    public static elementHasValidRole(element: QWElement): boolean;
    public static getAccessibleName(element: QWElement): string | undefined;
    public static getAccessibleNameSelector(element: QWElement): Array<string> | undefined;
    public static getAccessibleNameSVG(element: QWElement): string | undefined;
    public static getAccessibleNameSVGRecursion(element: QWElement, recursion: boolean): string | undefined;
    public static getDefaultName(element: QWElement): string;
    public static getDisabledWidgets(): Array<QWElement>;
    public static getElementRole(element: QWElement): string | null;
    public static getElementRoleAName(element: QWElement, aName: string | undefined): string | null;
    public static getValueFromEmbeddedControl(element: QWElement): string;
    public static isDataTable(element: QWElement): boolean;
    public static isElementChildOfDetails(element: Node): boolean;
    public static isElementControl(element: QWElement): boolean;
    public static isElementInAT(element: QWElement): boolean;
    public static isElementReferencedByAriaLabel(element: QWElement): boolean;
    public static isElementWidget(element: QWElement): boolean;
    public static getImplicitRole(element: QWElement, accessibleName: string | undefined): string | null;
    public static getOwnerElement(element: QWElement): QWElement | null;
    public static isPartOfSequentialFocusNavigation(element: QWElement): boolean;
    public static getOwnedElements(element: QWElement): Array<QWElement>;
  }

  export {
    AriaAttributesRoles,
    Roles,
    DomUtils,
    AccessibilityUtils
  };
}
