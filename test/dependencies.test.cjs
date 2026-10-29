const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { it } = require('node:test');

const root = path.join(__dirname, '..');
const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'));
const forbidden = new Set([
  'deepmerge', 'extract-zip', 'basic-ftp', 'patch-package',
  'puppeteer-extra', 'puppeteer-extra-plugin-stealth',
  'puppeteer-extra-plugin-adblocker', 'puppeteer-extra-plugin-user-preferences',
]);

it('does not install the abandoned dependency chains or patch tooling', () => {
  for (const name of Object.keys(lock.packages)) {
    assert.equal(forbidden.has(name.split('node_modules/').pop()), false, name);
  }
});

it('only installs Zod versions containing the collection-size fix', () => {
  for (const [name, pkg] of Object.entries(lock.packages)) {
    if (name.endsWith('node_modules/zod')) {
      const [major, minor, patch] = pkg.version.split('.').map(Number);
      assert.ok(major > 4 || (major === 4 && (minor > 6 || (minor === 6 && patch >= 6))), pkg.version);
    }
  }
});

it('core and CLI do not require the opt-in Puppeteer backend', () => {
  for (const workspace of ['core', 'cli']) {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, 'packages', workspace, 'package.json'), 'utf8'));
    for (const name of Object.keys(pkg.dependencies)) {
      assert.equal(/puppeteer/.test(name), false, `${workspace}: ${name}`);
    }
  }
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  assert.equal(pkg.scripts.postinstall, undefined);
  assert.equal(pkg.overrides['basic-ftp'], undefined);
});
