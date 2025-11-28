export default [
	{
	  code: `<!DOCTYPE html>
			  <html lang="">
			  <head>
			  	<meta charset="UTF-8">
			  </head>
			  <body>
				<button class="mic" id="mic" aria-label="microphone"></button>
				<div qw-cui-question="1"  class="question">
				   <p>Quanto custa um bolo?</p>
				</div>
				<div qw-cui-response="1" class="answer" qw-cui-currency> 
				   <p>Um bolo custa 2 dollars na américa e 2 euros em Portugal</p>
				</div>
			  <input type="text" id="input" aria-label="input" />
			  <button class="mic" id="mic" aria-label="microphone"></button>
			  </body>
			  </html >`,
	  selectors: {
		QW_CC_WINDOW: 'html',
		QW_CC_DIALOG: 'body',
		QW_CC_MESSAGES: 'div[class="question"]',
		QW_CC_MIC: 'button[class="mic"]',
		QW_CC_INPUT: 'input',
		
	  },
	  locale: 'pt-PT',
	  outcome: 'passed'
	},
	{
	  code: `<!DOCTYPE html>
			  <html lang="">
			  <head>
			  	<meta charset="UTF-8">
			  </head>
			  <body>
				<button class="mic" id="mic" aria-label="microphone"></button>
				<div qw-cui-question="1"  class="question">
				   <p>Quanto custa um bolo?</p>
				</div>
				<div qw-cui-response="1" class="answer" qw-cui-currency> 
				   <p>Um bolo custa 1500 EUROS </p>
				</div>
			  <input type="text" id="input" aria-label="input" />
			  <button class="mic" id="mic" aria-label="microphone"></button>
			  </body>
			  </html >`,
	  selectors: {
		QW_CC_WINDOW: 'html',
		QW_CC_DIALOG: 'body',
		QW_CC_MESSAGES: 'div[class="question"]',
		QW_CC_MIC: 'button[class="mic"]',
		QW_CC_INPUT: 'input',
		
	  },
	  locale: 'pt-PT',
	  outcome: 'passed'
	},
		{
	  code: `<!DOCTYPE html>
			  <html lang="">
			  <head>
			  	<meta charset="UTF-8">
			  </head>
			  <body>
				<button class="mic" id="mic" aria-label="microphone"></button>
				<div qw-cui-question="1"  class="question">
				   <p>How much does this product cost?</p>
				</div>
				<div qw-cui-response="1" class="answer" qw-cui-currency> 
				   <p>This product costs 200 dollars</p>
				</div>
			  <input type="text" id="input" aria-label="input" />
			  <button class="mic" id="mic" aria-label="microphone"></button>
			  </body>
			  </html >`,
	  selectors: {
		QW_CC_WINDOW: 'html',
		QW_CC_DIALOG: 'body',
		QW_CC_MESSAGES: 'div[class="question"]',
		QW_CC_MIC: 'button[class="mic"]',
		QW_CC_INPUT: 'input',
		
	  },
	  locale: 'en-US',
	  outcome: 'passed'
	},
		{
	  code: `<!DOCTYPE html>
			  <html lang="">
			 <head>
			  	<meta charset="UTF-8">
			  </head>
			  <body>
				<button class="mic" id="mic" aria-label="microphone"></button>
				<div qw-cui-question="1"  class="question">
				   <p>How much does this product cost?</p>
				</div>
				<div qw-cui-response="1" class="answer" qw-cui-currency> 
				   <p>This product costs $200</p>
				</div>
			  <input type="text" id="input" aria-label="input" />
			  <button class="mic" id="mic" aria-label="microphone"></button>
			  </body>
			  </html >`,
	  selectors: {
		QW_CC_WINDOW: 'html',
		QW_CC_DIALOG: 'body',
		QW_CC_MESSAGES: 'div[class="question"]',
		QW_CC_MIC: 'button[class="mic"]',
		QW_CC_INPUT: 'input',
		
	  },
	  locale: 'en-US',
	  outcome: 'passed'
	},
			{
	  code: `<!DOCTYPE html>
			  <html lang="">
			  <head>
			  <meta charset="UTF-8">
			  </head>
			  <body>
				<button class="mic" id="mic" aria-label="microphone"></button>
				<div qw-cui-question="1"  class="question">
				   <p>How much does this product cost?</p>
				</div>
				<div qw-cui-response="1" class="answer" qw-cui-currency> 
				   <p>This product costs €200</p>
				</div>
			  <input type="text" id="input" aria-label="input" />
			  <button class="mic" id="mic" aria-label="microphone"></button>
			  </body>
			  </html >`,
	  selectors: {
		QW_CC_WINDOW: 'html',
		QW_CC_DIALOG: 'body',
		QW_CC_MESSAGES: 'div[class="question"]',
		QW_CC_MIC: 'button[class="mic"]',
		QW_CC_INPUT: 'input',
		
	  },
	  locale: 'en-US',
	  outcome: 'failed'
	},
	{
	  code: `<!DOCTYPE html>
			  <html lang="">
			  <head>
			  	<meta charset="UTF-8">
			  </head>
			  <body>
				<button class="mic" id="mic" aria-label="microphone"></button>
				<div qw-cui-question="1"  class="question">
				   <p>How much does this product cost?</p>
				</div>
				<div qw-cui-response="1" class="answer" qw-cui-currency> 
				   <p>This product costs 200 euros</p>
				</div>
			  <input type="text" id="input" aria-label="input" />
			  <button class="mic" id="mic" aria-label="microphone"></button>
			  </body>
			  </html >`,
	  selectors: {
		QW_CC_WINDOW: 'html',
		QW_CC_DIALOG: 'body',
		QW_CC_MESSAGES: 'div[class="question"]',
		QW_CC_MIC: 'button[class="mic"]',
		QW_CC_INPUT: 'input',
		
	  },
	  locale: 'en-US',
	  outcome: 'failed'
	},
	{
	  code: `<!DOCTYPE html>
			  <html lang="">
			  <head>
			  	<meta charset="UTF-8">
			  </head>
			  <body>
				<button class="mic" id="mic" aria-label="microphone"></button>
				<div qw-cui-question="1"  class="question">
				   <p>How much does this product cost?</p>
				</div>
				<div qw-cui-response="1" class="answer" qw-cui-currency> 
				   <p>I have to ask how much this product cost to give you a price</p>
				</div>
			  <input type="text" id="input" aria-label="input" />
			  <button class="mic" id="mic" aria-label="microphone"></button>
			  </body>
			  </html >`,
	  selectors: {
		QW_CC_WINDOW: 'html',
		QW_CC_DIALOG: 'body',
		QW_CC_MESSAGES: 'div[class="question"]',
		QW_CC_MIC: 'button[class="mic"]',
		QW_CC_INPUT: 'input',
		
	  },
	  locale: 'en-US',
	  outcome: 'inapplicable'
	},
  ];
  