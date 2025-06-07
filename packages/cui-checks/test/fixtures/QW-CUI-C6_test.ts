export default [
	{
	  code: `<!DOCTYPE html>
			  <html lang="pt-PT">
			  <body>
				<h1>Teste em português passa</h1>
				<button class="mic" id="mic" aria-label="microphone"></button>
				<div qw-cui-question="1" class="question">
				   <p>Podes me ajudar com as promoções deste dia ?</p>
				</div>
				<div qw-cui-answer="1" class="answer">
				   <p>Hoje existem bastantes promoções, o bacalhau está em desconto e os ovos da pascoa tambéme estão!</p>
				</div>
				<div qw-cui-question="2"  class="question">
				   <p>Quanto custa um bolo?</p>
				</div>
				<div qw-cui-answer="2" class="answer" qw-currency="2 euros"> 
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
		<html lang="pt-PT">
		<body>
		  <h1>Teste em português passa</h1>
		  <button class="mic" id="mic" aria-label="microphone"></button>
		  <div qw-cui-question="1" class="question">
			 <p>Podes me ajudar com as promoções deste dia ?</p>
		  </div>
		  <div qw-cui-answer="1" class="answer">
			 <p>Hoje existem bastantes promoções, o bacalhau está em desconto e os ovos da pascoa tambéme estão!</p>
		  </div>
		  <div qw-cui-question="2"  class="question">
			 <p>Quanto custa um bolo?</p>
		  </div>
		  <div qw-cui-answer="2" class="answer" qw-currency="2 dollars"> 
			 <p>Um bolo custa 2 dollars</p>
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
		  QW_CURRENCY: '[qw-currency]'
		},
		locale: 'pt-PT',
		outcome: 'failed'
	  },
  ];
  