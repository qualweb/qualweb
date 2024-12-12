const svgs = window.qwPage.getElements('svg');

svgs.forEach((svg) => {
  console.log(svg);
  console.log(AccessibilityUtils.getAccessibleNameSVG(svg));
});