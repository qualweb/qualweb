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
  { 
    code: ` <html lang="pt-PT"><head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Relação Input label não reconhecida no AccessMonitor</title>
</head>
<body data-new-gr-c-s-check-loaded="14.1278.0" data-gr-ext-installed="">

<h1>Relação input label não reconhecida pelo AccessMonitor</h1>

<p>Antes do <a href="#">Teste</a></p>

<div class="agora-input-search-wrapper flex flex-col">
	<div class="input-label-wrapper flex items-end mb-8 justify-between">
		<label for="_r_1r_" class="input-search-label">Pesquisa livre</label>
	</div>
	<div class="input-wrapper flex relative items-center rounded-4 bg-white z-[1]">
		<input placeholder="Insira o nome ou identificador do atributo" id="_r_1r_" class="agora-input-search bg-transparent" aria-invalid="false" type="search" value="">
		<div class="search-icon bg-transparent">
			<div>

				<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="icon icon-m fill-[var(--color-primary-600)] icon-search-default !block" role="img">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M16.6177 18.0319C15.078 19.2635 13.125 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 13.125 19.2635 15.078 18.0319 16.6177L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0977 20.6834 22.0977 20.2929 21.7071L16.6177 18.0319ZM4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 12.886 17.2541 14.5978 16.0413 15.8565C16.0071 15.8828 15.9742 15.9116 15.9429 15.9429C15.9116 15.9742 15.8827 16.0071 15.8564 16.0413C14.5977 17.2542 12.886 18 11 18C7.13401 18 4 14.866 4 11Z"></path>
				</svg>

				<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="icon icon-m fill-[var(--color-primary-600)] icon-search-hover !hidden" role="img">
					<path d="M2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 13.125 19.2635 15.078 18.0319 16.6177L21.7071 20.2929C22.0977 20.6834 22.0977 21.3166 21.7071 21.7071C21.3166 22.0977 20.6834 22.0977 20.2929 21.7071L16.6177 18.0319C15.078 19.2635 13.125 20 11 20C6.02944 20 2 15.9706 2 11Z"></path>
				</svg>
			</div>
		</div>
	</div>
</div>
	
<p>Depois do <a href="#">Teste</a></p>



</body><grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration></html>`,
    outcome: 'passed',
  },
  {
    code: `
    <label>
<img src="search-icon.png" alt="Search">
<input type="text">
</label>

 `,
 outcome: 'passed',
  },
  {
    code: ` <label>
<svg role="img" aria-label="Search" viewBox="0 0 24 24">
<!-- paths -->
</svg>
<input type="text">
</label>`,
outcome: 'passed',
  }


];