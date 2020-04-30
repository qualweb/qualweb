'use strict';

import { optionList, reports, modules } from './options';
import { readJsonFile } from './fileUtils';
import { printHelp, printError } from './parserUtils';
import { parseAct } from './actParser';
import { parseHTML } from './htmlParser';
import { parseCSS } from './cssParser';
import { parseBP } from './bpParser';

import commandLineArgs from 'command-line-args';

async function parse() {
  let mainOptions = commandLineArgs(optionList, { stopAtFirstUnknown: true });
  let options = {};

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
    const modulesToExecute = mainOptions.module;

    for(const module of modulesToExecute || []){
      if(!modules.includes(module.replace(',','').trim())){
        printError("Module " + module.replace(',','').trim() + " does not exist");
      }else{
        options['execute'][module.replace(',','').trim()] = true;
      }
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

    if(!reports.includes(options['r'])){
      printError("Wrong report type selected.")
    }
  }

  //////////////////////////////////////////////////////////////////////////////////
  // ACT ///////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  options = await parseAct(mainOptions, options);

  //////////////////////////////////////////////////////////////////////////////////
  // HTML //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  options = await parseHTML(mainOptions, options);

  //////////////////////////////////////////////////////////////////////////////////
  // CSS ///////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  options = await parseCSS(mainOptions, options);

  //////////////////////////////////////////////////////////////////////////////////
  // BP ////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  options = await parseBP(mainOptions, options);

  //////////////////////////////////////////////////////////////////////////////////
  // HELP //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  if (mainOptions.help) {
    printHelp();
  }

  return options;
}

export {
  parse
}