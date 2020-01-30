'use strict';
import roles from './elementImplicitRoles.json';
import { ElementHandle, Page } from 'puppeteer';
import getElementParent from '../domUtils/getElementParent';
import getElementTagName from '../domUtils/getElementTagName';
import getElementAttribute from '../domUtils/getElementAttribute';
import isElementADescendantOfExplicitRole from '../domUtils/isElementADescendantOfExplicitRole';

async function getImplicitRole(element: ElementHandle, page: Page, acessibleName:string|undefined): Promise<string | null> {
  let name = await getElementTagName(element);
  let attributes, role;
  if (name) {
    let roleValues = roles[name.toLocaleLowerCase()];
    if (roleValues !== undefined) {
      for (let roleValue of roleValues) {
        let special = roleValue["special"];
        attributes = roleValue["attributes"];
        if (attributes.length === 0 || await isInList(attributes, element)) {
          if (!special) {
            role = roleValue["role"];
          } else {
            let heading = new RegExp("h[1-6]");
            if (name === "footer" || name === "header") {
              if (await isElementADescendantOfExplicitRole(element, page, ["article", "aside", "main", "nav", "section"], ["article", "complementary", "main", "navigation", "region"])) {
                role = roleValue["role"];
              }
            } else if (name === "form" || name === "section") {
              let aName = acessibleName;
              if (aName !== undefined) {
                role = roleValue["role"];
              }

            } else if (heading.test(name)) {
              let ariaLevel = await getElementAttribute(element, "aria-level");
              if (ariaLevel === null || parseInt(ariaLevel) > 0) {
                role = roleValue["role"];
              }
            } else if (name === "img") {
              let alt = await getElementAttribute(element, "alt");
              if (alt !== "") {
                role = roleValue["role"];
              }
            } else if (name === "input") {

              let list = await getElementAttribute(element, "list");
              let type = await getElementAttribute(element, "type");

              if (list !== null) {
                role = roleValue["role"];
              } else if (type === "search") {
                role = "searchbox";
              } else {
                role = "textbox";
              }
            } else if (name === "li") {
              let parent = await getElementParent(element);
              let parentNames = ["ol", "ul", "menu"];
              let parentName;
              if (parent !== null)
                parentName = await getElementTagName(parent);

              if (parentName !== null && parentNames.includes(parentName)) {
                role = roleValue["role"];
              }

            } else if (name === "option") {
              let parent = await getElementParent(element);
              let parentName;
              if (parent !== null)
                parentName = await getElementTagName(parent);

              if (parentName === "datalist") {
                role = roleValue["role"];
              }
            } else if (name === "select") {
              let size = await getElementAttribute(element, "size");
              let multiple = await getElementAttribute(element, "multiple");

              if (multiple !== null && size !== null && parseInt(size, 10) > 1) {
                role = "listbox";
              } else {
                role = roleValue["role"];
              }
            } else if (name === "td") {
              if (await isElementADescendantOfExplicitRole(element, page, ["table"], [])) {
                role = roleValue["role"];
              }
            }
          }
        }
      }
    }
  }


  return role;
}
async function isInList(attributes, element: ElementHandle) {
  let result;
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    let key = attribute[0];
    let value = attribute[1];
    let roleSpecificATT = await getElementAttribute(element, key);
    if (roleSpecificATT === value || value === "")
      result = true;
  }
  return result;
}

export default getImplicitRole;
