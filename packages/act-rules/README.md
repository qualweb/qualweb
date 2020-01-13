# QualWeb ACT Rules Module

Implementation of the [ACT rules](https://act-rules.github.io/rules/).

## How to install

```shell
  $ npm i @qualweb/act-rules --save
```

## How to run

```javascript
  'use strict';

  const { ACTRules } = require('@qualweb/act-rules');

  (async () => {
    const dom = await getDom('https://act-rules.github.io/pages/about/');

    const actRules = new ACTRules();

    const report = await actRules.execute(sourceHtml, page, stylesheets);

    // print rules executed
    console.log(Object.keys(report));
    // ['QW-ACT-R1', 'QW-ACT-R2', 'QW-ACT-R3', ...]

    // print rule outcome
    console.log(report['QW-ACT-R1'].metadata.outcome);
    // 'passed' | 'failed' | 'inapplicable'

    // print rule results
    console.log(report['QW-ACT-R1'].results[0]);
    // {
    //   verdict: 'passed'
    //   description: 'HTML page has title element'
    //   resultCode: 'RC1'
    //   htmlCode: '<title>Some title</title>'
    //   pointer: 'html > head > title'
    // }
  })();
```

## Configure

If you want you can configure the module to run only specific rules, or rules based on their principles and conform levels.

```javascript
'use strict';

  const { getDom } = require('@qualweb/get-dom-puppeteer');
  const { ACTRules } = require('@qualweb/act-rules');

  (async () => {
    const options = {
      rules: ['QW-ACT-R1', 'QW-ACT-R2', 'bf051a'], // will execute these rules regarding the other options given
      principles: ['Understandable'], // will only execute rules that belong to the 'Understandable' principle
      levels: ['A', 'AA'] // will only execute rules that belong to the 'A' and 'AA' conform levels
    };

    const actRules = new ACTRules(options);
    // OR
    const actRules = new ACTRules();
    actRules.configure(options);

    // In this case, with these options, all rules that belong to the 'Understandable' principle and the 'A' and 'AA' conform levels and rules 'QW-ACT-R1' and 'QW-ACT-R2' and 'bf051a' will be executed

    const report = await actRules.execute(sourceHtml, page, stylesheets);
  })();
```

## Implemente rules

| QualWeb Rule ID | ACT Rule ID | ACT Rule Name |
|---|---|---|
| QW-ACT-R1 | [2779a5](https://act-rules.github.io/rules/2779a5) | HTML Page has a title |
| QW-ACT-R2 | [b5c3f8](https://act-rules.github.io/rules/b5c3f8) | HTML has lang attribute |
| QW-ACT-R3 | [5b7ae0](https://act-rules.github.io/rules/5b7ae0) | HTML lang and xml:lang match |
| QW-ACT-R4 | [bc659a](https://act-rules.github.io/rules/bc659a) | Meta-refresh no delay |
| QW-ACT-R5 | [bf051a](https://act-rules.github.io/rules/bf051a) | Validity of HTML Lang attribute |
| QW-ACT-R6 | [59796f](https://act-rules.github.io/rules/59796f) | Image button has accessible name |
| QW-ACT-R7 | [b33eff](https://act-rules.github.io/rules/b33eff) | Orientation of the page is not restricted using CSS transform property |
| QW-ACT-R8 | [9eb3f6](https://act-rules.github.io/rules/9eb3f6) | Image filename is accessible name for image |
| QW-ACT-R11 | [97a4e1](https://act-rules.github.io/rules/97a4e1) | Button has accessible name |
| QW-ACT-R12 | [c487ae](https://act-rules.github.io/rules/c487ae) | Link has accessible name |
| QW-ACT-R13 | [6cfa84](https://act-rules.github.io/rules/6cfa84) | Element with `aria-hidden` has no focusable content |
| QW-ACT-R14 | [b4f0c3](https://act-rules.github.io/rules/b4f0c3) | meta viewport does not prevent zoom |
| QW-ACT-R15 | [80f0bf](https://act-rules.github.io/rules/80f0bf) | audio or video has no audio that plays automatically |
| QW-ACT-R16 | [e086e5](https://act-rules.github.io/rules/e086e5) | Form control has accessible name |
| QW-ACT-R17 | [23a2a8](https://act-rules.github.io/rules/23a2a8) | Image has accessible name |
| QW-ACT-R18 | [3ea0c8](https://act-rules.github.io/rules/3ea0c8) | `id` attribute value is unique |
| QW-ACT-R19 | [cae760](https://act-rules.github.io/rules/cae760) | iframe element has accessible name |
| QW-ACT-R20 | [674b10](https://act-rules.github.io/rules/674b10) | role attribute has valid value |
| QW-ACT-R21 | [7d6734](https://act-rules.github.io/rules/7d6734) | svg element with explicit role has accessible name |
| QW-ACT-R22 | [de46e4](https://act-rules.github.io/rules/de46e4) | Element within body has valid lang attribute |
| QW-ACT-R23 | [c5a4ea](https://act-rules.github.io/rules/c5a4ea) | video element visual content has accessible alternative |
| QW-ACT-R30 | [2ee8b8](https://act-rules.github.io/rules/2ee8b8) | Visible label is part of accessible name |

# License

ISC