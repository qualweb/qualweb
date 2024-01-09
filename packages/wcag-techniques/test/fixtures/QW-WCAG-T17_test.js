const tests = [
  {
    code: `
      <html>
        <head>
          <title><span>Hello world</span></title>
        </head
        <body>
          <div>
            <form>
              <span>
                <input id="input" type="checkbox">
              </span>
              <div>
                <label for="input">
                  This is a checkbox
                </label>
              </div>
              <br>
              <label>
                Text input
                <input types="text">
              </label>
              <br>
              <label for="input2">
                This is a number input
              </label>
              <input id="input2" type="number">
              <br>
              <input id="input3" type="radio">
              <label for="input3" style="visibility: hidden;">
                Invisible label
              </label>
              <br>
              <label>
                <input type="text">
              </label>
              <br>
              <label for="input4"></label>
              <div>
                <input id="input4" type="email">
              </div>
            </form>
          </div>
        </body>
      </html>
    `,
    outcome: 'failed',
  },
];

module.exports = { tests };