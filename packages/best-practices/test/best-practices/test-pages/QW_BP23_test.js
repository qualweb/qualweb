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
              <div>
                <li>Coffee</li>
                <li>Tea</li>
                <li>Milk</li>
              </div> 
            </body>
            </html >`,
    outcome: 'failed'
  }
];
module.exports = { tests };
