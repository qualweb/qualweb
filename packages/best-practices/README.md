# QualWeb best practices

## How to install

```shell
  $ npm i @qualweb/best-practices --save
```

## How to run

### Additional packages

```shell
  $ npm i puppeteer css --save
```

```javascript
  'use strict';

  const puppeteer = require('puppeteer');
  const css = require('css');
  const { BestPractices } = require('@qualweb/best-practices');

  async function parseStylesheets(plainStylesheets) {
    const stylesheets = new Array();
    for (const file in plainStylesheets || {}){
      const stylesheet = { file, content: {} };
      if (stylesheet.content) {
        stylesheet.content.plain = plainStylesheets[file];
        stylesheet.content.parsed = css.parse(plainStylesheets[file], { silent: true }); //doesn't throw errors
        stylesheets.push(stylesheet);
      }
    }

    return stylesheets;
  }

  (async () => {
    const browser = await puppeteer.launch();
    const page = await this.browser.newPage();

    const plainStylesheets: any = {};
    page.on('response', async response => {
      if(response.request().resourceType() === 'stylesheet') {
        const url = response.url();
        const content = await response.text();
        plainStylesheets[url] = content;
      }
    });

    await page.goto('https://act-rules.github.io/pages/about/', {
      waitUntil: ['networkidle2', 'domcontentloaded']
    });
    
    const stylesheets = await parseStylesheets(plainStylesheets);

    const bestPractices = new BestPractices();

    const report = await bestPractices.execute(page, stylesheets);

    console.log(report);
  })();
```

# License

ISC