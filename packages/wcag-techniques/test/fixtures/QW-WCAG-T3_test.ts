export default [
  {
    code: `
      <html>
        <body>
          <fieldset>
            <legend>Informações de Contacto</legend>
            <label>Nome: <input type="text"></label>
          </fieldset>
        </body>
      </html>
    `,
    outcome: 'passed'
  },
  {
    code: `
      <html>
        <body>
          <fieldset>
            <p>Escolha o seu prato:</p>
            <input type="radio" id="p1" name="prato"><label for="p1">Carne</label>
            <input type="radio" id="p2" name="prato"><label for="p2">Peixe</label>
          </fieldset>
        </body>
      </html>
    `,
    outcome: 'failed'
  },
  {
    
    code: `
      <html>
        <body>
          <fieldset>
            <legend>   </legend>
            <input type="checkbox" id="c1"><label for="c1">Aceito os termos</label>
          </fieldset>
        </body>
      </html>
    `,
    outcome: 'failed'
  },
  {

    code: `
      <html>
        <body>
          <fieldset>
            <div class="header-decorator"></div>
            <legend>Preferências de Notificação</legend>
            <label><input type="checkbox"> Email</label>
          </fieldset>
        </body>
      </html>
    `,
    outcome: 'warning'
  },
  {

    code: `
      <html>
        <body>
          <fieldset>
            <legend><span>Dados de <strong>Acesso</strong></span></legend>
            <label>User: <input type="text"></label>
          </fieldset>
        </body>
      </html>
    `,
    outcome: 'passed'
  },
  {
    code: `
      <html>
        <body>
          <main>
            <fieldset>
              <legend>Filtro de Preço</legend>
              <input type="range" min="0" max="100">
            </fieldset>
          </main>
        </body>
      </html>
    `,
    outcome: 'passed'
  },
  {
    code: `
      <html>
        <body>
          <fieldset>
            <p>Por favor, preencha o grupo abaixo:</p>
            <legend>Endereço</legend>
            <input type="text">
          </fieldset>
        </body>
      </html>
    `,
    outcome: 'warning', 
  },
  {
    code: `
      <html>
        <body>
          <fieldset>
            <legend>   </legend>
            <input type="radio" name="r1"> Sim
          </fieldset>
        </body>
      </html>
    `,
    outcome: 'failed', 
  },
  {
    code: `
      <html>
        <body>
          <fieldset>
            <p>Grupo sem título</p>
            <input type="checkbox"> Aceito os termos
          </fieldset>
        </body>
      </html>
    `,
    outcome: 'failed', 

  }
 
];
