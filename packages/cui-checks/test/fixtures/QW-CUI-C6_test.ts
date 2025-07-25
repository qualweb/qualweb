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
				<div qw-cui-answer="1" class="answer" qw-currency> 
				   <p>Um bolo custa 2 euros</p>
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
				<div qw-cui-answer="1" class="answer" qw-currency> 
				   <p>Ao longo da última década, os consumidores europeus têm sentido de forma crescente o
				    impacto da inflação nos seus orçamentos familiares. Os preços dos bens essenciais — desde 
					alimentos a produtos de higiene — sofreram aumentos consideráveis, pressionando os agregados 
					familiares e obrigando muitos cidadãos a reverem os seus hábitos de consumo. Um exemplo prático 
					desta realidade pode ser observado no preço de um simples artigo de consumo diário: o litro de
					 azeite virgem extra, que em 2019 custava, em média, 3,20 €</p>
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
				<div qw-cui-answer="1" class="answer" qw-currency> 
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
		QW_QUESTIONS: '[qw-cui-question]',
		QW_CURRENCY: '[qw-currency]',
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
				<div qw-cui-answer="1" class="answer" qw-currency> 
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
		QW_QUESTIONS: '[qw-cui-question]',
		QW_CURRENCY: '[qw-currency]',
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
				<div qw-cui-answer="1" class="answer" qw-currency> 
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
		QW_QUESTIONS: '[qw-cui-question]',
		QW_CURRENCY: '[qw-currency]',
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
				<div qw-cui-answer="1" class="answer" qw-currency> 
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
		QW_QUESTIONS: '[qw-cui-question]',
		QW_CURRENCY: '[qw-currency]',
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
				<div qw-cui-answer="1" class="answer" qw-currency> 
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
		QW_QUESTIONS: '[qw-cui-question]',
		QW_CURRENCY: '[qw-currency]',
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
				<div qw-cui-answer="1" class="answer" qw-currency> 
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
		QW_QUESTIONS: '[qw-cui-question]',
		QW_CURRENCY: '[qw-currency]',
	  },
	  locale: 'en-US',
	  outcome: 'inapplicable'
	},
  ];
  