# Changelog

## [0.3.15] - 11/01/2022

### Updated

- bug fixes

## [0.3.14] - 21/09/2022

### Updated

- added url verification

## [0.3.13] - 26/05/2022

### Fixed

- '/' bug

## [0.3.12] - 28/10/2021

### Fixed

- known bugs

## [0.3.11] - 21/10/2021

### Removed

- unnecessary console.log() in the code

### Updated

- dependencies

## [0.3.10] - 21/10/2021

### Added

- waitUntil option to Crawler constructor. Wait for dom events before preforming the page search. This will make possible to crawl dynamic pages, but the process will be slower.

### Updated

- dependencies

### Fixed

- known bugs

## [0.3.9] - 21/07/2021

### Updated

- tsconfig.json file

## [0.3.8] - 21/07/2021

### Removed

- @types/puppeteer from dev-dependencies

## [0.3.7] - 19/07/2021

### Fixed

- incorrect urls when href value was not trimmed
- verification for href with "mailto:", "tel:" and "javascript:"

### Updated

- dependencies

## [0.3.6] - 12/05/2021

### Updated

- dependencies

## [0.3.5] - 05/05/2021

### Removed

- php extension from being excluded during the crawling process

### Updated

- dependencies

## [0.3.4] - 23/04/2021

### Added

- option for BrowserContext in the constructor

### Updated

- dependencies

## [0.3.3] - 13/04/2021

### Added

- viewport options to Crawler class. These options are used when fetching the webpage

### Updated

- dependencies

## [0.3.2] - 9/04/2021

### Added

- timeout option
- more logging

### Fixed

- some bugs

## [0.3.1] - 02/04/2021

### Fixed

- some bugs

## [0.3.0] - 01/04/2021

### Changes

- This module now uses puppeteer instead of simplecrawler to crawl websites

### Updated

- dependencies
- code refactored

## [0.2.2] - 24/04/2020

### Fixed

- some bugs

## [0.2.1] - 24/04/2020

### Fixed

- some bugs

## [0.2.0] - 24/04/2020

### Added

- feedback messages
- possibility to interrupt the crawling process

## [0.1.1] - 19/12/2019

### Updated

- code optimization

## [0.1.0] - 18/12/2019

### Fixed

- some bugs

## [0.0.1] - 27/09/2019

### Added

- crawling mechanism
