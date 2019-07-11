#!/usr/bin/env node
'use strict';

(async () => {
  const args = Array.from(process.argv).slice(2);

  try {
    process.title = 'qw ' + args.join(' ');
  } catch(err) {
    process.title = 'qw';
  }

  const cli = require('../dist/index.js');
  await cli(args);
  process.exit();
})();