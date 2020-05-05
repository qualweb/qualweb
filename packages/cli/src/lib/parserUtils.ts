'use strict';

import { sections, actRules, htmlTechniques, cssTechniques, bps, levels, principles } from './options';
import commandLineUsage from 'command-line-usage';

const usage = commandLineUsage(sections);

function printHelp(){
  console.log(usage);
  process.exit(0);
}

function printError(err){
  console.log(err);
  console.log("To get help please run");
  console.log("  $ qw --help");
  process.exit(0);
}

function validatePrinciples(arrayPrinciples){
  const valid = arrayContainsArray(arrayPrinciples, principles);
  if(!valid){
    printError("Invalid principle(s) selected.");
  }
}

function validateLevels(arrayLevels){
  const valid = arrayContainsArray(arrayLevels, levels);
  if(!valid){
    printError("Invalid level(s) selected.");
  }
}

function validateACT(rules){
  const valid = arrayContainsArray(rules, actRules);
  if(!valid){
    printError("Invalid rule(s) selected.");
  }
}

function validateHTML(techniques){
  const valid = arrayContainsArray(techniques, htmlTechniques);
  if(!valid){
    printError("Invalid techniques(s) selected.");
  }
}

function validateCSS(techniques){
  const valid = arrayContainsArray(techniques, cssTechniques);
  if(!valid){
    printError("Invalid techniques(s) selected.");
  }
}

function validateBP(bestPractices){
  const valid = arrayContainsArray(bestPractices, bps);
  if(!valid){
    printError("Invalid best-practice(s) selected.");
  }
}

/**
 * true if arr2 contains arr1
 */
function arrayContainsArray(arr1, arr2){
  return arr1.some(r => arr2.includes(r))
}

export {
  printHelp,
  printError,
  validatePrinciples,
  validateLevels,
  validateACT,
  validateHTML,
  validateCSS,
  validateBP
}