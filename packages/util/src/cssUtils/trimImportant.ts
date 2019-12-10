'use strict';

function trimImportant(value: string){
  return value.replace("!important", "").trim();
}

export = trimImportant;