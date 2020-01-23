"use strict";

import { ElementHandle } from "puppeteer";
import Rule from "./Rule.object";
import { ACTRuleResult } from "@qualweb/act-rules";
import { DomUtils, AccessibilityUtils } from "@qualweb/util";

class QW_ACT_R24 extends Rule {
  autoCompleteTable = {
    "home": [
      "tel",
      "tel-country-code",
      "tel-national",
      "tel-area-code",
      "tel-local",
      "tel-local-prefix",
      "tel-local-suffix",
      "tel-extension",
      "email",
      "impp"
    ],
    "work": [
      "tel",
      "tel-country-code",
      "tel-national",
      "tel-area-code",
      "tel-local",
      "tel-local-prefix",
      "tel-local-suffix",
      "tel-extension",
      "email",
      "impp"
    ],
    "mobile": [
      "tel",
      "tel-country-code",
      "tel-national",
      "tel-area-code",
      "tel-local",
      "tel-local-prefix",
      "tel-local-suffix",
      "tel-extension",
      "email",
      "impp"
    ],
    "fax": [
      "tel",
      "tel-country-code",
      "tel-national",
      "tel-area-code",
      "tel-local",
      "tel-local-prefix",
      "tel-local-suffix",
      "tel-extension",
      "email",
      "impp"
    ],
    "pager": [
      "tel",
      "tel-country-code",
      "tel-national",
      "tel-area-code",
      "tel-local",
      "tel-local-prefix",
      "tel-local-suffix",
      "tel-extension",
      "email",
      "impp"
    ],
    "modifiers": [
      "pager",
      "fax",
      "mobile",
      "work",
      "home",
      "shipping",
      "billing"
    ],
    "correctTerms": [
      "name",
      "honorific-prefix",
      "given-name",
      "additional-name",
      "family-name",
      "honorific-suffix",
      "nickname",
      "organization-title",
      "username",
      "new-password",
      "current-password",
      "organization",
      "street-address",
      "address-line1",
      "address-line2",
      "address-line3",
      "address-level4",
      "address-level3",
      "address-level2",
      "address-level1",
      "country",
      "country-name",
      "postal-code",
      "cc-name",
      "cc-given-name",
      "cc-additional-name",
      "cc-family-name",
      "cc-number",
      "cc-exp",
      "cc-exp-month",
      "cc-exp-year",
      "cc-csc",
      "cc-type",
      "transaction-currency",
      "transaction-amount",
      "language",
      "bday",
      "bday-day",
      "bday-month",
      "bday-year",
      "sex",
      "url",
      "photo",
      "tel",
      "tel-country-code",
      "tel-national",
      "tel-area-code",
      "tel-local",
      "tel-local-prefix",
      "tel-local-suffix",
      "tel-extension",
      "email",
      "impp"
    ],
    "fieldControl": {
      "name": "text",
      "honorific-prefix": "text",
      "given-name": "text",
      "additional-name": "text",
      "family-name": "text",
      "honorific-suffix": "text",
      "nickname": "text",
      "organization-title": "text",
      "username": "text",
      "new-password": "password",
      "current-password": "password",
      "organization": "text",
      "street-address": "multiline",
      "address-line1": "text",
      "address-line2": "text",
      "address-line3": "text",
      "address-level4": "text",
      "address-level3": "text",
      "address-level2": "text",
      "address-level1": "text",
      "country": "text",
      "country-name": "text",
      "postal-code": "text",
      "cc-name": "text",
      "cc-given-name": "text",
      "cc-additional-name": "text",
      "cc-family-name": "text",
      "cc-number": "text",
      "cc-exp": "month",
      "cc-exp-month": "numeric",
      "cc-exp-year": "numeric",
      "cc-csc": "text",
      "cc-type": "text",
      "transaction-currency": "text",
      "transaction-amount": "numeric",
      "language": "text",
      "bday": "date",
      "bday-day": "numeric",
      "bday-month": "numeric",
      "bday-year": "numeric",
      "sex": "text",
      "url": "url",
      "photo": "url",
      "tel": "tel",
      "tel-country-code": "text",
      "tel-national": "text",
      "tel-area-code": "text",
      "tel-local": "text",
      "tel-local-prefix": "text",
      "tel-local-suffix": "text",
      "tel-extension": "text",
      "email": "email",
      "impp": "url"
    }
  };

  constructor() {
    super({
      name: "autocomplete attribute has valid value",
      code: "QW-ACT-R24",
      mapping: "73f2c2",
      description: "This rule checks that the HTML autocomplete attribute has a correct value.",
      metadata: {
        target: {
          element: "input[autocomplete], select[autocomplete], textarea[autocomplete]"
        },
        "success-criteria": [
          {
            name: '3.1.2',
            level: 'AA',
            principle: 'Understandable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-parts'
          }
        ],
        related: [],
        url: "https://act-rules.github.io/rules/de46e4",
        passed: 0,
        warning: 0,
        failed: 0,
        type: ["ACTRule", "TestCase"],
        a11yReq: ["WCAG21:language"],
        outcome: "",
        description: ""
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: ElementHandle | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: ACTRuleResult = {
      verdict: "",
      description: "",
      resultCode: ""
    };

    const [htmlCode, pointer] = await Promise.all([
      DomUtils.getElementHtmlCode(element),
      DomUtils.getElementSelector(element)
    ]);

    evaluation.htmlCode = htmlCode;
    evaluation.pointer = pointer;

    //check if is visible and not in accessibility tree
    let visible = await DomUtils.isElementVisible(element);
    if (!visible) {
      evaluation.verdict = "inapplicable";
      evaluation.description = `The element is not visible, and not included in the accessibility tree`;
      evaluation.resultCode = "RC1";
      super.addEvaluationResult(evaluation);
      return;
    }

    //if input type = hidden, button,submit or reset
    let tag = await DomUtils.getElementTagName(element);

    if (tag === "input" || tag === "select" || tag === "textarea") {
      if (tag === "input") {
        let type = await DomUtils.getElementAttribute(element, "type");
        let disabled = await DomUtils.elementHasAttribute(element, "disabled");
        if (disabled) {
          evaluation.verdict = "inapplicable";
          evaluation.description = `The element is disabled`;
          evaluation.resultCode = "RC2";
          super.addEvaluationResult(evaluation);
          return;
        }
        if (
          type === "hidden" ||
          type === "button" ||
          type === "submit" ||
          type === "reset"
        ) {
          evaluation.verdict = "inapplicable";
          evaluation.description = `The element is an input element with a type property of hidden, button, submit or reset`;
          evaluation.resultCode = "RC3";
          super.addEvaluationResult(evaluation);
          return;
        }
      }
      //aria-disable true
      let ariaDisable = await DomUtils.getElementAttribute(
        element,
        "aria-disabled"
      );

      if (ariaDisable === "true") {
        evaluation.verdict = "inapplicable";
        evaluation.description = `The element has an aria-disabled="true" attribute`;
        evaluation.resultCode = "RC4";
        super.addEvaluationResult(evaluation);
        return;
      }

      //sequencial focus nav and has semantic role that is not widget role
      let widgetRole = await AccessibilityUtils.isElementWidget(element);
      if (!widgetRole) {
        evaluation.verdict = "inapplicable";
        evaluation.description = `The element is not part of sequential focus navigation and has a semantic role that is not a widget role.`;
        evaluation.resultCode = "RC5";
        super.addEvaluationResult(evaluation);
        return;
      }

      //check the focus
      let isFocusable = await DomUtils.isElementFocusable(element);
      if (!isFocusable) {
        //inapplicable
      }

      let autoComplete = await DomUtils.getElementAttribute(
        element,
        "autoComplete"
      );
      autoComplete = autoComplete.trim();

      if (autoComplete === "") {
        evaluation.verdict = "inapplicable";
        evaluation.description = `Autocomplete attribute contains no tokens.`;
        evaluation.resultCode = "RC6";
        super.addEvaluationResult(evaluation);
        return;
      }

      let correctAutocompleteField = await this.isCorrectAutocompleteField(element, autoComplete);
      if (!correctAutocompleteField) {
        evaluation.verdict = "failed";
        evaluation.description = `autocomplete not valid.`;
        evaluation.resultCode = "RC8";
        super.addEvaluationResult(evaluation);
        return;
      } else {
        evaluation.verdict = "passed";
        evaluation.description = `valid autocomplete.`;
        evaluation.resultCode = "RC9";
        super.addEvaluationResult(evaluation);
        return;
      }
    } else {
      evaluation.verdict = "inapplicable";
      evaluation.description = `The element is not valid`;
      evaluation.resultCode = "RC7";
      super.addEvaluationResult(evaluation);
      return;
    }

  }

  isAutoCompleteField(field: string): boolean {
    try {
      return this.autoCompleteTable.correctTerms.includes(field.toLowerCase());
    } catch (err) {
      return false;
    }
  }

  isModifier(field: string): boolean {
    try {
      return this.autoCompleteTable.modifiers.includes(field.toLowerCase());
    } catch (err) {
      return false;
    }
  }

  isValidModifier(modifier: string, field: string): boolean {
    try {
      return this.autoCompleteTable[modifier.toLowerCase()].includes(field.toLowerCase());
    } catch (err) {
      return false;
    }
  }

  async isText(element: ElementHandle): Promise<boolean> {
    let tag = await DomUtils.getElementTagName(element);
    if (tag === "input") {
      let type = await DomUtils.getElementAttribute(element, "type");
      if (type === null || type === "hidden" || type === "text" || type === "search")
        return true;
    } else if (tag === "textarea" || tag === "select") {
      return true;
    }
    return false;
  }

  async isMultiline(element: ElementHandle): Promise<boolean> {
    let tag = await DomUtils.getElementTagName(element);
    if (tag === "input") {
      let type = await DomUtils.getElementAttribute(element, "type");
      if (type === null || type === "hidden")
        return true;
    } else if (tag === "textarea" || tag === "select") {
      return true;
    }
    return false;
  }

  async isPassword(element: ElementHandle): Promise<boolean> {
    let tag = await DomUtils.getElementTagName(element);
    if (tag === "input") {
      let type = await DomUtils.getElementAttribute(element, "type");
      if (type === null || type === "hidden" || type === "text" || type === "search" || type === "password")
        return true;
    } else if (tag === "textarea" || tag === "select")
      return true;

    return false;
  }

  async isURL(element: ElementHandle): Promise<boolean> {
    let tag = await DomUtils.getElementTagName(element);
    if (tag === "input") {
      let type = await DomUtils.getElementAttribute(element, "type");
      if (type === null || type === "hidden" || type === "text" || type === "search" || type === "url")
        return true;
    } else if (tag === "textarea" || tag === "select")
      return true;

    return false;
  }

  async isEmail(element: ElementHandle): Promise<boolean> {
    let tag = await DomUtils.getElementTagName(element);
    if (tag === "input") {
      let type = await DomUtils.getElementAttribute(element, "type");
      if (type === null || type === "hidden" || type === "text" || type === "search" || type === "email")
        return true;
    } else if (tag === "textarea" || tag === "select")
      return true;

    return false;
  }

  async isTel(element: ElementHandle): Promise<boolean> {
    let tag = await DomUtils.getElementTagName(element);
    if (tag === "input") {
      let type = await DomUtils.getElementAttribute(element, "type");
      if (type === null || type === "hidden" || type === "text" || type === "search" || type === "tel")
        return true;
    } else if (tag === "textarea" || tag === "select")
      return true;

    return false;
  }

  async isNumeric(element: ElementHandle): Promise<boolean> {
    let tag = await DomUtils.getElementTagName(element);
    if (tag === "input") {
      let type = await DomUtils.getElementAttribute(element, "type");
      if (type === null || type === "hidden" || type === "text" || type === "search" || type === "number")
        return true;
    } else if (tag === "textarea" || tag === "select")
      return true;

    return false;
  }

  async isMonth(element: ElementHandle): Promise<boolean> {
    let tag = await DomUtils.getElementTagName(element);
    if (tag === "input") {
      let type = await DomUtils.getElementAttribute(element, "type");
      if (type === null || type === "hidden" || type === "text" || type === "search" || type === "month")
        return true;
    } else if (tag === "textarea" || tag === "select")
      return true;

    return false;
  }

  async isDate(element: ElementHandle): Promise<boolean> {
    let tag = await DomUtils.getElementTagName(element);
    if (tag === "input") {
      let type = await DomUtils.getElementAttribute(element, "type");
      if (type === null || type === "hidden" || type === "text" || type === "search" || type === "date")
        return true;
    } else if (tag === "textarea" || tag === "select")
      return true;

    return false;
  }

  async isAppropriateFieldForTheFormControl(field: string, element: ElementHandle): Promise<boolean> {
    let fieldControl = this.autoCompleteTable.fieldControl[field.toLowerCase()];
    
    switch (fieldControl) {
      case "text":
        return await this.isText(element);
      case "multiline":
        return await this.isMultiline(element);
      case "password":
        return await this.isPassword(element);
      case "url":
        return await this.isURL(element);
      case "email":
        return await this.isEmail(element);
      case "tel":
        return await this.isTel(element);
      case "numeric":
        return await this.isNumeric(element);
      case "month":
        return await this.isMonth(element);
      case "date":
        return await this.isDate(element);
    }

    return false;
  }

  async isCorrectAutocompleteField(element: ElementHandle, autoCompleteField: string): Promise<boolean> {
    let fields = autoCompleteField.split(" ");

    if (fields[0].startsWith("section-"))
      fields.splice(0, 1);

    let field;
    let lastField = "";
    for (let i = fields.length - 1; i > -1; i--) {
      field = fields[i].toLowerCase();

      if (this.isModifier(field)) {
        if (!(field === "shipping" || field === "billing")) {
          if (!this.isValidModifier(field, lastField)) {
            return false;
          }
        }
      } else if (!this.isAutoCompleteField(field)) {
        return false;
      } else {
        let isAppropriate = await this.isAppropriateFieldForTheFormControl(field, element);
        if (!isAppropriate)
          return false;
      }

      lastField = field;
    }
    return true;
  }
}

export = QW_ACT_R24;
