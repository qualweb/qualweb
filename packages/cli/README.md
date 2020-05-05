# QualWeb CLI

QualWeb command line interface. It allows you perform accessibility evaluations from your terminal. It runs the [@qualweb/core](https://github.com/qualweb/core) that contains in 4 evaluation modules:
 - [@qualweb/act-rules](https://github.com/qualweb/act-rules)
 - [@qualweb/html-techniques](https://github.com/qualweb/html-techniques)
 - [@qualweb/css-techniques](https://github.com/qualweb/css-techniques)
 - [@qualweb/best-practices](https://github.com/qualweb/best-practices)

## How to install

```shell
  $ npm i -g @qualweb/cli
```

## How to run

### Url input

#### Simple evaluation

```shell
  $ qw -u https://act-rules.github.io/pages/about/
```

#### Evaluation with EARL report

```shell
  $ qw -u https://act-rules.github.io/pages/about/ -r earl
```

### File input

If you want to evaluate multiple url's at once, you can input a file with each url separated by a newline **\n**.

#### Example

```shell
  $ qw -f urls.txt
```

#### Evaluation with EARL report

This method will create an EARL report for each url.

```shell
  $ qw -f urls.txt -r earl
```

This method will create an aggregated EARL report from all urls.

```shell
  $ qw -f urls.txt -r earl-a # add `-s <save-name>` to rename the report file
```

## Options

### Usage options

| Alias | Command | Value | Information |
|---|---|---|---|
| -u | --url | `<url>` | Url to evaluate |
| -f | --file | `<path-to-file>` | File with urls to evaluate |
| -c | --crawl | `<domain>` | Domain to crawl |
| -m | --module | `act html css bp` | Choose which modules to execute |
| -r | --report-type | `"earl" or  "earl-a"` | Convert the evaluation to `earl` or `earl-a` (*earl-aggregated*) |
| -s | --save-name | `<name>` | The name to save the aggregated earl reports (*earl-a*) |
| -p | -maxParallelEvaluations | `<number>` | Evaluates multiples urls ate the same time (*experimental*) |
| -j | --json | `<file>` | Loads a json file with the configs to execute. Check an example below |
| -h | --help | | Print the help menu |

### -j, --json config file example

This command replaces all other commands.

```json
  {
    "url": "https://act-rules.github.io/pages/about/",
    "file": "test_url.txt",
    "crawl": "https://act-rules.github.io",
    "viewport": {
      "mobile": false,
      "orientation": "landscape",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:22.0) Gecko/20100101 Firefox/22.0', default value for mobile = 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; DROID2 GLOBAL Build/S273) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
      "width": 1920,
      "height": 1080
    },
    "maxParallelEvaluations": "5",
    "modules": {
      "act": true,
      "html": true,
      "css": true,
      "bp": true
    },
    "act-rules": {
      "rules": ["QW-ACT-R1"],
      "levels": ["A", "AA", "AAA"],
      "principles": ["Perceivable", "Operable", "Understandable", "Robust"]
    },
    "html-techniques": {
      "rules": ["QW-HTML-T1"],
      "levels": ["A", "AA", "AAA"],
      "principles": ["Perceivable", "Operable", "Understandable", "Robust"]
    },
    "css-techniques": {
      "rules": ["QW-CSS-T1"],
      "levels": ["A", "AA", "AAA"],
      "principles": ["Perceivable", "Operable", "Understandable", "Robust"]
    },
    "best-practices": {
      "bestPractices": ["QW-BP1"]
    }
  }
```

### Viewport Options

| Alias | Command | Value | Information |
|---|---|---|---|
| -v | --viewport | | Use custom viewport |
| | --mobile | | Use a mobile context (*default: desktop*) |
| | --orientation | `"portrait" or "landscape"` | Set window orientation (*default desktop: landscape, default mobile: portrait*) |
| | --user-agent | `<custom-user-agent>` | Set custom user agent |
| | --width | `<number in px>` | Set custom viewport width (*default desktop: 1366, default mobile: 1080*) |
| | --height | `<number in px>` | Set custom viewport height (*default desktop: 768, default mobile: 1920*) |

### Modules options

| Command | Value | Information |
|---|---|---|
| --act-rules | `"ruleId1 ruleId2 ... ruleIdx" or <config file>` | Choose which act rules to execute. For config file check below  |
| --act-levels | `A AA AAA` | Choose which conform levels to evaluate regarding the act rules |
| --act-principles | `Perceivable Operable Understandable Robust` | Choose which principles to evaluate regarding the act rules |
| --html-techniques | `"techniqueId1 techniqueId2 ... techniqueIdx" or <config file>` | Choose which html technique to execute. For config file check below |
| --html-levels | `A AA AAA` | Choose which conform levels to evaluate regarding the html techniques |
| --html-principles | `Perceivable Operable Understandable Robust` | Choose which principles to evaluate regarding the html techniques |
| --css-techniques | `"techniqueId1 techniqueId2 ... techniqueIdx" or <config file>` | Choose which css technique to execute. For config file check below |
| --css-levels | `A AA AAA` | Choose which conform levels to evaluate regarding the css techniques |
| --css-principles | `Perceivable Operable Understandable Robust` | Choose which principles to evaluate regarding the css techniques |
| --best-practices | `bestpracticeId1 bestpracticeId2 ... bestpracticeIdx` | Choose which best practices to execute. For config file check below |

**Note:** The module options above are only used if the correspondent module was set to be executed (command *-m*).

#### --act-rules config file example

This config file can replace commands **--act-rules**, **--act-levels** and **--act-principles**.

```json
  {
    "act-rules": {
      "rules": ["QW-ACT-R1"],
      "levels": ["A", "AA", "AAA"],
      "principles": ["Perceivable", "Operable", "Understandable", "Robust"]
    }
  }
```

#### --html-techniques config file example

This config file can replace commands **--html-techniques**, **--html-levels** and **--html-principles**.

```json
  {
    "html-techniques": {
      "rules": ["QW-HTML-T1"],
      "levels": ["A", "AA", "AAA"],
      "principles": ["Perceivable", "Operable", "Understandable", "Robust"]
    }
  }
```

#### --css-techniques config file example

This config file can replace commands **--css-techniques**, **--css-levels** and **--css-principles**.

```json
  {
    "css-techniques": {
      "rules": ["QW-CSS-T1"],
      "levels": ["A", "AA", "AAA"],
      "principles": ["Perceivable", "Operable", "Understandable", "Robust"]
    }
  }
```

#### --best-practices config file example

```json
  {
    "best-practices": {
      "bestPractices": ["QW-BP1"]
    }
  }
```

## Implemented ACT Rules

| QualWeb Rule ID | ACT Rule ID | ACT Rule Name |
|---|---|---|
| QW-ACT-R1 | [2779a5](https://act-rules.github.io/rules/2779a5) | HTML Page has a title |
| QW-ACT-R2 | [b5c3f8](https://act-rules.github.io/rules/b5c3f8) | HTML has lang attribute |
| QW-ACT-R3 | [5b7ae0](https://act-rules.github.io/rules/5b7ae0) | HTML lang and xml:lang match |
| QW-ACT-R4 | [bc659a](https://act-rules.github.io/rules/bc659a) | Meta-refresh no delay |
| QW-ACT-R5 | [bf051a](https://act-rules.github.io/rules/bf051a) | Validity of HTML Lang attribute |
| QW-ACT-R6 | [59796f](https://act-rules.github.io/rules/59796f) | Image button has accessible name |
| QW-ACT-R7 | [b33eff](https://act-rules.github.io/rules/b33eff) | Orientation of the page is not restricted using CSS transform property |
| QW-ACT-R8 | [9eb3f6](https://act-rules.github.io/rules/9eb3f6) | Image filename is accessible name for image |
| QW-ACT-R9 | [b20e66](https://act-rules.github.io/rules/b20e66) | Links with identical accessible names have equivalent purpose |
| QW-ACT-R10 | [4b1c6c](https://act-rules.github.io/rules/4b1c6c) | `iframe` elements with identical accessible names have equivalent purpose |
| QW-ACT-R11 | [97a4e1](https://act-rules.github.io/rules/97a4e1) | Button has accessible name |
| QW-ACT-R12 | [c487ae](https://act-rules.github.io/rules/c487ae) | Link has accessible name |
| QW-ACT-R13 | [6cfa84](https://act-rules.github.io/rules/6cfa84) | Element with `aria-hidden` has no focusable content |
| QW-ACT-R14 | [b4f0c3](https://act-rules.github.io/rules/b4f0c3) | meta viewport does not prevent zoom |
| QW-ACT-R15 | [80f0bf](https://act-rules.github.io/rules/80f0bf) | audio or video has no audio that plays automatically |
| QW-ACT-R16 | [e086e5](https://act-rules.github.io/rules/e086e5) | Form control has accessible name |
| QW-ACT-R17 | [23a2a8](https://act-rules.github.io/rules/23a2a8) | Image has accessible name |
| QW-ACT-R18 | [3ea0c8](https://act-rules.github.io/rules/3ea0c8) | `id` attribute value is unique |
| QW-ACT-R19 | [cae760](https://act-rules.github.io/rules/cae760) | iframe element has accessible name |
| QW-ACT-R20 | [674b10](https://act-rules.github.io/rules/674b10) | role attribute has valid value |
| QW-ACT-R21 | [7d6734](https://act-rules.github.io/rules/7d6734) | svg element with explicit role has accessible name |
| QW-ACT-R22 | [de46e4](https://act-rules.github.io/rules/de46e4) | Element within body has valid lang attribute |
| QW-ACT-R23 | [c5a4ea](https://act-rules.github.io/rules/c5a4ea) | video element visual content has accessible alternative |
| QW-ACT-R24 | [73f2c2](https://act-rules.github.io/rules/73f2c2) | autocomplete attribute has valid value |
| QW-ACT-R25 | [5c01ea](https://act-rules.github.io/rules/5c01ea) | ARIA state or property is permitted |
| QW-ACT-R26 | [eac66b](https://act-rules.github.io/rules/eac66b) | video element auditory content has accessible alternative |
| QW-ACT-R27 | [5f99a7](https://act-rules.github.io/rules/5f99a7) | This rule checks that each aria- attribute specified is defined in ARIA 1.1. |
| QW-ACT-R28 | [4e8ab6](https://act-rules.github.io/rules/4e8ab6) | Element with role attribute has required states and properties |
| QW-ACT-R29 | [e7aa44](https://act-rules.github.io/rules/e7aa44) | Audio element content has text alternative |
| QW-ACT-R30 | [2ee8b8](https://act-rules.github.io/rules/2ee8b8) | Visible label is part of accessible name |
| QW-ACT-R31 | [c3232f](https://act-rules.github.io/rules/c3232f) | Video element visual-only content has accessible alternative |
| QW-ACT-R32 | [1ec09b](https://act-rules.github.io/rules/1ec09b) | video element visual content has strict accessible alternative  |
| QW-ACT-R33 | [ff89c9](https://act-rules.github.io/rules/ff89c9) | ARIA required context role |
| QW-ACT-R34 | [6a7281](https://act-rules.github.io/rules/6a7281) | ARIA state or property has valid value |
| QW-ACT-R35 | [ffd0e9](https://act-rules.github.io/rules/ffd0e9) | Heading has accessible name |
| QW-ACT-R36 | [a25f45](https://act-rules.github.io/rules/a25f45) | Headers attribute specified on a cell refers to cells in the same table element |
| QW-ACT-R37 | [afw4f7](https://act-rules.github.io/rules/afw4f7) | Text has minimum contrast |
| QW-ACT-R38 | [bc4a75](https://act-rules.github.io/rules/bc4a75) | ARIA required owned elements |
| QW-ACT-R39 | [d0f69e](https://act-rules.github.io/rules/d0f69e) | All table header cells have assigned data cells |

## Implemented WCAG 2.1 HTML Techniques

| QualWeb Technique ID | WCAG Technique ID | WCAG Technique Name |
|---|---|---|
| QW-HTML-T1 | [H24](https://www.w3.org/WAI/WCAG21/Techniques/html/H24) | Providing text alternatives for the area elements of image maps |
| QW-HTML-T2 | [H39](https://www.w3.org/WAI/WCAG21/Techniques/html/H39) | Using caption elements to associate data table captions with data tables |
| QW-HTML-T3 | [H71](https://www.w3.org/WAI/WCAG21/Techniques/html/H71) | Providing a description for groups of form controls using fieldset and legend elements |
| QW-HTML-T4 | [H73](https://www.w3.org/WAI/WCAG21/Techniques/html/H73) | Using the summary attribute of the table element to give an overview of data tables |
| QW-HTML-T5 | [H36](https://www.w3.org/WAI/WCAG21/Techniques/html/H36) | Using alt attributes on images used as submit buttons |
| QW-HTML-T6 | [SCR20](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR20) | Using both keyboard and other device-specific functions |
| QW-HTML-T7 | [H28](https://www.w3.org/WAI/WCAG21/Techniques/html/H28) | Providing definitions for abbreviations by using the abbr element |
| QW-HTML-T8 | [F30](https://www.w3.org/WAI/WCAG21/Techniques/failures/F30) | Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives |
| QW-HTML-T9 | [G141](https://www.w3.org/WAI/WCAG21/Techniques/general/G141) | Organizing a page using headings |
| QW-HTML-T10 | [H64](https://www.w3.org/WAI/WCAG21/Techniques/html/H64) | Using the title attribute of the frame and iframe elements |
| QW-HTML-T11 | [H2](https://www.w3.org/WAI/WCAG21/Techniques/html/H2) | Combining adjacent image and text links for the same resource |
| QW-HTML-T13 | [H25](https://www.w3.org/WAI/WCAG21/Techniques/html/H25) | Providing a title using the title element |
| QW-HTML-T14 | [H35](https://www.w3.org/WAI/WCAG21/Techniques/html/H35) | Providing text alternatives on applet elements |
| QW-HTML-T15 | [F46](https://www.w3.org/WAI/WCAG21/Techniques/failures/F46) | Failure of Success Criterion 1.3.1 due to using th elements, caption elements, or non-empty summary attributes in layout tables |
| QW-HTML-T16 | [F47](https://www.w3.org/WAI/WCAG21/Techniques/failures/F47) | Failure of Success Criterion 2.2.2 due to using the blink element |
| QW-HTML-T17 | [H43](https://www.w3.org/WAI/WCAG21/Techniques/html/H43) | Using id and headers attributes to associate data cells with header cells in data tables |
| QW-HTML-T19 | [H59](https://www.w3.org/WAI/WCAG21/Techniques/html/H59) | Using the link element and navigation tools |
| QW-HTML-T20 | [H88](https://www.w3.org/WAI/WCAG21/Techniques/html/H88) | Using HTML according to spec |
| QW-HTML-T22 | [G140](https://www.w3.org/WAI/WCAG21/Techniques/general/G140) | Separating information and structure from presentation to enable different presentations |
| QW-HTML-T23 | [G125](https://www.w3.org/WAI/WCAG21/Techniques/general/G125) | Providing links to navigate to related Web pages |
| QW-HTML-T24 | [G88](https://www.w3.org/WAI/WCAG21/Techniques/general/G88) | Providing descriptive titles for Web pages |
| QW-HTML-T25 | [G162](https://www.w3.org/WAI/WCAG21/Techniques/general/G162) | Positioning labels to maximize predictability of relationships |
| QW-HTML-T26 | [F25](https://www.w3.org/WAI/WCAG21/Techniques/failures/F25) | Failure of Success Criterion 2.4.2 due to the title of a Web page not identifying the contents |
| QW-HTML-T27 | [G130](https://www.w3.org/WAI/WCAG21/Techniques/general/G130) | Providing descriptive headings |
| QW-HTML-T28 | [H48](https://www.w3.org/WAI/WCAG21/Techniques/html/H48) | Using ol, ul and dl for lists or groups of links |
| QW-HTML-T29 | [F54](https://www.w3.org/WAI/WCAG21/Techniques/failures/F54) | Failure of Success Criterion 2.1.1 due to using only pointing-device-specific event handlers (including gesture) for a function  |
| QW-HTML-T30 | [H51](https://www.w3.org/WAI/WCAG21/Techniques/html/H51) | Using table markup to present tabular information |
| QW-HTML-T31 | [H45](https://www.w3.org/WAI/WCAG21/Techniques/html/H45) | Using longdesc |
| QW-HTML-T32 | [H32](https://www.w3.org/WAI/WCAG21/Techniques/html/H32) | Providing submit buttons |
| QW-HTML-T33 | [H33](https://www.w3.org/WAI/WCAG21/Techniques/html/H33) | Supplementing link text with the title attribute |
| QW-HTML-T34 | [F89](https://www.w3.org/WAI/WCAG21/Techniques/failures/F89) | Failure of Success Criteria 2.4.4, 2.4.9 and 4.1.2 due to not providing an accessible name for an image which is the only content in a link  |
| QW-HTML-T35 | [F52](https://www.w3.org/WAI/WCAG21/Techniques/failures/F52) | Failure of Success Criterion 3.2.1 and 3.2.5 due to opening a new window as soon as a new page is loaded  |
| QW-HTML-T37 | [G123](https://www.w3.org/WAI/WCAG21/Techniques/general/G123) | Adding a link at the beginning of a block of repeated content to go to the end of the block |
| QW-HTML-T38 | [G1](https://www.w3.org/WAI/WCAG21/Techniques/general/G1) | Adding a link at the top of each page that goes directly to the main content area |
| QW-HTML-T39 | [H37](https://www.w3.org/WAI/WCAG21/Techniques/html/H37) | Accessible name on img and svg elements |
| QW-HTML-T40 | [F55](https://www.w3.org/WAI/WCAG21/Techniques/failures/F55) | Failure of Success Criteria 2.1.1, 2.4.7, and 3.2.1 due to using script to remove focus when focus is received |
| QW-HTML-T41 | [H63](https://www.w3.org/WAI/WCAG21/Techniques/html/H63) | Using the scope attribute to associate header cells and data cells in data tables |
| QW-HTML-T42 | [F59](https://www.w3.org/WAI/WCAG21/Techniques/failures/F59) | Failure of Success Criterion 4.1.2 due to using script to make div or span a user interface control in HTML without providing a role for the control |
| QW-HTML-T43 | [F88](https://www.w3.org/WAI/WCAG21/Techniques/failures/F88) | Failure of Success Criterion 1.4.8 due to using text that is justified (aligned to both the left and the right margins) |


## Implemented WCAG 2.1 CSS Techniques

| QualWeb Technique ID | WCAG Technique ID | WCAG Technique Name |
|---|---|---|
| QW-CSS-T1 | [C12](https://www.w3.org/WAI/WCAG21/Techniques/css/C12) [C13](https://www.w3.org/WAI/WCAG21/Techniques/css/C13) [C14](https://www.w3.org/WAI/WCAG21/Techniques/css/C14) | Using "percent, em, names" for font sizes |
| QW-CSS-T2 | [C19](https://www.w3.org/WAI/WCAG21/Techniques/css/C19) | Specifying alignment either to the left or right in CSS |
| QW-CSS-T3 | [C21](https://www.w3.org/WAI/WCAG21/Techniques/css/C21) | Specifying line spacing in CSS |
| QW-CSS-T4 | [C22](https://www.w3.org/WAI/WCAG21/Techniques/css/C22) | Using CSS to control visual presentation of text |
| QW-CSS-T5 | [C24](https://www.w3.org/WAI/WCAG21/Techniques/css/C24) | Using percentage values in CSS for container sizes |
| QW-CSS-T6 | [F4](https://www.w3.org/WAI/WCAG21/Techniques/failures/F4) | Failure of Success Criterion 2.2.2 due to using text-decoration:blink without a mechanism to stop it in less than five seconds |
| QW-CSS-T7 | [F24](https://www.w3.org/WAI/WCAG21/Techniques/failures/F24) | Failure of Success Criterion 1.4.3, 1.4.6 and 1.4.8 due to specifying foreground colors without specifying background colors or vice versa |

## Implemented accessibility best practices

| QualWeb best practice ID | Related to | Best practice Name |
|---|---|---|
| QW-BP1 | HTML | Using h1-h6 to identify headings |
| QW-BP2 | HTML | Concise images alt text |
| QW-BP3 | HTML | Link element with text content equal to the content of the title attribute |
| QW-BP4 | HTML | Grouped links not within a nav element |
| QW-BP5 | HTML | Using table elements inside other table elements |
| QW-BP6 | HTML | title element is not too long (64 characters) |
| QW-BP7 | HTML | Title element contains ASCII-art |
| QW-BP8 | HTML | Headings with images should have an accessible name |
| QW-BP9 | HTML | Table element without header cells has a caption |
| QW-BP10 | HTML | HTML elements are used to control visual presentation of content |
| QW-BP11 | HTML | Using br to make a list |
| QW-BP12 | HTML | Using scope col and row |
| QW-BP13 | HTML | Using consecutive links with the same href and one contains an image |
| QW-BP14 | CSS | At least one container's width has been specified using values expressed in px |
| QW-BP15 | CSS | At least one width attribute of an HTML element is expressed in absolute values |
| QW-BP16 | HTML | Verify if page has links |

# License

ISC