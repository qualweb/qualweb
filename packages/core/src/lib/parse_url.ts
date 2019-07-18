'use strict';

import { Url } from '@qualweb/core';

function get_corrected_url(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'http://' + url;
  }

  return url;
}

function parse_url(url: string): Url {
  let inputUrl = url;
  let protocol = null;
  let domainName = null;
  let domain = null;
  let uri = null;
  let completeUrl = get_corrected_url(inputUrl);

  protocol = completeUrl.split('://')[0];
  domainName = completeUrl.split('/')[2];

  const tmp = domainName.split('.');
  domain = tmp[tmp.length-1];
  uri = completeUrl.split('.' + domain)[1];

  const parsedUrl: Url = {
    inputUrl,
    protocol,
    domainName,
    domain,
    uri,
    completeUrl
  };

  return parsedUrl;
}

export = parse_url;