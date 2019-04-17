/**
 * Author: João Afonso Vicente
 * 
 * Description: 
 *
 * Notes:
 *
 * Last modified: 21/02/2019
 */
'use strict';

// requires
const _ = require('lodash');
const htmlparser = require('htmlparser2');
const stew = new(require('stew-select')).Stew();

/**
 * Html object
 */
class Html {

  constructor(html) {
    this.html = html;

    const handler = new htmlparser.DomHandler((error, dom) => {
      if (error) {
        throw new Error();
      } else {
        this.parsedHTML = dom;

        let n = 0;
        const count = elem => {
          n++;
          for (let i = 0 ; i < _.size(elem['children']) ; i++) {
            if (elem['children'][i]['type'] === 'tag') {
              count(elem['children'][i]);
            }
          }
        }

        for (let i = 0 ; i < _.size(dom) ; i++) {
          if (dom[i]['type'] === 'tag') {
            count(dom[i]);
          }
        }
        this.elementCount = n;
      }
    });

    const parser = new htmlparser.Parser(handler);
    parser.write(_.replace(html, /(\r\n|\n|\r|\t)/gm, ''));
    parser.end();

    let title = stew.select(this.parsedHTML, 'title');

    if (_.size(title) > 0) {
      this.title = _.size(title[0]['children']) > 0 ? title[0]['children'][0]['data'] : '';
    }
  }

   _getRawHTML() {
    return this.html;
  }

  _setRawHTML(rawHTML) {
    this.html = rawHTML;
  }

  _getParsedHTML() {
    return this.parsedHTML;
  }

  _setParsedHTML(parsedHTML) {
    this.parsedHTML = parsedHTML;
  }

  _getTitle() {
    return this.title;
  }

  _getElementCount() {
    return this.elementCount;
  }

  toJson() {
    return _.clone({
      title: this.title,
      elementCount: this.elementCount,
      //html: this.html
    });
  }
}

module.exports = Html;