const constants = require('./constants')
const clone = require("lodash/clone");
const css = require("css");
const htmlparser2 = require("htmlparser2");
const fetch = require("node-fetch");
const CSSselect = require('css-select');

async function getDom(browser,url, viewport) {
    const page = await browser.newPage();

    //await page.setBypassCSP(true);

    if (viewport) {
        await page.setViewport(viewport);
    }

    const plainStylesheets = {};
    page.on('response', async response => {
        if (response.request().resourceType() === 'stylesheet') {
            const url = response.url();
            const content = await response.text();
            plainStylesheets[url] = content;
        }
    });

    await page.goto(url, {
        waitUntil: 'networkidle'
    });

    
    const sourceHtml = await getSourceHTML(url);
    //let stylesheets = [];

    let styles = CSSselect('style', sourceHtml.html.parsed);
    for (let i = 0; i < styles.length; i++) {
        if (styles[i]['children'][0]) {
            plainStylesheets['html' + i] = styles[i]['children'][0]['data'];
        }
    }

    const stylesheets = await parseStylesheets(plainStylesheets);

    const mappedDOM = {};
    const cookedStew = CSSselect('*', sourceHtml.html.parsed);
    if (cookedStew.length > 0)
        for (const item of cookedStew || [])
            mappedDOM[item['_node_id']] = item;

    await mapCSSElements(sourceHtml.html.parsed, stylesheets, mappedDOM);

    return { sourceHtml, page, stylesheets };
}

async function parseStylesheets(plainStylesheets) {

    const stylesheets = new Array();
    for (const file in plainStylesheets || {}) {
        const stylesheet = { file, content: {} };
        if (stylesheet.content) {
            stylesheet.content.plain = plainStylesheets[file];
            stylesheet.content.parsed = css.parse(plainStylesheets[file], { silent: true });
            stylesheets.push(clone(stylesheet));
        }
    }
    return stylesheets;
}


async function getTestCases() {
  const response = await fetch('https://act-rules.github.io/testcases.json');
  return await response.json();
}

async function getSourceHTML(url, options) {
    const fetchOptions = {
        'headers': {
            'User-Agent': options ? options.userAgent ? options.userAgent : options.mobile ? constants.DEFAULT_MOBILE_USER_AGENT : constants.DEFAULT_DESKTOP_USER_AGENT : constants.DEFAULT_DESKTOP_USER_AGENT
        }
    };
    const response = await fetch(url, fetchOptions);
    //const data = await response.text();
    const sourceHTML = (await response.text()).trim();
    const parsedHTML = parseHTML(sourceHTML);
    const elements = CSSselect('*', parsedHTML);
    let title = '';
    const titleElement = CSSselect('title', parsedHTML);
    if (titleElement.length > 0) {
        title = htmlparser2.DomUtils.getText(titleElement[0]);
    }
    const source = {
        html: {
            plain: sourceHTML,
            parsed: parsedHTML
        },
        elementCount: elements.length,
        title: title !== '' ? title : undefined
    };
    return source;
}
function parseHTML(html) {
    let parsed = undefined;
    const handler = new htmlparser2.DomHandler((error, dom) => {
        if (error) {
            throw error;
        }
        else {
            parsed = dom;
        }
    });
    const parser = new htmlparser2.Parser(handler);
    parser.write(html.replace(/(\r\n|\n|\r|\t)/gm, ''));
    parser.end();
    if (!parsed) {
        throw new Error('Failed to parse html');
    }
    return parsed;
}

async function mapCSSElements(dom, styleSheets, mappedDOM) {
  for (const styleSheet of styleSheets || [])
      if (styleSheet.content && styleSheet.content.plain)
          analyseAST(dom, styleSheet.content.parsed, undefined, mappedDOM);
}
function analyseAST(dom, cssObject, parentType, mappedDOM) {
  if (cssObject === undefined ||
      cssObject['type'] === 'comment' ||
      cssObject['type'] === 'keyframes' ||
      cssObject['type'] === 'import') {
      return;
  }
  if (cssObject['type'] === 'rule' || cssObject['type'] === 'font-face' || cssObject['type'] === 'page') {
      loopDeclarations(dom, cssObject, parentType, mappedDOM);
  }
  else {
      if (cssObject['type'] === 'stylesheet') {
          for (const key of cssObject['stylesheet']['rules'] || []) {
              analyseAST(dom, key, undefined, mappedDOM);
          }
      }
      else {
          for (const key of cssObject['rules'] || []) {
              if (cssObject['type'] && cssObject['type'] === 'media')
                  analyseAST(dom, key, cssObject[cssObject['type']], mappedDOM);
              else
                  analyseAST(dom, key, undefined, mappedDOM);
          }
      }
  }
}
function loopDeclarations(dom, cssObject, parentType, mappedDOM) {
  let declarations = cssObject['declarations'];
  if (declarations && cssObject['selectors'] && !cssObject['selectors'].toString().includes('@-ms-viewport') && !(cssObject['selectors'].toString() === ":focus")) {
      try {
          let stewResult = CSSselect(cssObject['selectors'].toString(), dom);
          if (stewResult.length > 0) {
              for (const item of stewResult || []) {
                  for (const declaration of declarations || []) {
                      if (declaration['property'] && declaration['value']) {
                          if (!item['attribs'])
                              item['attribs']={}
                          if (!item['attribs']['css'])
                              item['attribs']['css'] = {};
                          if (item['attribs']['css'][declaration['property']] && item['attribs']['css'][declaration['property']]['value'] &&
                              item['attribs']['css'][declaration['property']]['value'].includes("!important")) {
                              continue;
                          }
                          else {
                              item['attribs']['css'][declaration['property']] = {};
                              if (parentType) {
                                  item['attribs']['css'][declaration['property']]['media'] = parentType;
                              }
                              item['attribs']['css'][declaration['property']]['value'] = declaration['value'];
                          }
                          mappedDOM[item['_node_id']] = item;
                      }
                  }
              }
          }
      }
      catch (err) {
      }
  }
}

module.exports.getDom = getDom;
module.exports.getTestCases = getTestCases;