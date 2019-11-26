'use strict';

import _ from 'lodash';
import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';
import {
  DomElement
} from 'htmlparser2';
import {AccessibilityTreeUtils, DomUtils} from '@qualweb/util';
import Technique from "./Technique.object";
import {remove, trim} from 'lodash';

const stew = new (require('stew-select')).Stew();

const technique: HTMLTechnique = {
  name: 'Using id and headers attributes to associate data cells with header cells in data tables',
  code: 'QW-HTML-T17',
  mapping: 'H43',
  description: 'This technique checks if data cells are associated with header cells in data tables',
  metadata: {
    target: {
      element: 'table'
    },
    'success-criteria': [{
      name: '1.3.1',
      level: 'A',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships'
    }],
    related: [],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H43',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<HTMLTechniqueResult>()
};

class QW_HTML_T17 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined, processedHTML: DomElement[]): Promise<void> {
    if (element === undefined) {
      return;
    }
    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let hasIds = stew.select(element, "[id]");
    let hasHeaders = stew.select(element, "[headers]");
    let genId = RegExp("qw-generated-id-");

    remove(hasIds, function (idElem: DomElement) {
      // @ts-ignore
      return genId.test(idElem["attribs"]["id"])
    });

    if (!AccessibilityTreeUtils.isDataTable(element, processedHTML)) {
      if (hasIds.length > 0 || hasHeaders.length > 0) {
        evaluation.verdict = 'failed';
        evaluation.description = 'This table is a layout table with id or headers attributes';
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'This table is a layout table';
        evaluation.resultCode = 'RC2';
      }
    } else {
      if (doesTableHaveDuplicateIds(element)) {
        evaluation.verdict = 'failed';
        evaluation.description = 'There are duplicate ids in this data table';
        evaluation.resultCode = 'RC3';
      } else if (hasHeaders.length <= 0) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'No header attributes are used in this data table';
        evaluation.resultCode = 'RC4';
      } else {
        let headersElements = stew.select(element, "[headers]");
        let headersMatchId = true;
        for (let headerElem of headersElements) {
          if (headersMatchId) {
            headersMatchId = doesHeadersMatchId(element, headerElem.attribs.headers);
          }
        }

        if (headersMatchId) {
          evaluation.verdict = 'passed';
          evaluation.description = 'id and headers attributes are correctly used';
          evaluation.resultCode = 'RC5';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'id and headers attributes are not correctly used';
          evaluation.resultCode = 'RC6';
        }
      }
    }

    evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
    evaluation.pointer = DomUtils.getElementSelector(element);

    console.log(evaluation.resultCode);
    super.addEvaluationResult(evaluation);
  }
}

function doesTableHaveDuplicateIds(table: DomElement) {
  let elementsId = stew.select(table, '[id]');
  let duplicate = false;
  let counter;

  for (let elementId of elementsId) {
    counter = 0;
    for (let elementId2 of elementsId) {
      if (elementId.attribs["id"] === elementId2.attribs["id"]) {
        counter++;
      }
      if (counter > 1) {
        duplicate = true;
        break;
      }
    }
  }
  return duplicate;
}

function doesHeadersMatchId(table, headers) {
  let outcome = false;
  let result = 0;
  if (trim(headers) === '') {
    return true;
  }
  let splitHeaders = headers.split(" ");

  for (let header of splitHeaders) {
    let matchingIdElem = stew.select(table, '[id="' + header + '"]')[0];
    if (matchingIdElem !== undefined) {
      let matchingIdElemHeaders = matchingIdElem.attribs["headers"];
      if (splitHeaders.length === 1 && matchingIdElemHeaders === undefined) {
        outcome = true;
      } else if (matchingIdElemHeaders !== undefined) {
        for (let headerIdElem of matchingIdElemHeaders.split(" ")) {
          if (splitHeaders.indexOf(headerIdElem) >= 0 && headerIdElem !== header) {
            result++;
          }
        }
        if (result === matchingIdElemHeaders.split(" ").length) {
          outcome = true;
          break;
        }
      }
    }
  }
  return outcome;
}

export = QW_HTML_T17;
