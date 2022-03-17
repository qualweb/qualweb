const tests = [
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
                <div role="main">
                <p>This div has role main</p>
                </div>
            </body>
            </html >`,
    outcome: 'passed'
  },
  {
    code: `<!DOCTYPE html>
            <html lang="en" >
            <body>
                <div role="main">
                <p>This div has role main</p>
                </div>
                <div role="main">
                <p>This div has role main</p>
                </div>
            </body>
            </html >`,
    outcome: 'failed'
  }
];
module.exports = { tests };
