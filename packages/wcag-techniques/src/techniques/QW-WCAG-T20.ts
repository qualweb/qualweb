import { WCAGTechniqueResult } from "@qualweb/wcag-techniques";
import Technique from "../lib/Technique.object";
import { QWElement } from "@qualweb/qw-element";
import {
  WCAGTechnique,
  ElementExists,
  ElementHasAttribute,
} from "../lib/decorators";

@WCAGTechnique
class QW_WCAG_T20 extends Technique {
  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  @ElementHasAttribute("title")
  execute(element: QWElement): void {
    const evaluation: WCAGTechniqueResult = {
      verdict: "",
      description: "",
      resultCode: "",
    };

    const title = (<string>element.getElementAttribute("title")).trim();
    const text = element.getElementText().trim();

    if (!title) {
      evaluation.verdict = "failed";
      evaluation.description = `The element's title attribute is empty`;
      evaluation.resultCode = "RC1";
    } else if (title === text) {
      evaluation.verdict = "failed";
      evaluation.description = `The element contains a title attribute equal to the text in the link`;
      evaluation.resultCode = "RC2";
    } else {
      evaluation.verdict = "warning";
      evaluation.description = `Please verify that the element's title attribute describes correctly the link`;
      evaluation.resultCode = "RC3";
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T20;
