import { QWElement } from '@qualweb/qw-element';

class QWPage {
  private document: Document;
  constructor(document: Document) {
    this.document = document;
  }
  public getElement(selector: string): QWElement | null {

    let element = this.document.querySelector(selector)
    if (element)
      return new QWElement(element);
    else
      return null;
  }
  public getElements(selector: string): Array<QWElement> {
    let elements = this.document.querySelectorAll(selector)
    let qwList: Array<QWElement> = [];
    for (let element of elements) {
      qwList.push(new QWElement(element));
    }
    return qwList;

  }

  public getElementByID(id: string,elementQW: QWElement):QWElement | null {
     let treeSelector = elementQW.getTreeSelector();
     let element = this.document.querySelector(`#${id}`+treeSelector);
    if (element)
      return new QWElement(element);
    else
      return null;

  }
}
export{QWPage};
