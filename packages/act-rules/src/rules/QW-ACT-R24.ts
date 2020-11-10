import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";
import {QWPage} from "@qualweb/qw-page";

@ACTRuleDecorator
class QW_ACT_R24 extends Rule {
  
  private autoCompleteTable = {
    'home': [
      'tel',
      'tel-country-code',
      'tel-national',
      'tel-area-code',
      'tel-local',
      'tel-local-prefix',
      'tel-local-suffix',
      'tel-extension',
      'email',
      'impp'
    ],
    'work': [
      'tel',
      'tel-country-code',
      'tel-national',
      'tel-area-code',
      'tel-local',
      'tel-local-prefix',
      'tel-local-suffix',
      'tel-extension',
      'email',
      'impp'
    ],
    'mobile': [
      'tel',
      'tel-country-code',
      'tel-national',
      'tel-area-code',
      'tel-local',
      'tel-local-prefix',
      'tel-local-suffix',
      'tel-extension',
      'email',
      'impp'
    ],
    'fax': [
      'tel',
      'tel-country-code',
      'tel-national',
      'tel-area-code',
      'tel-local',
      'tel-local-prefix',
      'tel-local-suffix',
      'tel-extension',
      'email',
      'impp'
    ],
    'pager': [
      'tel',
      'tel-country-code',
      'tel-national',
      'tel-area-code',
      'tel-local',
      'tel-local-prefix',
      'tel-local-suffix',
      'tel-extension',
      'email',
      'impp'
    ],
    'modifiers': [
      'pager',
      'fax',
      'mobile',
      'work',
      'home',
      'shipping',
      'billing'
    ],
    'correctTerms': [
      'name',
      'honorific-prefix',
      'given-name',
      'additional-name',
      'family-name',
      'honorific-suffix',
      'nickname',
      'organization-title',
      'username',
      'new-password',
      'current-password',
      'organization',
      'street-address',
      'address-line1',
      'address-line2',
      'address-line3',
      'address-level4',
      'address-level3',
      'address-level2',
      'address-level1',
      'country',
      'country-name',
      'postal-code',
      'cc-name',
      'cc-given-name',
      'cc-additional-name',
      'cc-family-name',
      'cc-number',
      'cc-exp',
      'cc-exp-month',
      'cc-exp-year',
      'cc-csc',
      'cc-type',
      'transaction-currency',
      'transaction-amount',
      'language',
      'bday',
      'bday-day',
      'bday-month',
      'bday-year',
      'sex',
      'url',
      'photo',
      'tel',
      'tel-country-code',
      'tel-national',
      'tel-area-code',
      'tel-local',
      'tel-local-prefix',
      'tel-local-suffix',
      'tel-extension',
      'email',
      'impp'
    ],
    'fieldControl': {
      'name': 'text',
      'honorific-prefix': 'text',
      'given-name': 'text',
      'additional-name': 'text',
      'family-name': 'text',
      'honorific-suffix': 'text',
      'nickname': 'text',
      'organization-title': 'text',
      'username': 'text',
      'new-password': 'password',
      'current-password': 'password',
      'organization': 'text',
      'street-address': 'multiline',
      'address-line1': 'text',
      'address-line2': 'text',
      'address-line3': 'text',
      'address-level4': 'text',
      'address-level3': 'text',
      'address-level2': 'text',
      'address-level1': 'text',
      'country': 'text',
      'country-name': 'text',
      'postal-code': 'text',
      'cc-name': 'text',
      'cc-given-name': 'text',
      'cc-additional-name': 'text',
      'cc-family-name': 'text',
      'cc-number': 'text',
      'cc-exp': 'month',
      'cc-exp-month': 'numeric',
      'cc-exp-year': 'numeric',
      'cc-csc': 'text',
      'cc-type': 'text',
      'transaction-currency': 'text',
      'transaction-amount': 'numeric',
      'language': 'text',
      'bday': 'date',
      'bday-day': 'numeric',
      'bday-month': 'numeric',
      'bday-year': 'numeric',
      'sex': 'text',
      'url': 'url',
      'photo': 'url',
      'tel': 'tel',
      'tel-country-code': 'text',
      'tel-national': 'text',
      'tel-area-code': 'text',
      'tel-local': 'text',
      'tel-local-prefix': 'text',
      'tel-local-suffix': 'text',
      'tel-extension': 'text',
      'email': 'email',
      'impp': 'url'
    }
  };

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    //check if is visible and not in accessibility tree
    const visible = DomUtils.isElementVisible(element,page);
    if (!visible) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The element is not visible, and not included in the accessibility tree`;
      evaluation.resultCode = 'RC1';
      super.addEvaluationResult(evaluation, element);
      return;
    }

    //if input type = hidden, button,submit or reset
    const tag = element.getElementTagName();

    if (tag === 'input' || tag === 'select' || tag === 'textarea') {
      if (tag === 'input') {
        const type = element.getElementAttribute('type');
        const disabled = element.elementHasAttribute('disabled');
        if (disabled) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target is disabled.`;
          evaluation.resultCode = 'RC2';
          super.addEvaluationResult(evaluation, element);
          return;
        }
        if (
          type === 'hidden' ||
          type === 'button' ||
          type === 'submit' ||
          type === 'reset'
        ) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target is an \`input\` element with a type property of \`hidden, button, submit or reset\`.`;
          evaluation.resultCode = 'RC3';
          super.addEvaluationResult(evaluation, element);
          return;
        }
      }
      //aria-disable true
      const ariaDisable = element.getElementAttribute('aria-disabled');

      if (ariaDisable === 'true') {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target has an \`aria-disabled='true'\` attribute.`;
        evaluation.resultCode = 'RC4';
        super.addEvaluationResult(evaluation);
        return;
      }

      //sequencial focus nav and has semantic role that is not widget role
      const isFocusable = AccessibilityUtils.isPartOfSequentialFocusNavigation(element,page);
      const widgetRole = AccessibilityUtils.isElementWidget(element, page);

      if (!isFocusable && !widgetRole) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target is not part of sequential focus navigation and has a semantic role that is not a widget role.`;
        evaluation.resultCode = 'RC5';
        super.addEvaluationResult(evaluation, element);
        return;
      }

      let autoComplete = element.getElementAttribute('autoComplete');

      if (autoComplete) {
        autoComplete = autoComplete.trim();
        if (autoComplete === '') {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target \`autocomplete\` attribute contains no tokens.`;
          evaluation.resultCode = 'RC6';
          super.addEvaluationResult(evaluation, element);
          return;
        }

        const correctAutocompleteField = this.isCorrectAutocompleteField(element, autoComplete);
        if (!correctAutocompleteField) {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target \`autocomplete\` attribute is not valid.`;
          evaluation.resultCode = 'RC8';
          super.addEvaluationResult(evaluation, element);
          return;
        } else {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target has a valid \`autocomplete\` attribute.`;
          evaluation.resultCode = 'RC9';
          super.addEvaluationResult(evaluation, element);
          return;
        }
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target is not a \`input, select or textarea\`.`;
      evaluation.resultCode = 'RC7';
      super.addEvaluationResult(evaluation, element);
      return;
    }

  }

  private isAutoCompleteField(field: string): boolean {
    try {
      return this.autoCompleteTable.correctTerms.includes(field.toLowerCase());
    } catch (err) {
      return false;
    }
  }

  private isModifier(field: string): boolean {
    try {
      return this.autoCompleteTable.modifiers.includes(field.toLowerCase());
    } catch (err) {
      return false;
    }
  }

  private isValidModifier(modifier: string, field: string): boolean {
    try {
      //@ts-ignore
      return this.autoCompleteTable[modifier.toLowerCase()].includes(field.toLowerCase());
    } catch (err) {
      return false;
    }
  }

  private isText(element: QWElement): boolean {
    const tag = element.getElementTagName();
    if (tag === 'input') {
      const type = element.getElementAttribute('type');
      if (type === null || type === 'hidden' || type === 'text' || type === 'search') {
        return true;
      }
    } else if (tag === 'textarea' || tag === 'select') {
      return true;
    }
    return false;
  }

  private isMultiline(element: QWElement): boolean {
    const tag = element.getElementTagName();
    if (tag === 'input') {
      const type = element.getElementAttribute('type');
      if (type === null || type === 'hidden') {
        return true;
      }
    } else if (tag === 'textarea' || tag === 'select') {
      return true;
    }
    return false;
  }

  private isPassword(element: QWElement): boolean {
    const tag = element.getElementTagName();
    if (tag === 'input') {
      const type = element.getElementAttribute('type');
      if (type === null || type === 'hidden' || type === 'text' || type === 'search' || type === 'password') {
        return true;
      }
    } else if (tag === 'textarea' || tag === 'select') {
      return true;
    }

    return false;
  }

  private isURL(element: QWElement): boolean {
    const tag = element.getElementTagName();
    if (tag === 'input') {
      const type = element.getElementAttribute('type');
      if (type === null || type === 'hidden' || type === 'text' || type === 'search' || type === 'url') {
        return true;
      }
    } else if (tag === 'textarea' || tag === 'select') {
      return true;
    }

    return false;
  }

  private isEmail(element: QWElement): boolean {
    const tag = element.getElementTagName();
    if (tag === 'input') {
      const type = element.getElementAttribute('type');
      if (type === null || type === 'hidden' || type === 'text' || type === 'search' || type === 'email') {
        return true;
      }
    } else if (tag === 'textarea' || tag === 'select') {
      return true;
    }

    return false;
  }

  private isTel(element: QWElement): boolean {
    const tag = element.getElementTagName();
    if (tag === 'input') {
      const type = element.getElementAttribute('type');
      if (type === null || type === 'hidden' || type === 'text' || type === 'search' || type === 'tel') {
        return true;
      }
    } else if (tag === 'textarea' || tag === 'select') {
      return true;
    }

    return false;
  }

  private isNumeric(element: QWElement): boolean {
    const tag = element.getElementTagName();
    if (tag === 'input') {
      const type = element.getElementAttribute('type');
      if (type === null || type === 'hidden' || type === 'text' || type === 'search' || type === 'number') {
        return true;
      }
    } else if (tag === 'textarea' || tag === 'select') {
      return true;
    }

    return false;
  }

  private isMonth(element: QWElement): boolean {
    const tag = element.getElementTagName();
    if (tag === 'input') {
      const type = element.getElementAttribute( 'type');
      if (type === null || type === 'hidden' || type === 'text' || type === 'search' || type === 'month') {
        return true;
      }
    } else if (tag === 'textarea' || tag === 'select') {
      return true;
    }

    return false;
  }

  private isDate(element: QWElement): boolean {
    const tag = element.getElementTagName();
    if (tag === 'input') {
      const type = element.getElementAttribute('type');
      if (type === null || type === 'hidden' || type === 'text' || type === 'search' || type === 'date') {
        return true;
      }
    } else if (tag === 'textarea' || tag === 'select') {
      return true;
    }

    return false;
  }

  private isAppropriateFieldForTheFormControl(field: string, element: QWElement): boolean{
    //@ts-ignore
    const fieldControl = this.autoCompleteTable.fieldControl[field.toLowerCase()];
    
    switch (fieldControl) {
      case 'text':
        return this.isText(element);
      case 'multiline':
        return this.isMultiline(element);
      case 'password':
        return this.isPassword(element);
      case 'url':
        return this.isURL(element);
      case 'email':
        return this.isEmail(element);
      case 'tel':
        return this.isTel(element);
      case 'numeric':
        return this.isNumeric(element);
      case 'month':
        return this.isMonth(element);
      case 'date':
        return this.isDate(element);
    }

    return false;
  }

  private isCorrectAutocompleteField(element: QWElement, autoCompleteField: string): boolean {
    const fields = autoCompleteField.split(' ');

    if (fields[0].startsWith('section-'))
      fields.splice(0, 1);

    let field;
    let lastField = '';
    for (let i = fields.length - 1; i > -1; i--) {
      field = fields[i].toLowerCase();

      if (this.isModifier(field)) {
        if (!(field === 'shipping' || field === 'billing')) {
          if (!this.isValidModifier(field, lastField)) {
            return false;
          }
        }
      } else if (!this.isAutoCompleteField(field)) {
        return false;
      } else {
        let isAppropriate = this.isAppropriateFieldForTheFormControl(field, element);
        if (!isAppropriate) {
          return false;
        }
      }

      lastField = field;
    }
    return true;
  }
}

export = QW_ACT_R24;
