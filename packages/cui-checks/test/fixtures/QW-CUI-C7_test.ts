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
				   <p>Qual a distância da tua casa à do teu amigo?</p>
				</div>
				<div qw-cui-answer="1" class="answer" qw-unit> 
				   <p>A distância até a casa do meu amigo é por volta de 600 metros da minha casa.</p>
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
		QW_QUESTIONS: '[qw-cui-question]',
		QW_CURRENCY: '[qw-currency]',
		QW_UNIT: '[qw-unit]',
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
				   <p>How far away are you from me?</p>
				</div>
				<div qw-cui-answer="1" class="answer" qw-unit> 
				   <p>I am about 16 miles east from you.</p>
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
		QW_QUESTIONS: '[qw-cui-question]',
		QW_CURRENCY: '[qw-currency]',
		QW_UNIT: '[qw-unit]',
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
				   <p>Qual a dimensão da tua casa?</p>
				</div>
				<div qw-cui-answer="1" class="answer" qw-unit> 
				   <p>Por volta de 100 metros quadrados.</p>
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
		QW_QUESTIONS: '[qw-cui-question]',
		QW_CURRENCY: '[qw-currency]',
		QW_UNIT: '[qw-unit]',
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
				   <p>Can you tell me the dimensions of your house?</p>
				</div>
				<div qw-cui-answer="1" class="answer" qw-unit> 
				   <p>About 100 square meters, but i did not measure with precision.</p>
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
		QW_QUESTIONS: '[qw-cui-question]',
		QW_CURRENCY: '[qw-currency]',
		QW_UNIT: '[qw-unit]',
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
				   <p>Qual a distância de tua casa ao local onde estamos?</p>
				</div>
				<div qw-cui-answer="1" class="answer" qw-unit> 
				   <p>Por volta de 3 square meters.</p>
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
		QW_QUESTIONS: '[qw-cui-question]',
		QW_CURRENCY: '[qw-currency]',
		QW_UNIT: '[qw-unit]',
	  },
	  locale: 'pt-PT',
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
				   <p>What is the max distance you are able to run?</p>
				</div>
				<div qw-cui-answer="1" class="answer" qw-unit> 
				   <p>About 100 kilometros</p>
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
		QW_QUESTIONS: '[qw-cui-question]',
		QW_CURRENCY: '[qw-currency]',
		QW_UNIT: '[qw-unit]',
	  },
	  locale: 'en-US',
	  outcome: 'failed'
	},
	
  ];
  