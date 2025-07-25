export default [
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
              <h1>Teste</h1>
              <button class="mic" id="mic" aria-label="microphone"></button>
            </body>
            </html >`,
    selectors: {
      QW_CC_WINDOW: 'html',
      QW_CC_DIALOG: 'body',
      QW_CC_MESSAGES: 'h1',
      QW_CC_MIC: 'button.mic',
      QW_CC_INPUT: 'h1'

    },
    locale:'pt-PT',
    outcome: 'passed'
  },
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
              <h1>Teste</h1>
            </body>
            </html >`,
    selectors: {
      QW_CC_WINDOW: 'html',
      QW_CC_DIALOG: 'body',
      QW_CC_MESSAGES: 'h1',
      QW_CC_MIC: 'null',
      QW_CC_INPUT: 'h1'

    },
    locale:'pt-PT',
    outcome: 'warning'
  }
];
