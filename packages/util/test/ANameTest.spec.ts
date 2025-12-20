import { expect } from 'chai';
import { usePuppeteer } from './util';

describe('ANameTest', function () {
  this.timeout(30 * 1000); // 30 second timeout for all tests in this suite
  const proxy = usePuppeteer();

  /**
   * Helper function to test accessible name computation
   * @param html - HTML string to test
   * @param elementId - ID of the element to test
   * @param expectedAccessibleName - Expected accessible name
   * @returns true if computed accessible name matches expected name
   */
  async function testAccessibleName(html: string, elementId: string, expectedAccessibleName: string): Promise<boolean> {
    const page = proxy.page;

    await page.setContent(html);

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/__webpack/util.bundle.js')
    });

    const computedName = await page.evaluate((id: string) => {
      const element = document.getElementById(id);
      if (!element) {
        return null;
      }
      const qwElement = (window as any).qwPage.createQWElement(element as HTMLElement);
      return (window as any).AccessibilityUtils.getAccessibleName(qwElement);
    }, elementId);

    return computedName === expectedAccessibleName;
  }

  it('Calculates accessible name from aria-label', async function () {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <button id="test-button" aria-label="Close dialog">X</button>
      </body>
      </html>
    `;

    const result = await testAccessibleName(html, 'test-button', 'Close dialog');
    expect(result).to.be.true;
  });

  it('Calculates accessible name from text content', async function () {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <button id="test-button">Submit Form</button>
      </body>
      </html>
    `;

    const result = await testAccessibleName(html, 'test-button', 'Submit Form');
    expect(result).to.be.true;
  });

  it('Calculates accessible name from aria-labelledby', async function () {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <span id="label-text">User Name</span>
        <input id="test-input" type="text" aria-labelledby="label-text">
      </body>
      </html>
    `;

    const result = await testAccessibleName(html, 'test-input', 'User Name');
    expect(result).to.be.true;
  });

  it('Calculates accessible name from label element', async function () {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <label for="test-input">Email Address</label>
        <input id="test-input" type="email">
      </body>
      </html>
    `;

    const result = await testAccessibleName(html, 'test-input', 'Email Address');
    expect(result).to.be.true;
  });

  it('Calculates accessible name from alt attribute', async function () {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <img id="test-img" src="logo.png" alt="Company Logo">
      </body>
      </html>
    `;

    const result = await testAccessibleName(html, 'test-img', 'Company Logo');
    expect(result).to.be.true;
  });

  it('Calculates accessible name from table caption', async function () {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <table id="test-tbl">
          <caption>November</caption>
          <tr><td>Data 1</td></tr>
          <tr><td>Data 2</td></tr>
        </table>
      </body>
      </html>
    `;

    const result = await testAccessibleName(html, 'test-tbl', 'November');
    expect(result).to.be.true;
  });

  it('Calculates accessible name from table aria-label', async function () {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <table id="test-tbl" aria-label="November">
          <tr><td>Data 1</td></tr>
          <tr><td>Data 2</td></tr>
        </table>
      </body>
      </html>
    `;

    const result = await testAccessibleName(html, 'test-tbl', 'November');
    expect(result).to.be.true;
  });

  it('Calculates accessible name from table aria-labelledby', async function () {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <p id="label-id">November</p>
        <table id="test-tbl" aria-labelledby="label-id">
          <tr><td>Data 1</td></tr>
          <tr><td>Data 2</td></tr>
        </table>
      </body>
      </html>
    `;

    const result = await testAccessibleName(html, 'test-tbl', 'November');
    expect(result).to.be.true;
  });

});
