#!/usr/bin/env node
'use strict';

(async () => {
  const args = Array.from(process.argv).slice(2);

  try {
    process.title = 'qw ' + args.join(' ');
  } catch(err) {
    process.title = 'qw';
  }

  const cli = require('../cli');
  await cli.init(args);
})();