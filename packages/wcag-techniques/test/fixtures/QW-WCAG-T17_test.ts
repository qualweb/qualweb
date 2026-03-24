export default [
  {
    code: `
      <html>
        <head>
          <title><span>Hello world</span></title>
        </head
        <body>
          <div>
            <form>
              <span>
                <input id="input" type="checkbox">
              </span>
              <div>
                <label for="input">
                  This is a checkbox
                </label>
              </div>
              <br>
              <label>
                Text input
                <input types="text">
              </label>
              <br>
              <label for="input2">
                This is a number input
              </label>
              <input id="input2" type="number">
              <br>
              <input id="input3" type="radio">
              <label for="input3" style="visibility: hidden;">
                Invisible label
              </label>
              <br>
              <label>
                <input type="text">
              </label>
              <br>
              <label for="input4"></label>
              <div>
                <input id="input4" type="email">
              </div>
            </form>
          </div>
        </body>
      </html>
    `,
    outcome: 'failed',
  },{
    code: `
      <html>
        <head><title>Test Suite 1</title></head>
        <body>
          <form>
            <label for="input1">Username</label>
            <input id="input1" type="text"> 
            <label for="input2">Password</label>
            <section><h3>Security Tip</h3></section> 
            <input id="input2" type="password"> </form>
        </body>
      </html>
    `,
    outcome: 'failed',
  },
  {
    code: `
      <html>
        <body>
          <label for="name">
            <span>Name</span> <strong>(required)</strong>
          </label>
          <div style="display:contents">
             <input id="name" type="text">
          </div>
        </body>
      </html>
    `,
    outcome: 'passed',
  },

  {
    code: `
      <html>
        <body>
          <label for="phone">Phone Number</label>
          <br>
          <span><small>Format: +351...</small></span>
          <br>
          <input id="phone" type="tel"> </body>
      </html>
    `,
    outcome: 'passed',
  },
  {
    code: `
      <html>
        <body>
          <label for="agree">Terms of Service</label>
          <table><tr><td>Read carefully</td></tr></table> <input id="agree" type="checkbox">
        </body>
      </html>
    `,
    outcome: 'failed',
  },
{
  code: `
    <html>
      <body>
        <label>
          <input id="radio1" type="radio" name="opt" value="1"> 
          <span>Opção Correta</span>
        </label>
      </body>
    </html>
  `,
  outcome: 'passed',
},
{
  code: `
    <html>
      <body>
        <label>
          <input id="check2" type="radio" name="opt" value="2">
          <h3>Título Obstrutivo</h3> 
          Opção com Título
        </label>
      </body>
    </html>
  `,
  outcome: 'failed',
},
{
  code: `
    <html>
      <body>
        <label>
          Texto Antes <input id="check1" type="radio" name="opt" value="3">
        </label>
      </body>
    </html>
  `,
  outcome: 'failed',
},{
  code: `
    <html>
      <body>
        <label for="check1">
          <input id="check1" type="checkbox">
          <strong>Aceito</strong> os <em>Termos</em>
        </label>
      </body>
    </html>
  `,
  outcome: 'passed',
},
{
  code: `
    <html>
      <body>
        <label for="check2">Subscrever Newsletter</label>
        <hr>
        <input id="check2" type="checkbox">
      </body>
    </html>
  `,
  outcome: 'failed',
},
{
  code: `
    <html>
      <body>
        <label>
          <input id="check3" type="checkbox">
          <ul><li>Dado A</li></ul>
          Confirmar Dados
        </label>
      </body>
    </html>
  `,
  outcome: 'failed',
},
  {
    code: `
      <html>
        <style>
          .flex-reverse { display: flex; flex-direction: row-reverse; gap: 20px; }
        </style>
        <body>
          <div class="flex-reverse">
            <label for="input1">Username</label>
            <input id="input1" type="text">
          </div>
        </body>
      </html>
    `,
    outcome: 'failed',
  },
  {
    code: `
      <html>
        <style>
          .spacer { margin-bottom: 110px; display: block; font-weight: bold; }
        </style>
        <body>
          <label for="input2" class="spacer">Email Address</label>
          <input id="input2" type="email">
        </body>
      </html>
    `,
    outcome: 'passed',
  },
  {
    code: `
      <html>
        <style>
          .spacer { margin-bottom: 110px; display: block; font-weight: bold; }
        </style>
        <body>
        <input id="input2" type="email">
          <label for="input2" class="spacer">Email Address</label>
          
        </body>
      </html>
    `,
    outcome: 'failed',
  },
  {
    code: `
      <html>
        <style>
          .container { position: relative; padding-top: 20px; }
          label { position: absolute; top: 0; left: 5px; font-size: 12px; color: blue; }
          input { padding: 10px; }
        </style>
        <body>
          <div class="container">
            <label for="input3">Placeholder Label</label>
            <input id="input3" type="text">
          </div>
        </body>
      </html>
    `,
    outcome: 'passed',
  },
  {
    code: `
      <html>
        <style>
          .sr-only { 
            position: absolute; width: 1px; height: 1px; padding: 0; 
            margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; 
          }
        </style>
        <body>
          <label for="input4" class="sr-only">Search</label>
          <input id="input4" type="search">
        </body>
      </html>
    `,
    outcome: 'failed', 
  },
  {
    code: `
      <html>
        <style>
          .grid-layout { display: grid; grid-template-columns: 100px 100px; }
          .lbl { grid-column: 2; }
          .inp { grid-column: 1; }
        </style>
        <body>
          <div class="grid-layout">
            <label for="input5" class="lbl">Senha</label>
            <input id="input5" type="password" class="inp">
          </div>
        </body>
      </html>
    `,
    outcome: 'failed',
  },
  {
    code: `
      <html>
        <style>
          .fl { float: left; width: 100px; }
          .fr { float: left; width: 200px; } 
        </style>
        <body>
          <input id="input6" type="text" class="fl">
          <label for="input6" class="fr">Nome Completo</label>
        </body>
      </html>
    `,
    outcome: 'failed',
  },
  {
    code: `
      <html>
        <style>
          .wrapper { position: relative; height: 50px; }
          input { position: absolute; z-index: 1; width: 200px; height: 30px; }
          label { position: absolute; z-index: 2; top: 5px; left: 5px; } /* Label 'em cima' do input no eixo Z */
        </style>
        <body>
          <div class="wrapper">
            <input id="input7" type="text">
            <label for="input7">Search...</label>
          </div>
        </body>
      </html>
    `,
    outcome: 'failed',
  },
  {
    code: `
      <html>
        <body>
          <div style="display: flex; flex-direction: column;">
            <label for="check1">Aceito os termos</label>
            <input id="check1" type="checkbox">
          </div>
        </body>
      </html>
    `,
    outcome: 'failed', 
  },
  {
    code: `
      <html>
        <style>
          label { display: inline-block; width: 50px; overflow: hidden; white-space: nowrap; }
          input { width: 300px; }
        </style>
        <body>
          <label for="input8">Username muito longo que não cabe</label>
          <input id="input8" type="text">
        </body>
      </html>
    `,
    outcome: 'failed',
  },
  {
    code: `
      <html>
        <style>
          .grid { display: grid; grid-template-columns: 100px 100px; }
          .lbl { grid-column: 2; }
          .inp { grid-column: 1; }
        </style>
        <body>
          <div class="grid">
            <label for="i1" class="lbl">Senha</label>
            <input id="i1" type="password" class="inp">
          </div>
        </body>
      </html>
    `,
    outcome: 'failed', 
  },
  {
    code: `
      <html>
        <body>
          <label for="i3" style="margin-bottom: -10px; display: block;">Senha</label>
          <input id="i3" type="password">
        </body>
      </html>
    `,
    outcome: 'failed', 
  },
  {
    code: `
      <html>
        <body>
          <input id="i4" type="password" style="margin-top: 100px;">
          <label for="i4" style="display: block; transform: translateY(-120px);">Senha</label>
        </body>
      </html>
    `,
    outcome: 'passed', 
  },


];