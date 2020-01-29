'use strict';

function trimImportant(value: string): string {
  return value.replace('!important', '').trim();
}

export default trimImportant;