const tests = [
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
              <div id="my-div">This is my first element</div>
            </body>
            </html >`,
    outcome: 'passed'
  },
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
              <div id="my-div1">This is my first element</div>
              <div id="my-div2">This is my second element</div>
              <svg id="my-div3">This is my third element</svg>
            </body>
            </html >`,
    outcome: 'passed'
  },
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
              <div id="label">Name</div>
              <div id="label">City</div>
            </body>
            </html >`,
    outcome: 'failed'
  },
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
              <div id="label">Name</div>
              <svg id="label">
                <text x="0" y="15">City</text>
              </svg>
              <input aria-labelledby="label" type="text" name="city" />
            </body>
            </html >`,
    outcome: 'failed'
  }
];
module.exports = { tests };
