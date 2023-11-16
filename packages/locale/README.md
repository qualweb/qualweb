# @qualweb/locale

Translation module for QualWeb reports.

## How to install

```shell
  $ npm i @qualweb/locale --save
```

## Language support

If you want a translation on your own language, follow these steps:

<ol>
  <li>Make a copy of src/locales/en.json and rename it to use the <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes">lang code</a> (check 639-1 column)</li>
  <li>Translate the modules you want</li>
  <li>Update the README.md language support table</li>
  <li>Make a pull request with the changes</li>
</ol>

<table>
  <thead>
    <tr>
      <th rowspan="2">Language</th>
      <th rowspan="2">Code</th>
      <th colspan="3" style="text-align: center;">Modules support</th>
    </tr>
    <tr>
      <th>act-rules</th>
      <th>wcag-techniques</th>
      <th>best-practices</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>English</td>
      <td>en</td>
      <td>Full</td>
      <td>Full</td>
      <td>Full</td>
    </tr>
	<tr>
      <td>Finnish</td>
      <td>fi</td>
      <td>Full</td>
      <td>none</td>
      <td>none</td>
    </tr>
	<tr>
      <td>Swedish</td>
      <td>sv</td>
      <td>Full</td>
      <td>none</td>
      <td>none</td>
    </tr>
    <tr>
      <td>Norwegian Bokmål</td>
      <td>nb</td>
      <td>Full</td>
      <td>none</td>
      <td>none</td>
    </tr>
     <tr>
      <td>Norwegian Nynorsk</td>
      <td>nn</td>
      <td>Full</td>
      <td>none</td>
      <td>none</td>
    </tr>
  </tbody>
</table>

## How to run

The best way to have a translated report is by using the [@qualweb/core](https://github.com/qualweb/core) module, and passing the locale code you want in the options. If you really want to use this package separately bear in mind that the **variables** in the sentences wont be translated and some meaning can be lost.

```javascript
'use strict';

import locales, { translateReport } from '@qualweb/locale';

async () => {
  // EvaluationReport only. EARL report is not currently supported. If you need a EARL report, convert the evaluation report after the translation. Check https://github.com/qualweb/earl-reporter
  const report = 'Evaluation report obtained from @qualweb/cli or @qualweb/core';

  const translatedReport = translateReport(report, 'en');
  // OR
  const translatedReport = translateReport(report, locales.en);
  // OR
  const ownLocale = {
    // If you have a compatible locale object
  };
  const translatedReport = translateReport(report, ownLocale);

  console.log(translatedReport);
};
```

### License

ISC
