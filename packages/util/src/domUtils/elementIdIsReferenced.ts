function elementIdIsReferenced(element: typeof window.qwElement, id: string, attribute: string): boolean {
  let result: boolean;
  try {
    result = window.qwPage.getElement('[' + attribute + `="${id}"]`, element) !== null;
  } catch {
    result = false;
  }
  return result;
}

export default elementIdIsReferenced;
