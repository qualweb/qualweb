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

/**
 * Url object
 */
class Url {

  constructor(inputUrl, protocol, domainName, domain, uri, completeUrl, finalUrl=null, redirected=false) {
    this.inputUrl = inputUrl;
    this.protocol = protocol;
    this.domainName = domainName;
    this.domain = domain;
    this.uri = uri;
    this.completeUrl = completeUrl;
    this.finalUrl = finalUrl;
    this.redirected = redirected;
  }

  _getInputUrl() {
    return this.inputUrl;
  }

  _getProtocol() {
    return this.protocol;
  }

  _getDomainName() {
    return this.domainName;
  }

  _getDomain() {
    return this.domain;
  }

  _getUri() {
    return this.uri;
  }

  _getCompleteUrl() {
    return this.completeUrl;
  }

  _getFinalUrl() {
    if (this.redirected) {
      return this.finalUrl;
    }

    return this.completeUrl;
  }

  _wasRedirected() {
    return this.redirected;
  }

  toJson() {
    return _.clone({
      inputUrl: this.inputUrl,
      protocol: this.protocol,
      domainName: this.domainName,
      domain: this.domain,
      uri: this.uri,
      completeUrl: this.completeUrl,
      finalUrl: this.finalUrl,
      redirected: this.redirected
    });
  }
}

module.exports = Url;