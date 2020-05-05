'use strict';
import roles from './elementImplicitRoles.json';
import { QWElement,QWPage } from '@qualweb/html-util';
import { AccessibilityUtils } from "..";


async function getImplicitRole(elementQW: QWElement, pageQW:QWPage, acessibleName:string|undefined): Promise<string | null> {
  let name = await AccessibilityUtils.domUtils.getElementTagName(elementQW);
  let attributes, role;
  if (name) {
    let roleValues = roles[name.toLocaleLowerCase()];
    if (roleValues !== undefined) {
      for (let roleValue of roleValues) {
        let special = roleValue["special"];
        attributes = roleValue["attributes"];
        if (attributes.length === 0 || await isInList(attributes, elementQW)) {
          if (!special) {
            role = roleValue["role"];
          } else {
            let heading = new RegExp("h[1-6]");
            if (name === "footer" || name === "header") {
              if (await AccessibilityUtils.domUtils.isElementADescendantOfExplicitRole(elementQW, pageQW, ["article", "aside", "main", "nav", "section"], ["article", "complementary", "main", "navigation", "region"])) {
                role = roleValue["role"];
              }
            } else if (name === "form" || name === "section") {
              let aName = acessibleName;
              if (aName !== undefined) {
                role = roleValue["role"];
              }

            } else if (heading.test(name)) {
              let ariaLevel = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "aria-level");
              if (ariaLevel === null || parseInt(ariaLevel) > 0) {
                role = roleValue["role"];
              }
            } else if (name === "img") {
              let alt = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "alt");
              if (alt !== "") {
                role = roleValue["role"];
              }
            } else if (name === "input") {

              let list = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "list");
              let type = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "type");

              if (list !== null) {
                role = roleValue["role"];
              } else if (type === "search") {
                role = "searchbox";
              } else {
                role = "textbox";
              }
            } else if (name === "li") {
              let parent = await AccessibilityUtils.domUtils.getElementParent(elementQW);
              let parentNames = ["ol", "ul", "menu"];
              let parentName;
              if (parent !== null)
                parentName = await AccessibilityUtils.domUtils.getElementTagName(parent);

              if (parentName !== null && parentNames.includes(parentName)) {
                role = roleValue["role"];
              }

            } else if (name === "option") {
              let parent = await AccessibilityUtils.domUtils.getElementParent(elementQW);
              let parentName;
              if (parent !== null)
                parentName = await AccessibilityUtils.domUtils.getElementTagName(parent);

              if (parentName === "datalist") {
                role = roleValue["role"];
              }
            } else if (name === "select") {
              let size = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "size");
              let multiple = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "multiple");

              if (multiple !== null && size !== null && parseInt(size, 10) > 1) {
                role = "listbox";
              } else {
                role = roleValue["role"];
              }
            } else if (name === "td") {
              if (await AccessibilityUtils.domUtils.isElementADescendantOfExplicitRole(elementQW, pageQW, ["table"], [])) {
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
async function isInList(attributes, element: QWElement) {
  let result;
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    let key = attribute[0];
    let value = attribute[1];
    let roleSpecificATT = await AccessibilityUtils.domUtils.getElementAttribute(element, key);
    if (roleSpecificATT === value || (value === ""&&roleSpecificATT!==null))
      result = true;
  }
  return result;
}

export default getImplicitRole;
