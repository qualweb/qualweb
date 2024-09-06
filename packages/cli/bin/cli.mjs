#!/usr/bin/env node
'use strict';

import { cli } from '../dist/cli/src/index.js';

(async () => {
  const args = Array.from(process.argv).slice(2);

  try {
    process.title = 'qw ' + args.join(' ');
  } catch(err) {
    process.title = 'qw';
  }

  await cli(args);
})();
