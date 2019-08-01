declare module '@qualweb/accessibility-tree' {
  import { DomElement } from 'htmlparser2';

  interface AccessibleElement {
    name: string;
    role: string;
    'aria-label'?: string;

    id?: string;
    reference?: string;
    nameFrom: {
      type: 'element' | 'attribute' | 'text';
      attribute?: string;
      element?: string;
      elementId?: string;
      elementReference?: string;
    };
    element: string;
    nElements: number;
    children?: AccessibleElement[];
  }

  interface AccessibilityTree {
    nElements: number;
    containsIds: boolean;
    containsReferences: boolean;
    tree: AccessibleElement;
  }

  interface AccessibilityTreeOptions {
    setIds?: boolean;
    setReferences?: boolean;
  }

  function generateAccessibilityTree(dom: DomElement[], options?: AccessibilityTreeOptions): Promise<AccessibilityTree>;

  export {
    AccessibleElement,
    AccessibilityTree,
    AccessibilityTreeOptions,
    generateAccessibilityTree
  };
}