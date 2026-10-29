# qualweb

QualWeb evaluates web accessibility using modular ACT rules, WCAG techniques,
best practices, and other checks.

## Browser runtime

Playwright Chromium is now the default for `@qualweb/core` and `@qualweb/cli`.
Core requires Node.js 20 or newer. Developing this monorepo, including the
optional Puppeteer backend, requires Node.js 22.12 or newer.

```sh
PUPPETEER_SKIP_DOWNLOAD=true npm ci
npx --no-install playwright install chromium
export PUPPETEER_EXECUTABLE_PATH="$(node -p 'require("playwright").chromium.executablePath()')"
npm run build:all
npm run test:dependencies
```

On Linux CI, use `playwright install --with-deps chromium`. The executable-path
environment variable lets historical Puppeteer-based module tests reuse the
same Chromium installation; default evaluations do not need Puppeteer.

For applications, install `@qualweb/core` and the desired evaluation modules,
then run `npx playwright install chromium`. CLI users must also install this
browser before their first evaluation.

See the [core documentation](packages/core/README.md) for usage and migration
details. The [Playwright driver package](packages/playwright-driver/README.md)
remains a compatibility re-export of the implementation now included in core.
The [Puppeteer driver](packages/puppeteer-driver/README.md) is a separate,
explicit opt-in package and is not installed by core or the CLI.

## Dependency security

No dependency patches or security overrides are required for this migration.
The abandoned Puppeteer-extra plugins and their `deepmerge` chain have been
removed. Playwright avoids the old `extract-zip`, Zod 3, and FTP downloader
chains. The optional modern Puppeteer backend uses patched Zod 4.

`npm run test:dependencies` checks the entire workspace lockfile for the removed
packages and vulnerable Zod versions. CI and `npm run test:all` include this
check. These dependency changes travel with the published package manifests;
downstream applications do not need a root postinstall patch hook.

### Intentional migration differences

- `new QualWeb()` uses Playwright Chromium, with the same report API.
- Ad blocking uses the maintained Ghostery Playwright integration and its full
  ads, tracking, and annoyances lists. `new QualWeb({ adBlock: true })` remains
  supported. Filter initialization errors reject startup.
- The abandoned stealth plugin is removed. `stealth: true` throws a migration
  error rather than silently dropping the requested behavior.
- `start(poolOptions, launchOptions)` accepts Playwright launch options.
  Puppeteer's `monitor: true` is not supported by the default pool and throws.
- Native-page plugins now receive a Playwright `Page` through `nativePage`.
  Migrate driver-specific cookie, interception, and page APIs accordingly.
  Async plugin hooks are awaited in registration order and failures reach the
  evaluation error manager.
- `networkidle0` and `networkidle2` both map to Playwright `networkidle`.
- `QualWeb.createPage()` takes a `DriverPage` adapter, not a raw Puppeteer page.
- These are breaking API/runtime changes and require a coordinated release of
  core, CLI, the compatibility package, and the optional driver. Local changes
  do not fix alerts in applications still using previously published versions.
