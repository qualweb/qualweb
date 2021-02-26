import { WCAGTechniqueResult } from "@qualweb/wcag-techniques";
import Technique from "../lib/Technique.object";
import { WCAGTechnique } from "../lib/decorators";

@WCAGTechnique
class QW_WCAG_T22 extends Technique {
  constructor(technique?: any) {
    super(technique);
  }

  execute(): void {
    throw new Error("Method not implemented.");
  }

  validate(newTabWasOpen: boolean): void {
    const evaluation: WCAGTechniqueResult = {
      verdict: "",
      description: "",
      resultCode: "",
    };

    if (!newTabWasOpen) {
      evaluation.verdict = "passed";
      evaluation.description = `Browser didn't open new tab`;
      evaluation.resultCode = "RC1";
    } else {
      evaluation.verdict = "failed";
      evaluation.description = `Browser opened a new tab`;
      evaluation.resultCode = "RC2";
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_WCAG_T22;
