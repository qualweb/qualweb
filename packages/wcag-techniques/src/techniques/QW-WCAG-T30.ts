import { WCAGTechniqueResult } from "@qualweb/wcag-techniques";
import Technique from "../lib/Technique.object";
import { WCAGTechnique, ElementExists } from "../lib/decorators";
import { QWElement } from "@qualweb/qw-element";

@WCAGTechnique
class QW_WCAG_T30 extends Technique {
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

    if (element.elementHasAttribute("_cssRules")) {
      const cssRules = element.getCSSRules();

      const property = this.findTextDecorationWithBlink(cssRules);

      if (property !== undefined) {
        evaluation.verdict = "failed";
        evaluation.description =
          "This test target has a `text-decoration` property with the value `blink";
        evaluation.resultCode = "RC1";
        evaluation.elements = [
          {
            pointer: element.getElementSelector(),
            htmlCode: element.getElementHtmlCode(true, true),
            property: {
              name: "text-decoration",
              value: "blink",
            },
            stylesheetFile: property.pointer,
          },
        ];

        super.addEvaluationResult(evaluation);
      }
    }
  }

  private findTextDecorationWithBlink(properties: any): any {
    for (const property in properties || {}) {
      if (property === "media") {
        const mediaRule = this.findInMediaRules(properties["media"]);
        if (mediaRule !== undefined) {
          return mediaRule;
        }
      } else if (property === "text-decoration") {
        if (properties[property]["value"] === "blink") {
          return properties[property];
        }
      }
    }

    return undefined;
  }

  private findInMediaRules(media: any): any {
    for (const condition in media || {}) {
      for (const property in media[condition] || {}) {
        if (property === "text-decoration") {
          if (media[condition][property]["value"] === "blink") {
            return media[condition][property];
          }
        }
      }
    }

    return undefined;
  }
}

export = QW_WCAG_T30;
