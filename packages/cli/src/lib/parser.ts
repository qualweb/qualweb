'use strict';

import clone from 'lodash.clone';
import { optionList, sections } from './options';
import { readJsonFile, fileExists } from './fileUtils';

import commandLineUsage from 'command-line-usage';
import commandLineArgs from 'command-line-args';

const usage = commandLineUsage(sections);

function printHelp(){
  console.log(usage);
  process.exit(0);
}

async function parse() {
  let mainOptions = commandLineArgs(optionList, { stopAtFirstUnknown: true });
  const options = {};

  if(mainOptions._unknown) {
    printHelp();
  }

  if (mainOptions.json){
    mainOptions = await readJsonFile(mainOptions['json']);
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

  if (mainOptions.viewport) {
    options['viewport'] = {
      "mobile": false,
      "landscape": true,
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:22.0) Gecko/20100101 Firefox/22.0', default value for mobile = 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; DROID2 GLOBAL Build/S273) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
      "resolution": {
        "width": 1920,
        "height": 1080
      }
    };

    if (mainOptions.mobile) {
      options['viewport']["mobile"] = mainOptions.mobile;
    }

    if (mainOptions.orientation) {
      options['viewport']["landscape"] = !(mainOptions.orientation === "portrait");
    }

    if (mainOptions['user-agent']) {
      options['viewport']["userAgent"] = mainOptions['user-agent'];
    }

    if (mainOptions.width) {
      options['viewport']["resolution"] = mainOptions.width;
    }

    if (mainOptions.height) {
      options['viewport']["userAgent"] = mainOptions.height;
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

    if(mainOptions['act-rules'].length === 1){
      if(await fileExists(mainOptions['act-rules'][0])){
        let rules = await readJsonFile(mainOptions['act-rules'][0]);
        options['act-rules']['rules'] = clone(rules['act-rules']['rules']);
      }else{
        options['act-rules']['rules'] = clone(mainOptions['act-rules']);
      }
    }else{
      options['act-rules']['rules'] = clone(mainOptions['act-rules']);
    }
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

    if(mainOptions['html-techniques'].length === 1){
      if(await fileExists(mainOptions['html-techniques'][0])){
        let rules = await readJsonFile(mainOptions['html-techniques'][0]);
        options['html-techniques']['techniques'] = clone(rules['html-techniques']['rules']);
      }else{
        options['html-techniques']['techniques'] = clone(mainOptions['html-techniques']);
      }
    }else{
      options['html-techniques']['techniques'] = clone(mainOptions['html-techniques']);
    }

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
    if(mainOptions['html-techniques'].length === 1){
      if(await fileExists(mainOptions['css-techniques'][0])){
        let rules = await readJsonFile(mainOptions['css-techniques'][0]);
        options['css-techniques']['techniques'] = clone(rules['css-techniques']['rules']);
      }else{
        options['css-techniques']['techniques'] = clone(mainOptions['css-techniques']);
      }
    }else{
      options['css-techniques']['techniques'] = clone(mainOptions['css-techniques']);
    }

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

    if(mainOptions['best-practices'].length === 1){
      console.log(await fileExists(mainOptions['best-practices'][0]));
      if(await fileExists(mainOptions['best-practices'][0])){
        let rules = await readJsonFile(mainOptions['best-practices'][0]);
				console.log("TCL: parse -> rules", rules)
        options['best-practices']['bestPractices'] = clone(rules['best-practices']['bestPractices']);
      }else{
        options['best-practices']['bestPractices'] = clone(mainOptions['best-practices']);
      }
    }else{
      options['best-practices']['bestPractices'] = clone(mainOptions['best-practices']);
    }

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