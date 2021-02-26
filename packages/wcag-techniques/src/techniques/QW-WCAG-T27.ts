import { WCAGTechniqueResult } from "@qualweb/wcag-techniques";
import Technique from "../lib/Technique.object";
import { QWElement } from "@qualweb/qw-element";
import { WCAGTechnique, ElementExists } from "../lib/decorators";

@WCAGTechnique
class QW_WCAG_T27 extends Technique {
  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement): void {
    const evaluation: WCAGTechniqueResult = {
      verdict: "",
      description: "",
      resultCode: "",
    };

    const alignAttribute = element.getElementStyleProperty("text-align", null);

    if (alignAttribute) {
      if (alignAttribute.includes("justify")) {
        evaluation.verdict = "failed";
        evaluation.description = "This content shouldn't be justified";
        evaluation.resultCode = "RC1";
      } else {
        evaluation.verdict = "passed";
        evaluation.description = "This content is not justified";
        evaluation.resultCode = "RC2";
      }

      super.addEvaluationResult(evaluation, element);
    }
  }
}

export = QW_WCAG_T27;
