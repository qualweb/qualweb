import type { QWElement } from '@qualweb/qw-element';
import { Test, Verdict } from '@qualweb/core/evaluation';

type ExecuteMethod = (element?: QWElement) => Promise<void>;

export function QWBrowserTest(
  _target: any,
  _propertyKey: string,
  descriptor: TypedPropertyDescriptor<ExecuteMethod>
) {
  if (!descriptor.value) return;


  descriptor.value = async function (this: any, element?: QWElement): Promise<void> {
    const test = new Test();

    const outcome = this.testResult?.result;
    let verdict: Verdict;
    let resultCode: string;

    switch (outcome) {
      case "passed":
        verdict = Verdict.PASSED;
        resultCode = "P1";
        break;
      case "failed":
        verdict = Verdict.FAILED;
        resultCode = "F1";
        break;
      case "warning":
        verdict = Verdict.WARNING;
        resultCode = "W1";
        break;
      case undefined:
        verdict = Verdict.INAPPLICABLE;
        resultCode = "I1";
        break;
      default:
        verdict = Verdict.INAPPLICABLE;
        resultCode = "I2";
    }

    test.verdict = verdict;
    test.resultCode = resultCode;
    if (element && ["passed", "failed", "warning"].includes(outcome)) {
      test.addElement(element);
    }

    if (typeof this.addTestResult === "function") {
      this.addTestResult(test);
    }
  };
}