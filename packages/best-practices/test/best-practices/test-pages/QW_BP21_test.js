const tests = [
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
                <div role="contentinfo">
                <p>This div has role contentinfo</p>
                </div>
            </body>
            </html >`,
    outcome: 'passed'
  },
  {
    code: `<!DOCTYPE html>
            <html lang="en" >
            <body>
                <div role="contentinfo">
                <p>This div has role contentinfo</p>
                </div> 
                <div role="contentinfo">
                <p>This div has role contentinfo</p>
                </div>
            </body>
            </html >`,
    outcome: 'failed'
  }
];
module.exports = { tests };
