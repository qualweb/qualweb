function isDataTable(element: typeof window.qwElement): boolean {
  // based on https://www.w3.org/TR/WCAG20-TECHS/H43.html
  // and https://fae.disability.illinois.edu/rulesets/TABLE_5/
  // it is considered that AccessibilityUtils element is already a <table> element
  const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
  const thElem = element.getElements('th');
  const tdHeaders = element.getElements('td[scope]');
  const tdWithHeaders = element.getElements('td[headers]');
  const presentation = element.getElementAttribute('role') === 'presentation';
  const describedBy = Boolean(element.getElementAttribute('aria-describedby'));

  return presentation
    ? false
    : !!accessibleName || thElem.length > 0 || tdHeaders.length > 0 || tdWithHeaders.length > 0 || describedBy;
}

export default isDataTable;
