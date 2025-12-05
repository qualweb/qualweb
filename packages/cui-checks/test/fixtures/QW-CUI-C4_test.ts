export default [
	{
	  code: `<!DOCTYPE html>
			  <html>
			  <body>
				<h1>As nuvens fofas flutuavam preguiçosamente pelo céu azul brilhante.	</h1>
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
	  locale: 'pt-PT',
	  outcome: 'passed'
	},
		{
	  code: `<!DOCTYPE html>
			  <html>
			  <body>
				<h1></h1>
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
	  locale: 'pt-PT',
	  outcome: 'inapplicable'
	},
	{
	  code: `<!DOCTYPE html>
			  <html>
			  <body>
				<h1>Olá</h1>
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
	  locale: 'pt-PT',
	  outcome: 'passed'
	},
		{
	  code: `<!DOCTYPE html>
			  <html>
			  <body>
				<h1>Vou ás compras na Worten.</h1>
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
	  locale: 'pt-PT',
	  outcome: 'passed'
	},
	{
	  code: `<!DOCTYPE html>
			  <html >
			  <body>
				<h1>The fluffy clouds drifted lazily across the bright blue sky.</h1>
			  </body>
			  </html >`,
	  selectors: {
		QW_CC_WINDOW: 'html',
		QW_CC_DIALOG: 'body',
		QW_CC_MESSAGES: 'h1',
		QW_CC_MIC: 'null',
		QW_CC_INPUT: 'h1'
  
	  },
	  locale: 'pt-PT',
	  outcome: 'failed'
	}
  ];
  