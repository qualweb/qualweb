export default {
  'img + map > area': ['QW-WCAG-T1'],
  fieldset: ['QW-WCAG-T3'],
  body: ['QW-WCAG-T9', 'QW-WCAG-T23'],
  'input[type="image"]': ['QW-WCAG-T5'],
  applet: ['QW-WCAG-T11'],
  table: ['QW-WCAG-T2', 'QW-WCAG-T4', 'QW-WCAG-T12', 'QW-WCAG-T14', 'QW-WCAG-T18'],
  a: ['QW-WCAG-T10', 'QW-WCAG-T20', 'QW-WCAG-T21'],
  '*[onmousedown], *[onmouseup], *[onclick], *[onmouseover], *[onmouseout], *[onmouseenter], *[onmouseleave], *[onmousemove], *[ondblclick], *[onwheel]':
    ['QW-WCAG-T6'],
  abbr: ['QW-WCAG-T7'],
  link: ['QW-WCAG-T15'],
  blink: ['QW-WCAG-T13'],
  input: ['QW-WCAG-T17'],
  'ol, ul, dl': ['QW-WCAG-T32'],
  form: ['QW-WCAG-T19'],
  'body, body *': ['QW-WCAG-T24', 'QW-WCAG-T30'],
  'th, td[scope]': ['QW-WCAG-T25'],
  //'p, div, h1, h2, h3, h4, h5, h6, col, colgroup, tbody, thead, tfoot, tr, th, td': ['QW-WCAG-T27'],
  'div[onmousedown], div[onmouseup], div[onclick], div[onmouseover], div[onmouseout], div[onkeydown], div[onkeyup], div[onkeypress], div[onfocus], div[onblur], div[onmouseenter], div[onmouseleave], div[onmousemove], div[ondblclick], div[onwheel], span[onmousedown], span[onmouseup], span[onclick], span[onmouseover], span[onmouseout], span[onkeydown], span[onkeyup], span[onkeypress], span[onfocus], span[onblur], span[onmouseenter], span[onmouseleave], span[onmousemove], span[ondblclick], span[onwheel]':
    ['QW-WCAG-T26'],
  'img[alt], area[alt] ': ['QW-WCAG-T8'],
  'style, [style]': ['QW-WCAG-T28', 'QW-WCAG-T29'],
  '*:not(head):not(style):not(link):not(meta):not(script)': ['QW-WCAG-T31'],
  '[align]': ['QW-WCAG-T27']
};
