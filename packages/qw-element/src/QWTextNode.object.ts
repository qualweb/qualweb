export class QWTextNode {
  private readonly node: Node;

  constructor(node: Node) {
    this.node = node;
  }

public getBoundingBox(): DOMRect | null {
  const text = this.node.textContent || "";
  const firstChar = text.search(/\S/); 
  const lastChar = text.trimEnd().length;

  if (firstChar === -1) return null; 

  const range = document.createRange();
  try {
    range.setStart(this.node, firstChar);
    range.setEnd(this.node, lastChar);

    const rect = range.getBoundingClientRect();

    return (rect.width === 0 && rect.height === 0) ? null : rect;
  } catch (e) {
    return null;
  } finally {
    range.detach();
  }
}
  public isVisible(): boolean {
  const rect = this.getBoundingBox();
  if (!rect || (rect.width === 0 && rect.height === 0)) {
    return false;
  }

  const parent = this.node.parentElement;
  if (!parent) return false;

  const style = window.getComputedStyle(parent);

  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    this.getText() !== '' 
  );
}

  public getText(): string {
    return this.node.textContent?.trim() || '';
  }

}