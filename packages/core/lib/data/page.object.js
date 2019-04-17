/**
 * Author: João Afonso Vicente
 * 
 * Description: 
 *
 * Notes:
 *
 * Last modified: 24/06/2017
 */
'use strict';

// requires
const _ = require('lodash');

const Html = require('./html.object');

/**
 * Page Object
 */
class Page {

  constructor(context, userAgent, sourceHTML, postProcessingHTML) {
    this.context = context;
    this.userAgent = userAgent;
    this.sourceHTML = new Html(sourceHTML);
    this.postProcessingHTML = new Html(postProcessingHTML);
  }

  _getContext() {
    return this.context;
  }

  _getUserAgent() {
    return this.userAgent;
  }

  _getSourceHTML() {
    return this.sourceHTML;
  }

  _getPostProcessingHTML() {
    return this.postProcessingHTML;
  }

  toJson() {
    return _.clone({
      context: this.context,
      userAgent: this.userAgent,
      sourceHtml: this.sourceHTML.toJson(),
      postProcessingHtml: this.postProcessingHTML.toJson()
    });
  }
}

module.exports = Page;