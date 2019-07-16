declare module '@qualweb/accessibility-tree' {
  import { DomElement } from 'htmlparser2';

  interface AccessibleElement {
    name: string;
    role: string;
    id: string;
    children: AccessibleElement[];
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