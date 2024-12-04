export class SelectorCalculator {
  public static processElementSelector(document: Document | ShadowRoot): void {
    const html = document.querySelector('html');
    if (html) {
      html.setAttribute('qw-selector', 'html');
      const children = html.children;
      if (children) {
        this.processElementSelectorAux(children);
      }
    }
  }

  private static processElementSelectorAux(elements: HTMLCollection): void {
    const parent = elements[0].parentElement;
    if (parent) {
      const selector = parent.getAttribute('qw-selector');
      if (selector) {
        this.addSelectorAttribute(elements, selector);
        for (let i = 0; i < elements.length; i++) {
          const element = elements.item(i);
          if (element) {
            const children = element.children;
            if (children && children.length > 0) {
              this.processElementSelectorAux(children);
            }
          }
        }
      }
    }
  }

  private static addSelectorAttribute(elements: HTMLCollection, selector: string): void {
    let index = 1;
    for (let i = 0; i < elements.length; i++) {
      const element = elements.item(i);
      if (element) {
        const name = element.tagName.toLowerCase();
        element.setAttribute('qw-selector', selector + ' > ' + name + ':nth-child(' + index + ')');
        index++;
      }
    }
  }
}
