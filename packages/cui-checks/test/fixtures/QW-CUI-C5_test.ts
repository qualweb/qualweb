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
				   <p>Podes ajudar-me a encontrar um restaurante próximo com boas avaliações e com baixo custo?</p>
				</div>
				<div qw-cui-answer="2" class="answer">
				   <p>Claro! Podes dizer-me em que cidade ou zona estás? Assim consigo encontrar restaurantes próximos com boas avaliações para ti.</p>
				</div>
				<div qw-cui-question="3" class="question">
				   <p>Como posso melhorar a minha produtividade no trabalho de uma forma eficaz?</p>
				</div>
				<div qw-cui-answer="3" class="answer">
				   <p>Uma ótima forma de começares é definir prioridades diárias e usar técnicas como a Pomodoro. Queres que te recomende algumas ferramentas ou apps que ajudam nisso?</p>
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
		QW_QUESTIONS: '[qw-cui-question]'
	  },
	  locale: 'pt-PT',
	  outcome: 'passed'
	},
	{
		code: `<!DOCTYPE html>
				<html >
				<body>
				  <h1>Teste em português passa</h1>
				  <button class="mic" id="mic" aria-label="microphone"></button>
				  <div qw-cui-question="1" class="question">
					 <p>Qual é a capital de Portugal?</p>
				  </div>
				  <div qw-cui-answer="1" class="answer">
					 <p>The capital of Portugal is Lisbon</p>
				  </div>
				  <div qw-cui-question="2"  class="question">
					 <p>Qual é a capital de Espanha?</p>
				  </div>
				  <div qw-cui-answer="2" class="answer">
					 <p>The capital of Spain is Madrid.</p>
				  </div>
				  <div qw-cui-question="3" class="question">
					 <p>Qual é a capital de França?</p>
				  </div>
				  <div qw-cui-answer="3" class="answer">
					 <p>The capital of france is paris.</p>
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
		  QW_QUESTIONS: '[qw-cui-question]'
		},
		locale: 'pt-PT',
		outcome: 'failed'
	  },
	  {
		code: `<!DOCTYPE html>
						<html>
						<body>
							<h1>English test passes</h1>
							<button class="mic" id="mic" aria-label="microphone"></button>
							<div qw-cui-question="1" class="question">
								 <p>Can you help me with today's promotions?</p>
							</div>
							<div qw-cui-answer="1" class="answer">
								 <p>There are many promotions today! Codfish is on sale and Easter eggs are discounted too!</p>
							</div>
							<div qw-cui-question="2" class="question">
								 <p>Can you help me find a nearby restaurant with good reviews and low cost?</p>
							</div>
							<div qw-cui-answer="2" class="answer">
								 <p>Of course! Can you tell me which city or area you're in? That way I can find restaurants with good reviews near you.</p>
							</div>
							<div qw-cui-question="3" class="question">
								 <p>How can I improve my productivity at work effectively?</p>
							</div>
							<div qw-cui-answer="3" class="answer">
								 <p>A great way to start is by setting daily priorities and using techniques like Pomodoro. Would you like me to recommend some tools or apps for that?</p>
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
			QW_QUESTIONS: '[qw-cui-question]'
		},
		locale: 'en-US',
		outcome: 'passed'
	},
	{
		code: `<!DOCTYPE html>
						<html >
						<body>
							<h1>English test fails</h1>
							<button class="mic" id="mic" aria-label="microphone"></button>
							<div qw-cui-question="1" class="question">
								 <p>What is the capital of Portugal?</p>
							</div>
							<div qw-cui-answer="1" class="answer">
								 <p>A capital de Portugal é Lisboa.</p>
							</div>
							<div qw-cui-question="2" class="question">
								 <p>What is the capital of Spain?</p>
							</div>
							<div qw-cui-answer="2" class="answer">
								 <p>A capital de Espanha é Madrid.</p>
							</div>
							<div qw-cui-question="3" class="question">
								 <p>What is the capital of France?</p>
							</div>
							<div qw-cui-answer="3" class="answer">
								 <p>A capital de França é Paris.</p>
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
			QW_QUESTIONS: '[qw-cui-question]'
		},
		locale: 'en-US',
		outcome: 'failed'
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
      QW_CC_DIALOG: '',
      QW_CC_MESSAGES: 'null',
      QW_CC_MIC: 'null',
      QW_CC_INPUT: 'h1',
	  QW_QUESTIONS: '[qw-cui-question]'

    },
	locale: 'pt-PT',
    outcome: 'inapplicable'
  },
  ];
  