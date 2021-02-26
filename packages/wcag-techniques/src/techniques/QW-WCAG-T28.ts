import { WCAGTechniqueResult } from "@qualweb/wcag-techniques";
import Technique from "../lib/Technique.object";
import { WCAGTechnique, ElementExists } from "../lib/decorators";
import { QWElement } from "@qualweb/qw-element";

@WCAGTechnique
class QW_WCAG_T28 extends Technique {
  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement): void {
    if (element.getElementTagName() === "style") {
      const sheet = <any>element.getElementProperty("sheet");
      for (const rule of sheet.cssRules || []) {
        const style = rule?.style?.cssText;
        if (style) {
          this.checkCssProperty(style, element);
        }
      }
    } else {
      const style = <string>element.getElementAttribute("style");
      this.checkCssProperty(style, element);
    }
  }

  private checkCssProperty(style: string, element: QWElement): void {
    const evaluation: WCAGTechniqueResult = {
      verdict: "",
      description: "",
      resultCode: "",
    };

    const properties = style.split(";").filter((p) => p.trim() !== "") || [
      style,
    ];

    for (const property of properties) {
      if (property.includes("font-size")) {
        const fontSize = property.split(":")[1];
        const hasImportant = fontSize.includes("!important");

        if (hasImportant) {
          const value = fontSize.replace("!important", "").trim();
          const hasAbsoluteUnit =
            value.endsWith("cm") ||
            value.endsWith("mm") ||
            value.endsWith("in") ||
            value.endsWith("px") ||
            value.endsWith("pt") ||
            value.endsWith("pc");

          if (!hasAbsoluteUnit) {
            evaluation.verdict = "passed";
            evaluation.description =
              "This test target has a font-size css property using an relative unit value with the important flag.";
            evaluation.resultCode = "RC1";
          } else {
            evaluation.verdict = "failed";
            evaluation.description =
              "This test target has a font-size css property using an absolute unit value with the important flag.";
            evaluation.resultCode = "RC2";
          }
          evaluation.elements = [
            {
              pointer: element.getElementSelector(),
              htmlCode: element.getElementHtmlCode(true, true),
            },
          ];
          evaluation.attributes = property;

          super.addEvaluationResult(evaluation);
        }
      }
    }
  }
}

export = QW_WCAG_T28;
