export default [
  {
    code:`<!DOCTYPE html>
<html>
<body>
    <div class="chatbot-container">
        <div class="chatbot-dialog">
            <div class="chatbot-response">
                <p>Olá! Bem-vindo ao nosso assistente de viagens. Estou aqui para te ajudar a planear as tuas férias, encontrar voos baratos, reservar hotéis e dar dicas sobre os melhores destinos. Podes perguntar o que quiseres, estou aqui para facilitar tudo. Como posso ajudar-te hoje?</p>
            </div>
            <div class="client-message">
                <p>Quero encontrar um voo barato para Lisboa no próximo mês.</p>
            </div>
            <div class="chatbot-response">
                <p>Perfeito! Vou procurar as melhores ofertas de voos para Lisboa no próximo mês e depois apresento-te as opções mais económicas e convenientes. Queres incluir alguma preferência, como horários ou companhias aéreas?</p>
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
      QW_CC_INPUT: 'input'
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
                <p>Olá! Seja muito bem-vindo ao nosso assistente virtual. Estou aqui para ajudá-lo de forma personalizada e eficaz em diversas áreas: desde dúvidas técnicas e explicações sobre serviços contratados, até apoio com documentos, interpretação
                    de faturas, organização pessoal ou até mesmo acompanhamento em tarefas mais complexas, como relatórios ou candidaturas. O meu objetivo é proporcionar uma experiência acessível, confiável e clara, independentemente da complexidade do
                    seu pedido. Pode escrever com toda a liberdade — estou preparado para adaptar a minha linguagem ao seu estilo, seja ele mais informal ou académico. Como posso ajudá-lo hoje?</p>
            </div>
            <div class="client-message">
                <p>Preciso de ajuda para entender esta fatura.</p>
            </div>
            <div class="chatbot-response">
                <p>Claro, compreendo a sua preocupação e estou aqui para o ajudar a analisar detalhadamente a sua fatura, esclarecer qualquer diferença nos valores cobrados e garantir que todas as informações estejam corretas e transparentes.</p>
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
      QW_CC_INPUT: 'input'
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
      QW_CC_INPUT: 'h1'

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
                <p>Olá, tudo bem?</p>
            </div>
            <div class="client-message">
                <p>Olá! Gostava de perceber melhor a última fatura que recebi. Acho que veio com um valor acima do normal.</p>
            </div>
            <div class="chatbot-response">
                <p>Claro.
                </p>
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
      QW_CC_INPUT: 'input'
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
                <p>Estou aqui para o ajudar com o que precisar, de forma fácil e rápida.</p>
                <p>Posso ajudar em várias situações:</p>
                <ul>
                    <li>Explico a sua fatura e os valores que aparecem nela.</li>
                    <li>Explico a sua fatura e os valores que aparecem nela.</li>
                    <li>Digo o estado da sua encomenda ou pedido.</li>
                    <li>Ajudamos se tiver problemas com a internet ou com a aplicação.</li>
                    <li>Pode marcar ou mudar uma visita técnica.</li>
                    <li>Se quiser, posso chamar um assistente humano para falar consigo.</li>
                </ul>
                <p>Estou aqui para o ajudar com o que precisar, de forma fácil e rápida.</p>
                <p>Se precisar de ajuda, é só escrever a sua pergunta.</p>
            </div>
            <div class="client-message">
                <p>Olá! Gostava de perceber melhor a última fatura que recebi. Acho que veio com um valor acima do normal.</p>
            </div>
            <div class="chatbot-response">
                <p>Claro, posso guiá-lo passo a passo na análise da sua fatura, esclarecendo os itens descritos, comparando com o que foi acordado contratualmente e destacando quaisquer valores que possam parecer incorretos ou ambíguos. .
                </p>
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
      QW_CC_INPUT: 'input'
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
                <p>Hello! Welcome to your mental health assistant. I’m here to listen, support, and provide helpful advice on stress, anxiety, or any emotional challenges you might be facing. You can share how you’re feeling or ask for tips on relaxation and self-care. How can I support you today?</p>
            </div>
            <div class="client-message">
                <p>I've been feeling very anxious lately and don’t know how to calm down.</p>
            </div>
            <div class="chatbot-response">
                <p>I’m sorry to hear that. Let’s try some simple breathing exercises together that can help reduce anxiety. Would you like me to guide you through them step-by-step?</p>
            </div>
        </div>
        <input class="chatbot-input" type="text" placeholder="Type your message...">
    </div>
</body>
</html>`,
    selectors: {
      QW_CC_WINDOW: 'body',
      QW_CC_DIALOG: 'div[class="chatbot-dialog"]',
      QW_CC_MESSAGES: 'div[class="chatbot-response"]',
      QW_CC_MIC: 'null',
      QW_CC_INPUT: 'input'
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
            <div class="chatbot-response">
                <p>Greetings. Within the ambit of this digital interlocutor, I am positioned to facilitate a comprehensive elucidation of multifaceted psychological phenomena, with a particular emphasis on the ontological underpinnings of anxiety as construed through the prism of cognitive-behavioral paradigms and existentialist philosophy. Should you desire, I am prepared to proffer a meticulous exegesis on the dialectical interplay between neurochemical substrates and psychosocial stressors, thereby enabling an augmented comprehension of symptomatic manifestations and potential therapeutic modalities.</p>
            </div>
            <div class="client-message">
                <p>Could you expound on the neurophysiological mechanisms underlying persistent anxiety states?</p>
            </div>
            <div class="chatbot-response">
                <p>Indeed. The pathophysiology of chronic anxiety encompasses a labyrinthine network of amygdalar hyperactivation, hypothalamic-pituitary-adrenal axis dysregulation, and aberrant synaptic plasticity, which conjointly precipitate heightened autonomic arousal and maladaptive behavioral responses. This intricate neurobiological milieu is further complicated by epigenetic modulators and environmental contingencies that cumulatively sculpt the phenotypic expression of anxiety disorders, thereby necessitating a multifactorial approach to both diagnosis and intervention predicated on integrative neuroscientific and psychodynamic frameworks.</p>
            </div>
        </div>
        <input class="chatbot-input" type="text" placeholder="Type your message...">
    </div>
</body>
</html>`,
    selectors: {
      QW_CC_WINDOW: 'body',
      QW_CC_DIALOG: 'div[class="chatbot-dialog"]',
      QW_CC_MESSAGES: 'div[class="chatbot-response"]',
      QW_CC_MIC: 'null',
      QW_CC_INPUT: 'input'
    },
    locale: 'en-US',
    outcome: 'failed' 
  }
];
