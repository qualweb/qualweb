export default {
  'non_concurrent': {
    'pre': {
      'meta': ['QW-ACT-R4']
    },
    'post': {
      'title': ['QW-ACT-R1'],
      'body *': ['QW-ACT-R43']
    }
  },
  'concurrent': {
    'pre': {
    },
    'post': {
      'html': ['QW-ACT-R2', 'QW-ACT-R3', 'QW-ACT-R5'],
      'img[src], input[type="image"][src]': ['QW-ACT-R8'],
      'input[type="image"]': ['QW-ACT-R6'],
      'button, input[type="submit"], input[type="reset"], input[type="button"], summary, [role="button"]': ['QW-ACT-R11'],
      'a[href], area[href], [role="link"]': ['QW-ACT-R12'],
      '[aria-hidden="true"]': ['QW-ACT-R13'],
      'meta[name]': ['QW-ACT-R14'],
      '[id]': ['QW-ACT-R18'],
      'svg': ['QW-ACT-R21'],
      'body *[lang]': ['QW-ACT-R22'],
      'body': ['QW-ACT-R9','QW-ACT-R10', 'QW-ACT-R25', 'QW-ACT-R27', 'QW-ACT-R28', 'QW-ACT-R34', 'QW-ACT-R38','QW-ACT-R44'],
      'input, select, textarea, [role]': ['QW-ACT-R16','QW-ACT-R41'],
      '[role]': ['QW-ACT-R20','QW-ACT-R33'],
      'img, [role="img"]':  ['QW-ACT-R17'],
      'iframe': ['QW-ACT-R19'],
      'audio':['QW-ACT-R29'],
      '[aria-label], [aria-labelledby]': ['QW-ACT-R30'],
      'video': ['QW-ACT-R23', 'QW-ACT-R26', 'QW-ACT-R31', 'QW-ACT-R32'],
      'audio, video': ['QW-ACT-R15'],
      'input[autocomplete], select[autocomplete], textarea[autocomplete]' : ['QW-ACT-R24'],
      'h1,h2,h3,h4,h5,h6,[role="heading"]': ['QW-ACT-R35'],
      '[headers]': ['QW-ACT-R36'],
      'th,[role="rowheader"],[role="columnheader"]': ['QW-ACT-R39'],
      'object':["QW-ACT-R42"],
      'li,dd,dt':["QW-ACT-R45"],
      'ul,ol,dl':["QW-ACT-R46"],
      '*[style]': ['QW-ACT-R47'],
      '[role="presentation"],[role="none"],[alt=""]': ['QW-ACT-R48'],
      '*': ['QW-ACT-R7']
    }
  }
};
