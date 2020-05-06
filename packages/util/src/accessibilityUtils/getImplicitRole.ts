'use strict';
import roles from './elementImplicitRoles.json';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import isElementADescendantOfExplicitRole from "../domUtils/isElementADescendantOfExplicitRole";

function getImplicitRole(elementQW: QWElement, pageQW: QWPage, accessibleName: string | undefined): string | null {
  let name =elementQW.getElementTagName();
  let attributes, role;
  if (name) {
    let roleValues = roles[name.toLocaleLowerCase()];
    if (roleValues !== undefined) {
      for (let roleValue of roleValues) {
        let special = roleValue["special"];
        attributes = roleValue["attributes"];
        if (attributes.length === 0 ||  isInList(attributes, elementQW)) {
          if (!special) {
            role = roleValue["role"];
          } else {
            let heading = new RegExp("h[1-6]");
            if (name === "footer" || name === "header") {
              if (isElementADescendantOfExplicitRole(elementQW, pageQW, ["article", "aside", "main", "nav", "section"], ["article", "complementary", "main", "navigation", "region"])) {
                role = roleValue["role"];
              }
            } else if (name === "form" || name === "section") {
              if (accessibleName !== undefined) {
                role = roleValue["role"];
              }

            } else if (heading.test(name)) {
              let ariaLevel =elementQW.getElementAttribute( "aria-level");
              if (ariaLevel === null || parseInt(ariaLevel) > 0) {
                role = roleValue["role"];
              }
            } else if (name === "img") {
              let alt =elementQW.getElementAttribute( "alt");
              if (alt !== "") {
                role = roleValue["role"];
              }
            } else if (name === "input") {

              let list =elementQW.getElementAttribute( "list");
              let type =elementQW.getElementAttribute( "type");

              if (list !== null) {
                role = roleValue["role"];
              } else if (type === "search") {
                role = "searchbox";
              } else {
                role = "textbox";
              }
            } else if (name === "li") {
              let parent =elementQW.getElementParent();
              let parentNames = ["ol", "ul", "menu"];
              let parentName;
              if (parent !== null)
                parentName =elementQW.getElementTagName();

              if (parentName !== null && parentNames.includes(parentName)) {
                role = roleValue["role"];
              }

            } else if (name === "option") {
              let parent =elementQW.getElementParent();
              let parentName;
              if (parent !== null)
                parentName =parent.getElementTagName();

              if (parentName === "datalist") {
                role = roleValue["role"];
              }
            } else if (name === "select") {
              let size =elementQW.getElementAttribute( "size");
              let multiple =elementQW.getElementAttribute( "multiple");

              if (multiple !== null && size !== null && parseInt(size, 10) > 1) {
                role = "listbox";
              } else {
                role = roleValue["role"];
              }
            } else if (name === "td") {
              if (isElementADescendantOfExplicitRole(elementQW, pageQW, ["table"], [])) {
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

function isInList(attributes, element: QWElement) {
  let result;
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    let key = attribute[0];
    let value = attribute[1];
    let roleSpecificATT =element.getElementAttribute( key);
    if (roleSpecificATT === value || (value === "" && roleSpecificATT !== null))
      result = true;
  }
  return result;
}

export default getImplicitRole;
