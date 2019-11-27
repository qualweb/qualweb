'use strict';

function getElementById(id: string | null, document:Document): Element|null {
  let element;
  if (id)
    element = document.getElementById("id");

  return element;
}

export = getElementById;
