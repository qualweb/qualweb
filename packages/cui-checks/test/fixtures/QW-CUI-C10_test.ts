export default [
	{
	  code: `<!DOCTYPE html>
			  <html lang="">
			  <head>
			  	<meta charset="UTF-8">
			  </head>
			  <body>
			  	<div qw-cui-human-assistance></div>
			  </body>
			  </html >`,
	  selectors: {
		QW_CC_WINDOW: 'html',
		QW_CC_DIALOG: 'body',
		QW_CC_MESSAGES: 'div',
		QW_CC_MIC: 'null',
		QW_CC_INPUT: 'null',
	  },
	  testedRules: [

			{
			code: "QW-CUI-C10",
			selector: '[qw-cui-human-assistance]',
			result: 'passed'
		},
					{
			code: "QW-CUI-C8",
			selector: '[qw-cui]',
			result: 'failed'
		}
	],
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
			  	<div qw-cui-human-assistance></div>
			  </body>
			  </html >`,
	  selectors: {
		QW_CC_WINDOW: 'html',
		QW_CC_DIALOG: 'body',
		QW_CC_MESSAGES: 'div',
		QW_CC_MIC: 'null',
		QW_CC_INPUT: 'null',
	  },
	  testedRules: [

			{
			code: "QW-CUI-C10",
			selector: '[qw-cui-human-assistance]',
			result: 'failed'
		},
					{
			code: "QW-CUI-C8",
			selector: '[qw-cui]',
			result: 'passed'
		}
	],
	  locale: 'pt-PT',
	  outcome: 'failed'
	},{
	  code: `<!DOCTYPE html>
			  <html lang="">
			  <head>
			  	<meta charset="UTF-8">
			  </head>
			  <body>
			  	<div qw-cui-human-assistance></div>
			  </body>
			  </html>`,
	  selectors: {
		QW_CC_WINDOW: 'html',
		QW_CC_DIALOG: 'body',
		QW_CC_MESSAGES: 'div',
		QW_CC_MIC: 'null',
		QW_CC_INPUT: 'null',
	  },
	  testedRules: [

			{
			code: "QW-CUI-C10",
			selector: '[qw-cui-human-assistance]',
			result: 'warning'
		},
					{
			code: "QW-CUI-C8",
			selector: '[qw-cui]',
			result: 'passed'
		}
	],
	  locale: 'pt-PT',
	  outcome: 'warning'
	},{
	  code: `<!DOCTYPE html>
			  <html lang="">
			  <head>
			  	<meta charset="UTF-8">
			  </head>
			  <body>
			  	<div ></div>
			  </body>
			  </html>`,
	  selectors: {
		QW_CC_WINDOW: 'html',
		QW_CC_DIALOG: 'body',
		QW_CC_MESSAGES: 'div',
		QW_CC_MIC: 'null',
		QW_CC_INPUT: 'null',
	  },
	  testedRules: [

			{
			code: "QW-CUI-C10",
			selector: '[qw-cui-human-assistance]',
			result: 'inapplicable'
		},
					{
			code: "QW-CUI-C8",
			selector: '[qw-cui]',
			result: 'passed'
		}
	],
	  locale: 'pt-PT',
	  outcome: 'inapplicable'
	}
  ];
  