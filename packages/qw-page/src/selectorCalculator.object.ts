export class SelectorCalculator {
  public static processElementSelector(document: Document | ShadowRoot): void {
    const html = document.querySelector('html');
    if (html) {
      html.setAttribute('qw-selector', 'html');
      const children = html.children;
      if (children) {
        this.processElementSelectorAux([...children]);
      }
    }
  }

  private static processElementSelectorAux(elements: Array<Element>): void {
    const parent = elements[0].parentElement;
    if (parent) {
      const selector = parent.getAttribute('qw-selector');
      if (selector) {
        this.addSelectorAttribute(elements, selector);
        for (const element of elements ?? []) {
          const children = element.children;
          if (children && children.length > 0) {
            this.processElementSelectorAux([...children]);
          }
        }
      }
    }
  }

  private static addSelectorAttribute(elements: Array<Element>, selector: string): void {
    let index = 1;
    for (const element of elements) {
      const name = element.tagName.toLowerCase();
      element.setAttribute('qw-selector', selector + ' > ' + name + ':nth-child(' + index + ')');
      index++;
    }
  }
}
