# QualWeb CLI

## How to install

```shell
  $ npm i -g @qualweb/cli
```

## How to run

### Url input

#### Normal evaluation

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
  $ qw -f urls.txt -r earl-a
```

## CLI options

| Command | Value | Information |
|---|---|---|
| -u | `<url>` | Url to evaluate |
| -f | `<path-to-file>` | File with urls to evaluate |
| -c | `<domain>` | Domain to crawl |
| -m | `act,html,css,bp` | Choose which modules to execute |
| -r | `"earl" or  "earl-a"` | Convert the evaluation to `earl` or `earl-a` (*earl-aggregated*) | 
| -maxParallelEvaluations | `<number>` | Evaluates multiples urls ate the same time |
| -act-rules | `rule1,rule2,...,rule15` | Choose which act rules to execute |
| -act-levels | `A,AA,AAA` | Choose which conform levels to evaluate |
| -act-principles | `Perceivable,Operable,Understandable,Robust` | Choose which principles to evaluate |
| -html-techniques | `technique1,technique2,...,technique15` | Choose which html technique to execute |
| -html-levels | `A,AA,AAA` | Choose which conform levels to evaluate |
| -html-principles | `Perceivable,Operable,Understandable,Robust` | Choose which principles to evaluate |
| -css-techniques | `technique1,technique2,...,technique15` | Choose which css technique to execute |
| -css-levels | `A,AA,AAA` | Choose which conform levels to evaluate |
| -css-principles | `Perceivable,Operable,Understandable,Robust` | Choose which principles to evaluate |
| -best-practices | `bestpractice1,bestpractice2,...,bestpractice15` | Choose which best-practices to execute |

**Note:** The module options above are only used if the correspondent module was set to be executed (command *-m*).

## Implemente ACT Rules

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
| QW-ACT-R16 | [e086e5](https://act-rules.github.io/rules/e086e5) | Form control has accessible name |
| QW-ACT-R17 | [23a2a8](https://act-rules.github.io/rules/23a2a8) | Image has accessible name |
| QW-ACT-R18 | [3ea0c8](https://act-rules.github.io/rules/3ea0c8) | `id` attribute value is unique |
| QW-ACT-R19 | [cae760](https://act-rules.github.io/rules/cae760) | iframe element has accessible name |
| QW-ACT-R20 | [674b10](https://act-rules.github.io/rules/674b10) | role attribute has valid value |
| QW-ACT-R21 | [7d6734](https://act-rules.github.io/rules/7d6734) | svg element with explicit role has accessible name |
| QW-ACT-R22 | [de46e4](https://act-rules.github.io/rules/de46e4) | Element within body has valid lang attribute |

# License

ISC