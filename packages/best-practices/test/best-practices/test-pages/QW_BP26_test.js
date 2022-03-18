const tests = [
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
              <dl>
                <dt>Coffee</dt>
                <dd>Black hot drink</dd>
                <dt>Milk</dt>
                <dd>White cold drink</dd>
              </dl>
            </body>
            </html >`,
    outcome: 'passed'
  },
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
              <dl>
                <dt>Coffee</dt>
                <dd>Black hot drink</dd>
                <dt>Milk</dt>
                <dd>White cold drink</dd>
                <li>Milk</li>
              </dl>
            </body>
            </html >`,
    outcome: 'failed'
  }
];
module.exports = { tests };
