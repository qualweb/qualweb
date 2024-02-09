# QualWeb ACT Rules Module

Implementation of the [ACT rules](https://www.w3.org/WAI/standards-guidelines/act/rules/).

## How to use

**This is an internal module of QualWeb. To use it check either [@qualweb/cli](https://github.com/qualweb/cli) or [@qualweb/core](https://github.com/qualweb/core). You can also perform evaluations at [http://qualweb.di.fc.ul.pt/evaluator/](http://qualweb.di.fc.ul.pt/evaluator/), or by installing the [chrome extension](https://chrome.google.com/webstore/detail/qualweb-extension/ljgilomdnehokancdcbkmbndkkiggioc).**

## Implemented rules

| QualWeb Rule ID | ACT Rule ID                                                             | ACT Rule Name                                                                       |
| --------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| QW-ACT-R1       | [2779a5](https://www.w3.org/WAI/standards-guidelines/act/rules/2779a5/) | HTML page has non-empty title                                                       |
| QW-ACT-R2       | [b5c3f8](https://www.w3.org/WAI/standards-guidelines/act/rules/b5c3f8/) | HTML page has lang attribute                                                        |
| QW-ACT-R4       | [bc659a](https://www.w3.org/WAI/standards-guidelines/act/rules/bc659a/) | Meta element has no refresh delay                                                   |
| QW-ACT-R5       | [bf051a](https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/) | HTML page lang attribute has valid language tag                                     |
| QW-ACT-R6       | [59796f](https://www.w3.org/WAI/standards-guidelines/act/rules/59796f/) | Image button has non-empty accessible name                                          |
| QW-ACT-R7       | [b33eff](https://www.w3.org/WAI/standards-guidelines/act/rules/b33eff/) | Orientation of the page is not restricted using CSS transform property              |
| QW-ACT-R9       | [b20e66](https://www.w3.org/WAI/standards-guidelines/act/rules/b20e66/) | Links with identical accessible names have equivalent purpose                       |
| QW-ACT-R10      | [4b1c6c](https://www.w3.org/WAI/standards-guidelines/act/rules/4b1c6c/) | Iframe elements with identical accessible names have equivalent purpose             |
| QW-ACT-R11      | [97a4e1](https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/) | Button has non-empty accessible name                                                |
| QW-ACT-R12      | [c487ae](https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/) | Link has non-empty accessible name                                                  |
| QW-ACT-R13      | [6cfa84](https://www.w3.org/WAI/standards-guidelines/act/rules/6cfa84/) | Element with aria-hidden has no content in sequential focus navigation              |
| QW-ACT-R14      | [b4f0c3](https://www.w3.org/WAI/standards-guidelines/act/rules/b4f0c3/) | Meta viewport allows for zoom                                                       |
| QW-ACT-R15      | [80f0bf](https://www.w3.org/WAI/standards-guidelines/act/rules/80f0bf/) | Audio or video element avoids automatically playing audio                           |
| QW-ACT-R16      | [e086e5](https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/) | Form field has non-empty accessible name                                            |
| QW-ACT-R17      | [23a2a8](https://www.w3.org/WAI/standards-guidelines/act/rules/23a2a8/) | Image has non-empty accessible name                                                 |
| QW-ACT-R19      | [cae760](https://www.w3.org/WAI/standards-guidelines/act/rules/cae760/) | Iframe element has non-empty accessible name                                        |
| QW-ACT-R20      | [674b10](https://www.w3.org/WAI/standards-guidelines/act/rules/674b10/) | Role attribute has valid value                                                      |
| QW-ACT-R21      | [7d6734](https://www.w3.org/WAI/standards-guidelines/act/rules/7d6734/) | SVG element with explicit role has non-empty accessible name                        |
| QW-ACT-R22      | [de46e4](https://www.w3.org/WAI/standards-guidelines/act/rules/de46e4/) | Element with lang attribute has valid language tag                                  |
| QW-ACT-R23      | [c5a4ea](https://www.w3.org/WAI/standards-guidelines/act/rules/c5a4ea/) | Video element visual content has accessible alternative                             |
| QW-ACT-R24      | [73f2c2](https://www.w3.org/WAI/standards-guidelines/act/rules/73f2c2/) | autocomplete attribute has valid value                                              |
| QW-ACT-R25      | [5c01ea](https://www.w3.org/WAI/standards-guidelines/act/rules/5c01ea/) | ARIA state or property is permitted                                                 |
| QW-ACT-R26      | [eac66b](https://www.w3.org/WAI/standards-guidelines/act/rules/eac66b/) | Video element auditory content has accessible alternative                           |
| QW-ACT-R27      | [5f99a7](https://www.w3.org/WAI/standards-guidelines/act/rules/5f99a7/) | ARIA attribute is defined in WAI-ARIA                                               |
| QW-ACT-R28      | [4e8ab6](https://www.w3.org/WAI/standards-guidelines/act/rules/4e8ab6/) | Element with role attribute has required states and properties                      |
| QW-ACT-R29      | [e7aa44](https://www.w3.org/WAI/standards-guidelines/act/rules/e7aa44/) | Audio element content has text alternative                                          |
| QW-ACT-R30      | [2ee8b8](https://www.w3.org/WAI/standards-guidelines/act/rules/2ee8b8/) | Visible label is part of accessible name                                            |
| QW-ACT-R31      | [c3232f](https://www.w3.org/WAI/standards-guidelines/act/rules/c3232f/) | Video element visual-only content has accessible alternative                        |
| QW-ACT-R32      | [1ec09b](https://www.w3.org/WAI/standards-guidelines/act/rules/1ec09b/) | video element visual content has strict accessible alternative                      |
| QW-ACT-R33      | [ff89c9](https://www.w3.org/WAI/standards-guidelines/act/rules/ff89c9/) | ARIA required context role                                                          |
| QW-ACT-R34      | [6a7281](https://www.w3.org/WAI/standards-guidelines/act/rules/6a7281/) | ARIA state or property has valid value                                              |
| QW-ACT-R35      | [ffd0e9](https://www.w3.org/WAI/standards-guidelines/act/rules/ffd0e9/) | Heading has non-empty accessible name                                               |
| QW-ACT-R36      | [a25f45](https://www.w3.org/WAI/standards-guidelines/act/rules/a25f45/) | Headers attribute specified on a cell refers to cells in the same table element     |
| QW-ACT-R37      | [afw4f7](https://www.w3.org/WAI/standards-guidelines/act/rules/afw4f7/) | Text has minimum contrast                                                           |
| QW-ACT-R38      | [bc4a75](https://www.w3.org/WAI/standards-guidelines/act/rules/bc4a75/) | ARIA required owned elements                                                        |
| QW-ACT-R39      | [d0f69e](https://www.w3.org/WAI/standards-guidelines/act/rules/d0f69e/) | Table header cell has assigned cells                                                |
| QW-ACT-R40      | [59br37](https://www.w3.org/WAI/standards-guidelines/act/rules/59br37/) | Zoomed text node is not clipped with CSS overflow                                   |
| QW-ACT-R41      | [36b590](https://www.w3.org/WAI/standards-guidelines/act/rules/36b590/) | Error message describes invalid form field value                                    |
| QW-ACT-R42      | [8fc3b6](https://www.w3.org/WAI/standards-guidelines/act/rules/8fc3b6/) | Object element rendering non-text content has non-empty accessible name             |
| QW-ACT-R43      | [0ssw9k](https://www.w3.org/WAI/standards-guidelines/act/rules/0ssw9k/) | Scrollable element is keyboard accessible                                           |
| QW-ACT-R44      | [fd3a94](https://www.w3.org/WAI/standards-guidelines/act/rules/fd3a94/) | Links with identical accessible names and same context serve equivalent purpose     |
| QW-ACT-R48      | [46ca7f](https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/) | Element marked as decorative is not exposed                                         |
| QW-ACT-R49      | [aaa1bf](https://www.w3.org/WAI/standards-guidelines/act/rules/aaa1bf/) | Audio or video that plays automatically has no audio that lasts more than 3 seconds |
| QW-ACT-R50      | [4c31df](https://www.w3.org/WAI/standards-guidelines/act/rules/4c31df/) | Audio or video that plays automatically has a control mechanism                     |
| QW-ACT-R51      | [fd26cf](https://www.w3.org/WAI/standards-guidelines/act/rules/fd26cf/) | Video element visual-only content is media alternative for text                     |
| QW-ACT-R53      | [ee13b5](https://www.w3.org/WAI/standards-guidelines/act/rules/ee13b5/) | Video element visual-only content has transcript                                    |
| QW-ACT-R54      | [d7ba54](https://www.w3.org/WAI/standards-guidelines/act/rules/d7ba54/) | Video element visual-only content has audio track alternative                       |
| QW-ACT-R55      | [1ea59c](https://www.w3.org/WAI/standards-guidelines/act/rules/1ea59c/) | Video element visual content has audio description                                  |
| QW-ACT-R56      | [ab4d13](https://www.w3.org/WAI/standards-guidelines/act/rules/ab4d13/) | Video element content is media alternative for text                                 |
| QW-ACT-R58      | [2eb176](https://www.w3.org/WAI/standards-guidelines/act/rules/2eb176/) | Audio element content has transcript                                                |
| QW-ACT-R59      | [afb423](https://www.w3.org/WAI/standards-guidelines/act/rules/afb423/) | Audio element content is media alternative for text                                 |
| QW-ACT-R60      | [f51b46](https://www.w3.org/WAI/standards-guidelines/act/rules/f51b46/) | Video element auditory content has captions                                         |
| QW-ACT-R61      | [1a02b0](https://www.w3.org/WAI/standards-guidelines/act/rules/1a02b0/) | Audio and visuals of video element have transcript                                  |
| QW-ACT-R62      | [oj04fd](https://www.w3.org/WAI/standards-guidelines/act/rules/oj04fd/) | Element in sequential focus order has visible focus                                 |
| QW-ACT-R63      | [b40fd1](https://www.w3.org/WAI/standards-guidelines/act/rules/b40fd1/) | Document has a landmark with non-repeated content                                   |
| QW-ACT-R64      | [047fe0](https://www.w3.org/WAI/standards-guidelines/act/rules/047fe0/) | Document has heading for non-repeated content                                       |
| QW-ACT-R65      | [307n5z](https://www.w3.org/WAI/standards-guidelines/act/rules/307n5z/) | Element with presentational children has no focusable content                       |
| QW-ACT-R66      | [m6b1q3](https://www.w3.org/WAI/standards-guidelines/act/rules/m6b1q3/) | Menuitem has non-empty accessible name                                              |
| QW-ACT-R67      | [24afc2](https://www.w3.org/WAI/standards-guidelines/act/rules/24afc2/) | Letter spacing in style attributes is not !important                                |
| QW-ACT-R68      | [78fd32](https://www.w3.org/WAI/standards-guidelines/act/rules/78fd32/) | Line height in style attributes is not !important                                   |
| QW-ACT-R69      | [9e45ec](https://www.w3.org/WAI/standards-guidelines/act/rules/9e45ec/) | Word spacing in style attributes is not !important                                  |
| QW-ACT-R70      | [akn7bn](https://www.w3.org/WAI/standards-guidelines/act/rules/akn7bn/) | Iframe with interactive elements is not excluded from tab-order                     |
| QW-ACT-R71      | [bisz58](https://www.w3.org/WAI/standards-guidelines/act/rules/bisz58/) | Meta element has no refresh delay (no exception)                                    |
| QW-ACT-R72      | [8a213c](https://www.w3.org/WAI/standards-guidelines/act/rules/8a213c/) | First focusable element is link to non-repeated content                             |
| QW-ACT-R73      | [3e12e1](https://www.w3.org/WAI/standards-guidelines/act/rules/3e12e1/) | Block of repeated content is collapsible                                            |
| QW-ACT-R74      | [ye5d6e](https://www.w3.org/WAI/standards-guidelines/act/rules/ye5d6e/) | Document has an instrument to move focus to non-repeated content                    |
| QW-ACT-R75      | [cf77f2](https://www.w3.org/WAI/standards-guidelines/act/rules/cf77f2/) | Bypass Blocks of Repeated Content                                                   |
| QW-ACT-R76      | [09o5cg](https://www.w3.org/WAI/standards-guidelines/act/rules/09o5cg/) | Text has enhanced contrast                                                          |
| QW-ACT-R77      | [in6db8](https://www.w3.org/WAI/standards-guidelines/act/rules/in6db8/) | ARIA required ID references exist                                                   |

# License

ISC
