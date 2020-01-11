const constants = require('./constants')
const clone = require("lodash/clone");
const css = require("css");
const htmlparser2 = require("htmlparser2");
const request =require("request");
const stew = new (require('stew-select')).Stew();

async function getDom(browser,url) {
    const page = await browser.newPage();
    const plainStylesheets = {};
    page.on('response', async response => {
        if (response.request().resourceType() === 'stylesheet') {
            const url = response.url();
            const content = await response.text();
            plainStylesheets[url] = content;
        }
    });

    await page.goto(url, {
        waitUntil: ['networkidle2', 'domcontentloaded']
    });

    const stylesheets = await parseStylesheets(plainStylesheets);

    const sourceHtml = await getSourceHTML(url);
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
async function getRequestData(headers) {
    return new Promise((resolve, reject) => {
        request(headers, (error, response, body) => {
            if (error) {
                reject(error);
            }
            else if (!response || response.statusCode !== 200) {
                reject(response.statusCode);
            }
            else {
                resolve({ response, body });
            }
        });
    });
}
async function getSourceHTML(url, options) {
    const headers = {
        'url': url,
        'headers': {
            'User-Agent': options ? options.userAgent ? options.userAgent : options.mobile ? constants.DEFAULT_MOBILE_USER_AGENT : constants.DEFAULT_DESKTOP_USER_AGENT : constants.DEFAULT_DESKTOP_USER_AGENT
        }
    };
    const data = await getRequestData(headers);
    const sourceHTML = data.body.toString().trim();
    const parsedHTML = parseHTML(sourceHTML);
    const elements = stew.select(parsedHTML, '*');
    let title = '';
    const titleElement = stew.select(parsedHTML, 'title');
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

module.exports.getDom = getDom;