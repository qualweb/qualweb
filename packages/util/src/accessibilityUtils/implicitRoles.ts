export type ImplicitRoleInfo = {
  attributes: (string | null)[][];
  role: string;
  special?: boolean;
};

export type ImplicitRoles = {
  [element: string]: ImplicitRoleInfo[];
};

export const implicitRoles: ImplicitRoles = {
  a: [
    {
      attributes: [['href', '']],
      role: 'link',
      special: true
    }
  ],
  address: [
    {
      attributes: [],
      role: 'group'
    }
  ],
  area: [
    {
      attributes: [['href', '']],
      role: 'link',
      special: true
    }
  ],
  article: [
    {
      attributes: [],
      role: 'article'
    }
  ],
  aside: [
    {
      attributes: [],
      role: 'complementary'
    }
  ],
  b: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  bdi: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  bdo: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  blockquote: [
    {
      attributes: [],
      role: 'blockquote'
    }
  ],
  body: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  button: [
    {
      attributes: [],
      role: 'button'
    }
  ],
  caption: [
    {
      attributes: [],
      role: 'caption'
    }
  ],
  code: [
    {
      attributes: [],
      role: 'code'
    }
  ],
  data: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  datalist: [
    {
      attributes: [],
      role: 'listbox'
    }
  ],
  del: [
    {
      attributes: [],
      role: 'deletion'
    }
  ],
  details: [
    {
      attributes: [],
      role: 'group'
    }
  ],
  dfn: [
    {
      attributes: [],
      role: 'term'
    }
  ],
  dialog: [
    {
      attributes: [],
      role: 'dialog'
    }
  ],
  div: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  em: [
    {
      attributes: [],
      role: 'emphasis'
    }
  ],
  fieldset: [
    {
      attributes: [],
      role: 'group'
    }
  ],
  figure: [
    {
      attributes: [],
      role: 'figure'
    }
  ],
  footer: [
    {
      attributes: [],
      role: 'contentinfo',
      special: true
    }
  ],
  form: [
    {
      attributes: [],
      role: 'form',
      special: true
    }
  ],
  h1: [
    {
      attributes: [],
      role: 'heading',
      special: true
    }
  ],
  h2: [
    {
      attributes: [],
      role: 'heading',
      special: true
    }
  ],
  h3: [
    {
      attributes: [],
      role: 'heading',
      special: true
    }
  ],
  h4: [
    {
      attributes: [],
      role: 'heading',
      special: true
    }
  ],
  h5: [
    {
      attributes: [],
      role: 'heading',
      special: true
    }
  ],
  h6: [
    {
      attributes: [],
      role: 'heading',
      special: true
    }
  ],
  header: [
    {
      attributes: [],
      role: 'banner',
      special: true
    }
  ],
  hgroup: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  hr: [
    {
      attributes: [],
      role: 'separator'
    }
  ],
  html: [
    {
      attributes: [],
      role: 'document'
    }
  ],
  i: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  img: [
    {
      attributes: [],
      role: 'img',
      special: true
    }
  ],
  input: [
    {
      attributes: [
        ['type', 'button'],
        ['type', 'image'],
        ['type', 'reset'],
        ['type', 'submit']
      ],
      role: 'button'
    },
    {
      attributes: [['type', 'checkbox']],
      role: 'checkbox'
    },
    {
      attributes: [['type', 'number']],
      role: 'spinbutton'
    },
    {
      attributes: [['type', 'radio']],
      role: 'radio'
    },
    {
      attributes: [['type', 'range']],
      role: 'slider'
    },
    {
      attributes: [
        ['type', null],
        ['type', 'text'],
        ['type', 'search'],
        ['type', 'tel'],
        ['type', 'url'],
        ['type', 'email']
      ],
      role: 'combobox',
      special: true
    }
  ],
  ins: [
    {
      attributes: [],
      role: 'insertion'
    }
  ],
  li: [
    {
      attributes: [],
      role: 'listitem',
      special: true
    }
  ],
  main: [
    {
      attributes: [],
      role: 'main'
    }
  ],
  math: [
    {
      attributes: [],
      role: 'math'
    }
  ],
  menu: [
    {
      attributes: [],
      role: 'list'
    }
  ],
  meter: [
    {
      attributes: [],
      role: 'meter'
    }
  ],
  nav: [
    {
      attributes: [],
      role: 'navigation'
    }
  ],
  ol: [
    {
      attributes: [],
      role: 'list'
    }
  ],
  optgroup: [
    {
      attributes: [],
      role: 'group'
    }
  ],
  option: [
    {
      attributes: [],
      role: 'option',
      special: true
    }
  ],
  output: [
    {
      attributes: [],
      role: 'status'
    }
  ],
  p: [
    {
      attributes: [],
      role: 'paragraph'
    }
  ],
  pre: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  progress: [
    {
      attributes: [],
      role: 'progressbar'
    }
  ],
  q: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  samp: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  section: [
    {
      attributes: [],
      role: 'region',
      special: true
    }
  ],
  select: [
    {
      attributes: [],
      role: 'combobox',
      special: true
    }
  ],
  small: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  span: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  strong: [
    {
      attributes: [],
      role: 'strong'
    }
  ],
  sub: [
    {
      attributes: [],
      role: 'subscript'
    }
  ],
  sup: [
    {
      attributes: [],
      role: 'superscript'
    }
  ],
  svg: [
    {
      attributes: [],
      role: 'graphics-document'
    }
  ],
  table: [
    {
      attributes: [],
      role: 'table'
    }
  ],
  tbody: [
    {
      attributes: [],
      role: 'rowgroup'
    }
  ],
  textarea: [
    {
      attributes: [],
      role: 'textbox'
    }
  ],
  tfoot: [
    {
      attributes: [],
      role: 'rowgroup'
    }
  ],
  thead: [
    {
      attributes: [],
      role: 'rowgroup'
    }
  ],
  time: [
    {
      attributes: [],
      role: 'time'
    }
  ],
  td: [
    {
      attributes: [],
      role: 'cell',
      special: true
    }
  ],
  th: [
    {
      attributes: [],
      role: 'columnheader',
      special: true
    }
  ],
  tr: [
    {
      attributes: [],
      role: 'row'
    }
  ],
  u: [
    {
      attributes: [],
      role: 'generic'
    }
  ],
  ul: [
    {
      attributes: [],
      role: 'list'
    }
  ]
};
