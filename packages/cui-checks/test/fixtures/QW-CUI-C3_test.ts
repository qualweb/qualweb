export default [
     {
      code:`<!DOCTYPE html>
<html>
<body>
    <div class="chatbot-container">
        <div class="chatbot-dialog">
            <div class="client-message">
                <p>Qual é a data de nascimento de Albert Einstein?</p>
            </div>
             <div class="chatbot-response" qw-cui-date>
                <p>Albert Einstein nasceu em 1 de março de 1879. Copied</p>
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
             <div class="chatbot-response" qw-cui-date>
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
             <div class="chatbot-response" qw-cui-date>
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
             <div class="chatbot-response" qw-cui-date>
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
             <div class="chatbot-response" qw-cui-date>
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
    },
    locale: 'pt-PT',
    outcome: 'inapplicable'
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
             <div class="chatbot-response" qw-cui-date>
                <p> Feriado nacional: 25 dezembro </p>
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
    },
	locale: 'pt-PT',
    outcome: 'failed'
  },   {
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
             <div class="chatbot-response" qw-cui-date>
                <p> Feriado nacional: dezembro de 2025 </p>
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
             <div class="chatbot-response" qw-cui-date>
                <p> Feriado nacional: 16 de dezembro </p>
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
    },
	locale: 'pt-PT',
    outcome: 'passed'
  }, {
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
             <div class="chatbot-response" qw-cui-date>
                <p>hellothe date is  1st of January 2023 </p>
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
    },
	locale: 'en-US',
    outcome: 'passed'
  },
    {
      code:`<!DOCTYPE html>
<html>
<body>
    <div class="chatbot-container">
        <div class="chatbot-dialog">

            <div class="client-message">
                <p>What is next holiday date?.</p>
            </div>
             <div class="chatbot-response" qw-cui-date>
                <p>  Next holiday is March 25, 2023 </p>
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
    },
	locale: 'en-US',
    outcome: 'passed'
  },  
      {
      code:`<!DOCTYPE html>
<html>
<body>
    <div class="chatbot-container">
        <div class="chatbot-dialog">

            <div class="client-message">
                <p>What is next holiday date?.</p>
            </div>
             <div class="chatbot-response" qw-cui-date>
                <p>  Next holiday is 15th March </p>
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
    },
	locale: 'en-US',
    outcome: 'passed'
  },  
     {
      code:`<!DOCTYPE html>
<html>
<body>
    <div class="chatbot-container">
        <div class="chatbot-dialog">
            <div class="client-message">
                <p>Qual a próxima viagem em promoção?.</p>
            </div>
             <div class="chatbot-response" qw-cui-date>
                <p>A data exata para a inauguração das iluminações natalinas nas principais cidades de Portugal não é mencionada. No entanto, as fontes indicam que os mercados de Natal e eventos festivos começam geralmente no final de novembro ou início de dezembro. As decorações natalinas são inauguradas em diferentes datas dependendo da cidade, mas a maioria delas ocorre entre o dia 1º e o dia 15 de dezembro.

Aqui estão algumas das principais cidades portuguesas com suas respectivas datas aproximadas para as iluminações natalinas:
Lisboa: 25 de novembro
Porto: 15 de novembro
Coimbra: 1 de dezembro
É importante notar que essas datas podem variar dependendo da cidade e do evento específico. É recomendável verificar as fontes locais para obter informações atualizadas sobre os eventos natalinos em cada localidade.</p>
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
    },
	locale: 'pt-PT',
    outcome: 'passed'
  },

];
