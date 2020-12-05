class SelectorCalculator {
  private document: Document | ShadowRoot;

  constructor(document: Document | ShadowRoot) {
    this.document = document;
  }

  public processElementSelector(): void {
    const html = this.document.querySelector('html');
    if (!!html) {
      html.setAttribute('_selector', 'html');
      let children = html.children;
      if (!!children) {
        this.processElementSelectorAux([...children]);
      }
    }
  }

  private processElementSelectorAux(elements: Element[]): void {
    let parent = elements[0].parentElement;
    if (parent) {
      let selector = parent.getAttribute('_selector');
      if (selector) {
        this.addSelectorAttribute(elements, selector);
        for (let element of elements) {
          let children = element.children;
          if (children && children.length > 0) {
            this.processElementSelectorAux([...children]);
          }
        }
      }
    }
  }

  private addSelectorAttribute(elements: Element[], selector: string): void {
    let index = 1;
    let name;
    for (let element of elements) {
      name = element.tagName.toLowerCase();
      element.setAttribute(
        '_selector',
        selector + ' > ' + name + ':nth-child(' + index + ')'
      );
      index++;
    }
  }
}

export = SelectorCalculator;
