const tests = [
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
                <div role="banner">
                <p>This banner content is not within another landmark</p>
                </div>
            </body>
            </html >`,
    outcome: 'passed'
  },
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
                <div role="navigation">
                <div role="banner">
                <p>This banner content is not within another landmark</p>
                </div>
                </div>
            </body>
            </html >`,
    outcome: 'failed'
  }
];
module.exports =  { tests };
