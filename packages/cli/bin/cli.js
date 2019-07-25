#!/usr/bin/env node
'use strict';

const cli = require('../dist/index.js');

(async () => {
  const args = Array.from(process.argv).slice(2);

  try {
    process.title = 'qw ' + args.join(' ');
  } catch(err) {
    process.title = 'qw';
  }

  await cli(args);
})();