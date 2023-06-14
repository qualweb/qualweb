const tests = [
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
              <h1>Teste</h1>
            </body>
            </html >`,
    outcome: 'passed'
  },
  {
    code: `<!DOCTYPE html>
            <html lang="en" >
            <body>
            <span>Teste</span>
            </body>
            </html >`,
    outcome: 'failed'
  }
];
module.exports = { tests };
