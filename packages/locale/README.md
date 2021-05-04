# @qualweb/locale

Translation module for QualWeb reports.

## How to install

```shell
  $ npm i @qualweb/locale --save
```

## Language support

<table>
  <thead>
    <tr>
      <th>Language</th>
      <th>act-rules</th>
      <th>wcag-techniques</th>
      <th>best-practices</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>en</td>
      <td>yes</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td>pt</td>
      <td>partial</td>
      <td>no</td>
      <td>no</td>
    </tr>
  </tbody>
</table>

## How to run

```javascript
  'use strict';

  import locales, { translate } from '@qualweb/locale';

  (async () => {
    const report = "Evaluation report obtained from @qualweb/cli or @qualweb/core";

    const translatedReport = translate(report, 'en');
    // OR
    const translatedReport = translate(report, locales.en);
    // OR
    const ownLocale = {
      // If you have a compatible locale object 
    };
    const translatedReport = translate(report, ownLocale);

    console.log(translatedReport);
  });
```