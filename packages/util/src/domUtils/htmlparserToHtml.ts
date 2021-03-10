// @ts-nocheck

import { Node, Element, DataNode } from 'domhandler';

const emptyTags = {
  area: 1,
  base: 1,
  basefont: 1,
  br: 1,
  col: 1,
  frame: 1,
  hr: 1,
  img: 1,
  input: 1,
  isindex: 1,
  link: 1,
  meta: 1,
  param: 1,
  embed: 1,
  '?xml': 1
};

const ampRe = /&/g,
  looseAmpRe = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi,
  ltRe = /</g,
  gtRe = />/g,
  quotRe = /\"/g,
  eqRe = /\=/g;

const config = {
  disableAttribEscape: false
};

function escapeAttrib(s: string): string {
  if (config.disableAttribEscape === true) return s.toString();

  // null or undefined
  if (s == null) {
    return '';
  }
  if (s.toString && typeof s.toString == 'function') {
    // Escaping '=' defangs many UTF-7 and SGML short-tag attacks.
    return s
      .toString()
      .replace(ampRe, '&amp;')
      .replace(ltRe, '&lt;')
      .replace(gtRe, '&gt;')
      .replace(quotRe, '&#34;')
      .replace(eqRe, '&#61;');
  } else {
    return '';
  }
}

const html = function (item: Node | Node[], parent: Node, eachFn: any): string {
  // apply recursively to arrays
  if (Array.isArray(item)) {
    return item
      .map(function (subitem) {
        // parent, not item: the parent of an array item is not the array,
        // but rather the element that contained the array
        return html(subitem, parent, eachFn);
      })
      .join('');
  }
  let orig = item;
  let result;
  let element: Element | DataNode | undefined;
  if (eachFn) {
    item = eachFn(item, parent);
  }
  if (typeof item !== 'undefined' && typeof item.type !== 'undefined') {
    switch (item.type) {
      case 'text':
        element = <DataNode>item;
        return element.data;
      case 'directive':
        element = <DataNode>item;
        return '<' + element.data + '>';
      case 'comment':
        element = <DataNode>item;
        return '<!--' + element.data + '-->';
      case 'style':
      case 'script':
      case 'tag':
        element = <Element>item;
        result = '<' + element.name;
        if (element && element.attribs && Object.keys(element.attribs).length > 0) {
          result +=
            ' ' +
            Object.keys(element.attribs)
              .map(function (key) {
                return key + '="' + escapeAttrib(element.attribs[key]) + '"';
              })
              .join(' ');
        }
        if (element.children) {
          // parent becomes the current element
          // check if the current item (before any eachFns are run) - is a renderable
          if (!orig.render) {
            orig = parent;
          }
          result +=
            '>' + html(element.children, orig, eachFn) + (emptyTags[element.name] ? '' : '</' + element.name + '>');
        } else {
          if (emptyTags[element.name]) {
            result += '>';
          } else {
            result += '></' + element.name + '>';
          }
        }
        return result;
      case 'cdata':
        element = <DataNode>item;
        return '<!CDATA[' + element.data + ']]>';
    }
  }
  return item;
};

module.exports = html;
