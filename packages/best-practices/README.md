# QualWeb best practices

Implementation of accessibility best practices for web pages.

## How to use

**This is an internal module of QualWeb. To use it check either [@qualweb/cli](https://github.com/qualweb/cli) or [@qualweb/core](https://github.com/qualweb/core).**

## How to use

This package is intended to be used with [@qualweb/core](https://github.com/qualweb/core).

Add both packages to your project: 

```bash
npm i --save @qualweb/core @qualweb/best-practices
```

In your own code, pass an instance of the `BestPractices` class to QualWeb's evaluate method:

```typescript
import { BestPractices } from '@qualweb/best-practices';
import { QualWeb } from '@qualweb/core';

async function main() {
  const qw = new QualWeb();

  await qw.start();

  const bpInstance = new BestPractices({
    // Include/exclude specific rules here. Omitting any filters implies *all*
    // rules are included.
    levels: ['A', 'AA'],
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

## Implemented best practices

| QualWeb best practice ID | Related to | Best practice Name |
|---|---|---|
| QW-BP1 | HTML | Using h1-h6 to identify headings |
| QW-BP2 | HTML | Concise images alt text |
| QW-BP3 | HTML | Link element with text content equal to the content of the title attribute |
| QW-BP4 | HTML | Grouped links not within a nav element |
| QW-BP5 | HTML | Using table elements inside other table elements |
| QW-BP6 | HTML | title element is not too long (64 characters) |
| QW-BP7 | HTML | Title element contains ASCII-art |
| QW-BP8 | HTML | Headings with images should have an accessible name |
| QW-BP9 | HTML | Table element without header cells has a caption |
| QW-BP10 | HTML | HTML elements are used to control visual presentation of content |
| QW-BP11 | HTML | Using br to make a list |
| QW-BP12 | HTML | Using scope col and row |
| QW-BP13 | HTML | Using consecutive links with the same href and one contains an image |
| QW-BP14 | CSS | At least one container's width has been specified using values expressed in px |
| QW-BP15 | CSS | At least one width attribute of an HTML element is expressed in absolute values |
| QW-BP17 | HTML | Adding a link at the beginning of a block of repeated content to go to the end of the block |
| QW-BP18 | CSS | Using percentage values in CSS for container sizes |
| QW-BP19 | HTML | Landmark banner is top level |
| QW-BP20 | HTML | Landmark no duplicate banner |
| QW-BP21 | HTML | Landmark no duplicate contentinfo |
| QW-BP22 | HTML | Landmark has one main |
| QW-BP23 | HTML | Listitems are used semantically |
| QW-BP24 | HTML | Lists are used correctly |
| QW-BP25 | HTML | Landmark complementary is top level |
| QW-BP26 | HTML | Landmark contentinfo is top level |
| QW-BP27 | HTML | Landmark main is top level |
| QW-BP28 | HTML | H1 element is used and unique |
| QW-BP29 | HTML | HTML page lang and xml:lang attributes have matching values |

# License

ISC