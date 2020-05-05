import { QWElement } from '@qualweb/qw-element';

class QWPage {
  private document: Document;
  constructor(document: Document) {
    this.document = document;
  }
  public getElement(selector: string): QWElement | null {

    let element = document.querySelector(selector)
    if (element)
      return new QWElement(element);
    else
      return null;
  }
  public getElements(selector: string): Array<QWElement> {
    let elements = document.querySelectorAll(selector)
    let qwList: Array<QWElement> = [];
    for (let element of elements) {
      qwList.push(new QWElement(element));
    }
    return qwList;

  }
}
export{QWPage};
