'use strict';

import request from 'request-promise';

async function isMathDocument(url: string): Promise<boolean> {
  const response = await request(url);
  return response.trim().startsWith('<math');
}

export = isMathDocument;