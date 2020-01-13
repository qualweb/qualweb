export default {
  'non_concurrent': {
    'pre': {
      'meta': ['QW-ACT-R4']
    },
    'post': {
      'title': ['QW-ACT-R1']
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
      'body [lang]': ['QW-ACT-R22'],
      'body': ['QW-ACT-R9','QW-ACT-R10'],
      'input, select, textarea, [role]': ['QW-ACT-R16'],
      '[role]': ['QW-ACT-R20'],
      'img, [role="img"]':  ['QW-ACT-R17'],
      'iframe': ['QW-ACT-R19'],
      '[aria-label], [aria-labelledby]': ['QW-ACT-R30'],
      'video': ['QW-ACT-R23'],
      'audio, video': ['QW-ACT-R15']
    }
  }
};
