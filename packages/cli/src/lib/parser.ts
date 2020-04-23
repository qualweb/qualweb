'use strict';

import clone from 'lodash.clone';
import { optionList, sections } from './options';

import commandLineUsage from 'command-line-usage';
import commandLineArgs from 'command-line-args';

const usage = commandLineUsage(sections);

function printHelp(){
  console.log(usage);
  process.exit(0);
}

function parse() {
  const mainOptions = commandLineArgs(optionList, { stopAtFirstUnknown: true });
  
  const options = {};

  if(mainOptions._unknown) {
    printHelp();
  }

  if (mainOptions.url) {
    options['url'] = mainOptions.url;
  }

  if (mainOptions.file) {
    options['file'] = mainOptions.file;
  }

  if (mainOptions.crawl) {
    options['crawl'] = mainOptions.crawl;
  }

  if(mainOptions.module){
    options['execute'] = {};
    const modules = mainOptions.module;

    for(const module of modules || []){
      options['execute'][module.replace(',','').trim()] = true;
    }
  }

  if(mainOptions.maxParallelEvaluations) {
    options['maxParallelEvaluations'] = mainOptions.maxParallelEvaluations;
  }

  if(mainOptions['report-type']) {
    options['r'] = mainOptions['report-type'];
  }

  //////////////////////////////////////////////////////////////////////////////////
  // ACT ///////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  options['act-rules'] = {}

  if(mainOptions['act-rules']){
    if(mainOptions.module && !options['execute']['act']) {
      printHelp();
    }

    options['act-rules']['rules'] = clone(mainOptions['act-rules']);
  }

  if(mainOptions['act-levels']){
    if(mainOptions.module && !options['execute']['act']) {
      printHelp();
    }

    options['act-rules']['levels'] = clone(mainOptions['act-levels']);
  }

  if(mainOptions['act-principles']){
    if(mainOptions.module && !options['execute']['act']) {
      printHelp();
    }

    options['act-rules']['principles'] = clone(mainOptions['act-principles']);
  }

  //////////////////////////////////////////////////////////////////////////////////
  // HTML //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  options['html-techniques'] = {};

  if(mainOptions['html-techniques']){
    if(mainOptions.module && !options['execute']['html']) {
      printHelp();
    }

    options['html-techniques']['techniques'] = clone(mainOptions['html-techniques']);
  }

  if(mainOptions['html-levels']){
    if(mainOptions.module && !options['execute']['html']) {
      printHelp();
    }

    options['html-techniques']['levels'] = clone(mainOptions['html-levels']);
  }

  if(mainOptions['html-principles']){
    if(mainOptions.module && !options['execute']['html']) {
      printHelp();
    }

    options['html-techniques']['principles'] = clone(mainOptions['html-principles']);
  }

  //////////////////////////////////////////////////////////////////////////////////
  // CSS ///////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  options['css-techniques'] = {};

  if(mainOptions['css-techniques']){
    if(mainOptions.module && !options['execute']['css']) {
      printHelp();
    }

    options['css-techniques']['techniques'] = clone(mainOptions['css-techniques']);
  }

  if(mainOptions['css-levels']){
    if(mainOptions.module && !options['execute']['css']) {
      printHelp();
    }

    options['css-techniques']['levels'] = clone(mainOptions['css-levels']);
  }

  if(mainOptions['css-principles']){
    if(mainOptions.module && !options['execute']['css']) {
      printHelp();
    }

    options['css-techniques']['principles'] = clone(mainOptions['css-principles']);
  }

  //////////////////////////////////////////////////////////////////////////////////
  // BP ////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  options['best-practices'] = {};

  if(mainOptions['best-practices']) {
    if(mainOptions.module && !options['execute']['bp']) {
      printHelp();
    }

    options['best-practices']['bestPractices'] = clone(mainOptions['best-practices']);
  }

  if (mainOptions.help) {
    printHelp();
  }

  return options;
}

export {
  parse,
  printHelp
}