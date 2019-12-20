'use strict';
import roles from './elementImplicitRoles.json';
import { getElementAttribute, getElementName } from "../domUtils/domUtils";
import { ElementHandle, Page } from 'puppeteer';
import getAccessibleName from './getAccessibleName.js';



async function getElementRole(element: ElementHandle, page: Page): Promise<string> {
  let name = await getElementName(element);
  let attributes, attribute, key, value, role, roleSpecificATT;
  if (name) {
    let roleValues = roles[name.toLocaleLowerCase()];
    for (let roleValue of roleValues) {
      let special = roleValue["special"];
      if (!special) {
        attributes = roleValue["attributes"];
        if (attributes.length > 0) {
          for (let i = 0; i < attributes.length; i++) {
            attribute = attributes[i];
            key = attribute[0];
            value = attribute[1];
            roleSpecificATT = await getElementAttribute(element, key);
            if (roleSpecificATT === value || value === "")
              role = roleValue["role"];
          }
        } else {
          role = roleValue["role"];
        }
      } else {
        //	If not a descendant of an article, aside, main, nav or section element, or an element with role=article, complementary, main, navigation or region then role=contentinfo, otherwise No corresponding role.
        let heading = new RegExp("h*");
        if (name === "footer") {
          //TODO
        } else if (name === "form") {
          let aName = await getAccessibleName(element, page);
          if (aName !== undefined) {
            role = "form";
          }

        } else if (heading.test(name)) {
          let ariaLevel = await getElementAttribute(element, "aria-level");
          if (ariaLevel !== null && parseInt(ariaLevel) > 0) {
            role = "heading";
          }
        } else if (name === "header") {

        } else if (name === "img") {
          let alt = await getElementAttribute(element, "alt");
          if (alt !== "") {
            role = "img";
          }
        }else if(name === "input"){
          let type = await getElementAttribute(element, "type");
          let list = await getElementAttribute(element, "list");
          
        }
      }
    }
  }


  return role;
}

export = getElementRole;
