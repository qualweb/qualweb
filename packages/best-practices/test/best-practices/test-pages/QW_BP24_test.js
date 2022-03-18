const tests = [
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
              <ul>
                <li>Coffee</li>
                <li>Tea</li>
                <li>Milk</li>
              </ul>
            </body>
            </html >`,
    outcome: 'passed'
  },
  {
    code: `<!DOCTYPE html>
            <html lang="en" >
            <body>
              <ul>
                <p>Coffee</p>
                <li>Tea</li>
                <li>Milk</li>
              </ul>
            </body>
            </html >`,
    outcome: 'failed'
  }
];
module.exports = { tests };
