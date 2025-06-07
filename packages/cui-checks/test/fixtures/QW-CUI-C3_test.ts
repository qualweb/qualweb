export default [
  {
      code:`<!DOCTYPE html>
<html>
<body>
    <div class="chatbot-container">
        <div class="chatbot-dialog">
            <div class="chatbot-response">
                <p>Olá! Bem-vindo ao nosso assistente de viagens. Como posso ajudar-te hoje?</p>
            </div>
            <div class="client-message">
                <p>Qual a próxima viagem em promoção?.</p>
            </div>
             <div class="chatbot-response" data-qw-date="5 de fevereiro de 2025">
                <p>A próxima viagem em promoção é em 5 de fevereiro de 2025 com destino a Dubai.</p>
            </div>
        </div>
        <input class="chatbot-input" type="text" placeholder="Digite sua mensagem...">
    </div>
</body>
</html>`,
    selectors: {
      QW_CC_WINDOW: 'body',
      QW_CC_DIALOG: 'div[class="chatbot-dialog"]',
      QW_CC_MESSAGES: 'div[class="chatbot-response"]',
      QW_CC_MIC: 'null',
      QW_CC_INPUT: 'input',
      QW_DATE: '[data-qw-date]'
    },
	locale: 'pt-PT',
    outcome: 'passed'
  },
    {
      code:`<!DOCTYPE html>
<html>
<body>
    <div class="chatbot-container">
        <div class="chatbot-dialog">
            <div class="chatbot-response">
                <p>Olá! Bem-vindo ao nosso assistente de viagens. Como posso ajudar-te hoje?</p>
            </div>
            <div class="client-message">
                <p>Qual a próxima viagem em promoção?.</p>
            </div>
             <div class="chatbot-response" data-qw-date="5/04/2025">
               <p>A próxima viagem em promoção é na data 5/04/2025 com destino a Dubai.</p>
            </div>
        </div>
        <input class="chatbot-input" type="text" placeholder="Digite sua mensagem...">
    </div>
</body>
</html>`,
    selectors: {
      QW_CC_WINDOW: 'body',
      QW_CC_DIALOG: 'div[class="chatbot-dialog"]',
      QW_CC_MESSAGES: 'div[class="chatbot-response"]',
      QW_CC_MIC: 'null',
      QW_CC_INPUT: 'input',
      QW_DATE: '[data-qw-date]'
    },
	locale: 'pt-PT',
    outcome: 'passed'
  },
      {
      code:`<!DOCTYPE html>
<html>
<body>
    <div class="chatbot-container">
        <div class="chatbot-dialog">
            <div class="chatbot-response">
                <p>Olá! Bem-vindo ao nosso assistente de viagens. Como posso ajudar-te hoje?</p>
            </div>
            <div class="client-message">
                <p>Qual a próxima viagem em promoção?.</p>
            </div>
             <div class="chatbot-response" data-qw-date="April 5,2025">
               <p>A próxima viagem em promoção é April 5, 2024 com destino a Dubai.</p>
            </div>
        </div>
        <input class="chatbot-input" type="text" placeholder="Digite sua mensagem...">
    </div>
</body>
</html>`,
    selectors: {
      QW_CC_WINDOW: 'body',
      QW_CC_DIALOG: 'div[class="chatbot-dialog"]',
      QW_CC_MESSAGES: 'div[class="chatbot-response"]',
      QW_CC_MIC: 'null',
      QW_CC_INPUT: 'input',
      QW_DATE: '[data-qw-date]'
    },
	locale: 'pt-PT',
    outcome: 'failed'
  },
    {
      code:`<!DOCTYPE html>
<html>
<body>
    <div class="chatbot-container">
        <div class="chatbot-dialog">
            <div class="chatbot-response">
                <p>Olá! Bem-vindo ao nosso assistente de viagens. Como posso ajudar-te hoje?</p>
            </div>
            <div class="client-message">
                <p>Qual a próxima viagem em promoção?.</p>
            </div>
             <div class="chatbot-response" data-qw-date="05/25/2025">
               <p>A próxima viagem em promoção é na data 05/25/2025 com destino a Dubai.</p>
            </div>
        </div>
        <input class="chatbot-input" type="text" placeholder="Digite sua mensagem...">
    </div>
</body>
</html>`,
    selectors: {
      QW_CC_WINDOW: 'body',
      QW_CC_DIALOG: 'div[class="chatbot-dialog"]',
      QW_CC_MESSAGES: 'div[class="chatbot-response"]',
      QW_CC_MIC: 'null',
      QW_CC_INPUT: 'input',
      QW_DATE: '[data-qw-date]'
    },
	locale: 'pt-PT',
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
	  QW_DATE: '[data-qw-date]' 
	  

    },
    locale: 'pt-PT',
    outcome: 'inapplicable'
  },
 

];
