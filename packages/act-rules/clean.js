'use strict';

const fs = require('fs');
const exec = require('child_process').execSync;

try {
  if (fs.existsSync('./dist')) {
    if (process.platform === 'win32') {
      exec('rmdir /Q /S dist');
    } else {
      exec('rm -rf dist');
    }
  }

  process.exit(0);
} catch (e) {
  process.exit(1);
}