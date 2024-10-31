# QualWeb WCAG techniques

Implementation of the [WCAG 2.1 techniques](https://www.w3.org/WAI/WCAG21/Techniques/).

## How to use

This package is intended to be used with [@qualweb/core](https://github.com/qualweb/core).

Add both packages to your project: 

```bash
npm i --save @qualweb/core @qualweb/wcag-techniques
```

In your own code, pass an instance of the `WCAGTechniques` class to QualWeb's evaluate method:

```typescript
import { WCAGTechniques } from '@qualweb/wcag-techniques';
import { QualWeb } from '@qualweb/core';

async function main() {
  const qw = new QualWeb();

  await qw.start();

  const bpInstance = new WCAGTechniques({
    // Include/exclude specific rules here. Omitting any filters implies *all*
    // rules are included.
    levels: ['A', 'AA'],
    includes: ['QW-WCAG-T5'],
  });

  const urlToEvaluate = 'https://www.google.com';

  const report = await qw.evaluate({
    url: urlToEvaluate,
    modules: [bpInstance],
  });

  await qw.stop();

  console.debug(report[urlToEvaluate].metadata);
}
```

## Implemented techniques

| QualWeb Technique ID | WCAG Technique ID                                                                                                                                                       | WCAG Technique Name                                                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| QW-WCAG-T1           | [H24](https://www.w3.org/WAI/WCAG21/Techniques/html/H24)                                                                                                                | Providing text alternatives for the area elements of image maps                                                                                      |
| QW-WCAG-T2           | [H39](https://www.w3.org/WAI/WCAG21/Techniques/html/H39)                                                                                                                | Using caption elements to associate data table captions with data tables                                                                             |
| QW-WCAG-T3           | [H71](https://www.w3.org/WAI/WCAG21/Techniques/html/H71)                                                                                                                | Providing a description for groups of form controls using fieldset and legend elements                                                               |
| QW-WCAG-T4           | [H73](https://www.w3.org/WAI/WCAG21/Techniques/html/H73)                                                                                                                | Using the summary attribute of the table element to give an overview of data tables                                                                  |
| QW-WCAG-T5           | [H36](https://www.w3.org/WAI/WCAG21/Techniques/html/H36)                                                                                                                | Using alt attributes on images used as submit buttons                                                                                                |
| QW-WCAG-T6           | [SCR20](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR20)                                                                                              | Using both keyboard and other device-specific functions                                                                                              |
| QW-WCAG-T7           | [H28](https://www.w3.org/WAI/WCAG21/Techniques/html/H28)                                                                                                                | Providing definitions for abbreviations by using the abbr element                                                                                    |
| QW-WCAG-T8           | [F30](https://www.w3.org/WAI/WCAG21/Techniques/failures/F30)                                                                                                            | Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives                                                |
| QW-WCAG-T9           | [G141](https://www.w3.org/WAI/WCAG21/Techniques/general/G141)                                                                                                           | Organizing a page using headings                                                                                                                     |
| QW-WCAG-T10          | [H2](https://www.w3.org/WAI/WCAG21/Techniques/html/H2)                                                                                                                  | Combining adjacent image and text links for the same resource                                                                                        |
| QW-WCAG-T11          | [H35](https://www.w3.org/WAI/WCAG21/Techniques/html/H35)                                                                                                                | Providing text alternatives on applet elements                                                                                                       |
| QW-WCAG-T12          | [F46](https://www.w3.org/WAI/WCAG21/Techniques/failures/F46)                                                                                                            | Failure of Success Criterion 1.3.1 due to using th elements, caption elements, or non-empty summary attributes in layout tables                      |
| QW-WCAG-T13          | [F47](https://www.w3.org/WAI/WCAG21/Techniques/failures/F47)                                                                                                            | Failure of Success Criterion 2.2.2 due to using the blink element                                                                                    |
| QW-WCAG-T14          | [H43](https://www.w3.org/WAI/WCAG21/Techniques/html/H43)                                                                                                                | Using id and headers attributes to associate data cells with header cells in data tables                                                             |
| QW-WCAG-T15          | [H59](https://www.w3.org/WAI/WCAG21/Techniques/html/H59)                                                                                                                | Using the link element and navigation tools                                                                                                          |
| QW-WCAG-T16          | [H88](https://www.w3.org/WAI/WCAG21/Techniques/html/H88)                                                                                                                | Using HTML according to spec                                                                                                                         |
| QW-WCAG-T17          | [G162](https://www.w3.org/WAI/WCAG21/Techniques/general/G162)                                                                                                           | Positioning labels to maximize predictability of relationships                                                                                       |
| QW-WCAG-T18          | [H51](https://www.w3.org/WAI/WCAG21/Techniques/html/H51)                                                                                                                | Using table markup to present tabular information                                                                                                    |
| QW-WCAG-T19          | [H32](https://www.w3.org/WAI/WCAG21/Techniques/html/H32)                                                                                                                | Providing submit buttons                                                                                                                             |
| QW-WCAG-T20          | [H33](https://www.w3.org/WAI/WCAG21/Techniques/html/H33)                                                                                                                | Supplementing link text with the title attribute                                                                                                     |
| QW-WCAG-T21          | [F89](https://www.w3.org/WAI/WCAG21/Techniques/failures/F89)                                                                                                            | Failure of Success Criteria 2.4.4, 2.4.9 and 4.1.2 due to not providing an accessible name for an image which is the only content in a link          |
| QW-WCAG-T22          | [F52](https://www.w3.org/WAI/WCAG21/Techniques/failures/F52)                                                                                                            | Failure of Success Criterion 3.2.1 and 3.2.5 due to opening a new window as soon as a new page is loaded                                             |
| QW-WCAG-T23          | [G1](https://www.w3.org/WAI/WCAG21/Techniques/general/G1)                                                                                                               | Adding a link at the top of each page that goes directly to the main content area                                                                    |
| QW-WCAG-T24          | [F55](https://www.w3.org/WAI/WCAG21/Techniques/failures/F55)                                                                                                            | Failure of Success Criteria 2.1.1, 2.4.7, and 3.2.1 due to using script to remove focus when focus is received                                       |
| QW-WCAG-T25          | [H63](https://www.w3.org/WAI/WCAG21/Techniques/html/H63)                                                                                                                | Using the scope attribute to associate header cells and data cells in data tables                                                                    |
| QW-WCAG-T26          | [F59](https://www.w3.org/WAI/WCAG21/Techniques/failures/F59)                                                                                                            | Failure of Success Criterion 4.1.2 due to using script to make div or span a user interface control in HTML without providing a role for the control |
| QW-WCAG-T27          | [F88](https://www.w3.org/WAI/WCAG21/Techniques/failures/F88)                                                                                                            | Failure of Success Criterion 1.4.8 due to using text that is justified (aligned to both the left and the right margins)                              |
| QW-WCAG-T28          | [C12](https://www.w3.org/WAI/WCAG21/Techniques/css/C12) [C13](https://www.w3.org/WAI/WCAG21/Techniques/css/C13) [C14](https://www.w3.org/WAI/WCAG21/Techniques/css/C14) | Using `percent, em, names` for font sizes                                                                                                            |
| QW-WCAG-T29          | [C19](https://www.w3.org/WAI/WCAG21/Techniques/css/C19)                                                                                                                 | Specifying alignment either to the left or right in CSS                                                                                              |
| QW-WCAG-T30          | [F4](https://www.w3.org/WAI/WCAG21/Techniques/failures/F4)                                                                                                              | Failure of Success Criterion 2.2.2 due to using text-decoration:blink without a mechanism to stop it in less than five seconds                       |
| QW-WCAG-T31          | [F24](https://www.w3.org/WAI/WCAG21/Techniques/failures/F24)                                                                                                            | Failure of Success Criterion 1.4.3, 1.4.6 and 1.4.8 due to specifying foreground colors without specifying background colors or vice versa           |
| QW-WCAG-T32          | [H48](https://www.w3.org/WAI/WCAG21/Techniques/html/H48)                                                                                                                | Using ol, ul and dl for lists or groups of links                                                                                                     |

# License

ISC
