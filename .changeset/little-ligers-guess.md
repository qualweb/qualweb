---
'@qualweb/wcag-techniques': minor
'@qualweb/best-practices': minor
'@qualweb/earl-reporter': minor
'@qualweb/qw-element': minor
'@qualweb/act-rules': minor
'@qualweb/counter': minor
'@qualweb/crawler': minor
'@qualweb/qw-page': minor
'@qualweb/locale': minor
'@qualweb/core': minor
'@qualweb/util': minor
'@qualweb/cli': minor
'@qualweb/cui-checks': minor
---

# Major refactor and code cleanup

This update makes significant changes to the overall structure of QualWeb's
code and the API. Most users should be able to be able to migrate with only a
few changes.

There's a new convention for running evaluations. See the next section for a
brief migration guide.

Additionally, several packages are no longer in use. If you are using any of
the following packages in your project, remove them when you update to the new
version of `@qualweb/core` to avoid any issues:

- `@qualweb/types`
- `@qualweb/dom`
- `@qualweb/evaluation`

## New convention for calling QualWeb

Previous versions of QualWeb expects an options object containing detailed
configurations for each supported module. While this reduced bootstrapping a bit
(users only needed to install `@qualweb/core` to get started), it was a bit
rigid and bothersome to maintain/extend.

Now, individual evaluation modules must be instantiated and configured by the
user and passed to QualWeb.

For most users, updating your code should be quite simple. Here's an example.

Currently, you might have an evaluation run like this:

```typescript
import { Qualweb } from '@qualweb/core';

const qw = new QualWeb();
await qw.start();

const result = await qw.evaluate({
  url: 'https://example.com',
  execute: {
    act: true,
  },
  "act-rules": {
    levels: ['A', 'AA'],
  },
});
```

To update to work with the new API, do the following:

First, install the modules you use as additional dependencies in your project.
For this example, adding `@qualweb/act-rules` next to `@qualweb/core` in your
package.json file. The other modules you might be using are:

- `@qualweb/wcag-techniques`
- `@qualweb/counter`
- `@qualweb/best-practices`

Then, for each module you are using, import that package and create an instance
of that module for use in QualWeb. Pass that instance to the evaluate function
instead. Updated, the previous example would now look like this:

```typescript
import { Qualweb } from '@qualweb/core';
// Import the evaluation module.
import { ACTRules } from '@qualweb/act-rules';

const qw = new Qualweb();
await qw.start();

// Instantiate an evaluation module and configure it before
// passing it to QualWeb.
const actRulesModule = new ACTRules({
  levels: ['A'],
});

const result = await qw.evaluate({
  url: 'https://example.com',
  // Add the module to be run here.
  modules: [
    actRulesModule,
  ],
});
```

The approach is similar to how middleware/plugins works in express-style
frameworks.

## Removal of @qualweb/types

The typings package `@qualweb/types` has been removed. Historically, it contained
the TypeScript types applicable to all other packages. Now, those types are
exported from the source packages instead. For example, where you would
previously install both `@qualweb/core` and `@qualweb/types` to have proper
typing for the `Qualweb` object, it is now sufficient just to install
`@qualweb/core`.

Make sure to remove @qualweb/types from your project if you were using it, to
avoid any issues with conflicting types.

## Removal of @qualweb/evaluation and @qualweb/dom

These packages have been rolled into either core or util. For anyone using
QualWeb solely through the `@qualweb/core` package, this should not cause any
issues.

## Anything missing?

This is a fairly set of changes, and we may have missed something moving things
around. While QualWeb *should* run without any notable changes, please do add
an issue if you have any problems.