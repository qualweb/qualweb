export type AriaAttributeRoleInfo = {
  global: string;
  typeValue: string;
  values: string | string[];
  defaultValue: string;
};

export type AriaAttributeRoles = {
  [aria: string]: AriaAttributeRoleInfo;
};

export const ariaAttributesRoles: AriaAttributeRoles = {
  'aria-activedescendant': {
    global: 'no',
    typeValue: 'id',
    values: '',
    defaultValue: ''
  },
  'aria-atomic': {
    global: 'yes',
    typeValue: 'value',
    values: ['true', 'false'],
    defaultValue: 'false'
  },
  'aria-autocomplete': {
    global: 'no',
    typeValue: 'value',
    values: ['inline', 'list', 'both', 'none'],
    defaultValue: 'none'
  },
  'aria-busy': {
    global: 'yes',
    typeValue: 'value',
    values: ['true', 'false'],
    defaultValue: 'false'
  },
  'aria-checked': {
    global: 'no',
    typeValue: 'value',
    values: ['false', 'mixed', 'true', 'undefined'],
    defaultValue: 'undefined'
  },
  'aria-colcount': {
    global: 'no',
    typeValue: 'integer',
    values: '',
    defaultValue: ''
  },
  'aria-colindex': {
    global: 'no',
    typeValue: 'integer',
    values: '',
    defaultValue: ''
  },
  'aria-colspan': {
    global: 'no',
    typeValue: 'integer',
    values: '',
    defaultValue: ''
  },
  'aria-controls': {
    global: 'yes',
    typeValue: 'idList',
    values: '',
    defaultValue: ''
  },
  'aria-current': {
    global: 'yes',
    typeValue: 'value',
    values: ['page', 'step', 'location', 'date', 'time', 'true', 'false'],
    defaultValue: 'false'
  },
  'aria-describedby': {
    global: 'yes',
    typeValue: 'idList',
    values: '',
    defaultValue: ''
  },
  'aria-details': {
    global: 'yes',
    typeValue: 'id',
    values: '',
    defaultValue: ''
  },
  'aria-disabled': {
    global: 'yes',
    typeValue: 'value',
    values: ['true', 'false'],
    defaultValue: 'false'
  },
  'aria-dropeffect': {
    global: 'yes',
    typeValue: 'list',
    values: ['copy', 'execute', 'link', 'move', 'none', 'popup'],
    defaultValue: 'none'
  },
  'aria-errormessage': {
    global: 'yes',
    typeValue: 'id',
    values: '',
    defaultValue: ''
  },
  'aria-expanded': {
    global: 'no',
    typeValue: 'value',
    values: ['true', 'false', 'undefined'],
    defaultValue: 'undefined'
  },
  'aria-flowto': {
    global: 'yes',
    typeValue: 'idList',
    values: '',
    defaultValue: ''
  },
  'aria-grabbed': {
    global: 'yes',
    typeValue: 'value',
    values: ['true', 'false', 'undefined'],
    defaultValue: 'undefined'
  },
  'aria-haspopup': {
    global: 'yes',
    typeValue: 'value',
    values: ['false', 'true', 'menu', 'listbox', 'tree', 'grid', 'dialog'],
    defaultValue: 'false'
  },
  'aria-hidden': {
    global: 'yes',
    typeValue: 'value',
    values: ['true', 'false', 'undefined'],
    defaultValue: 'undefined'
  },
  'aria-invalid': {
    global: 'yes',
    typeValue: 'value',
    values: ['grammar', 'false', 'spelling', 'true'],
    defaultValue: 'false'
  },
  'aria-keyshortcuts': {
    global: 'yes',
    typeValue: 'string',
    values: '',
    defaultValue: ''
  },
  'aria-label': {
    global: 'yes',
    typeValue: 'string',
    values: '',
    defaultValue: ''
  },
  'aria-labelledby': {
    global: 'no',
    typeValue: 'idList',
    values: '',
    defaultValue: ''
  },
  'aria-level': {
    global: 'yes',
    typeValue: 'integer',
    values: '',
    defaultValue: ''
  },
  'aria-live': {
    global: 'yes',
    typeValue: 'value',
    values: ['assertive', 'off', 'polite'],
    defaultValue: 'off'
  },
  'aria-modal': {
    global: 'no',
    typeValue: 'value',
    values: ['true', 'false'],
    defaultValue: 'false'
  },
  'aria-multiline': {
    global: 'no',
    typeValue: 'value',
    values: ['true', 'false'],
    defaultValue: 'false'
  },
  'aria-multiselectable': {
    global: 'no',
    typeValue: 'value',
    values: ['true', 'false'],
    defaultValue: 'false'
  },
  'aria-orientation': {
    global: 'no',
    typeValue: 'value',
    values: ['horizontal', 'undefined', 'vertical'],
    defaultValue: 'undefined'
  },
  'aria-owns': {
    global: 'yes',
    typeValue: 'idList',
    values: '',
    defaultValue: ''
  },
  'aria-placeholder': {
    global: 'no',
    typeValue: 'string',
    values: '',
    defaultValue: ''
  },
  'aria-posinset': {
    global: 'no',
    typeValue: 'integer',
    values: '',
    defaultValue: ''
  },
  'aria-pressed': {
    global: 'no',
    typeValue: 'value',
    values: ['false', 'mixed', 'true', 'undefined'],
    defaultValue: 'undefined'
  },
  'aria-readonly': {
    global: 'no',
    typeValue: 'value',
    values: ['true', 'false'],
    defaultValue: 'false'
  },
  'aria-relevant': {
    global: 'yes',
    typeValue: 'list',
    values: ['additions', 'additions text', 'all', 'removals', 'text'],
    defaultValue: 'additions text'
  },
  'aria-required': {
    global: 'yes',
    typeValue: 'value',
    values: ['true', 'false'],
    defaultValue: 'false'
  },
  'aria-roledescription': {
    global: 'yes',
    typeValue: 'string',
    values: '',
    defaultValue: ''
  },
  'aria-rowcount': {
    global: 'no',
    typeValue: 'integer',
    values: '',
    defaultValue: ''
  },
  'aria-rowindex': {
    global: 'no',
    typeValue: 'integer',
    values: '',
    defaultValue: ''
  },
  'aria-rowspan': {
    global: 'no',
    typeValue: 'integer',
    values: '',
    defaultValue: ''
  },
  'aria-selected': {
    global: 'no',
    typeValue: 'value',
    values: ['true', 'false', 'undefined'],
    defaultValue: 'undefined'
  },
  'aria-setsize': {
    global: 'no',
    typeValue: 'integer',
    values: '',
    defaultValue: ''
  },
  'aria-sort': {
    global: 'no',
    typeValue: 'value',
    values: ['ascending', 'descending', 'none', 'other'],
    defaultValue: 'none'
  },
  'aria-valuemax': {
    global: 'no',
    typeValue: 'number',
    values: '',
    defaultValue: ''
  },
  'aria-valuemin': {
    global: 'no',
    typeValue: 'number',
    values: '',
    defaultValue: ''
  },
  'aria-valuenow': {
    global: 'no',
    typeValue: 'number',
    values: '',
    defaultValue: ''
  },
  'aria-valuetext': {
    global: 'no',
    typeValue: 'string',
    values: '',
    defaultValue: ''
  }
};
