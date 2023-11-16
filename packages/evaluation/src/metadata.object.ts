class Metadata {
  private passed: number;
  private warning: number;
  private failed: number;
  private inapplicable: number;

  constructor() {
    this.passed = 0;
    this.warning = 0;
    this.failed = 0;
    this.inapplicable = 0;
  }

  public addPassedResults(results: number): void {
    this.passed += results;
  }

  public addWarningResults(results: number): void {
    this.warning += results;
  }

  public addFailedResults(results: number): void {
    this.failed += results;
  }

  public addInapplicableResults(results: number): void {
    this.inapplicable += results;
  }

  public getResults(): { passed: number; failed: number; warning: number; inapplicable: number } {
    return {
      passed: this.passed,
      warning: this.warning,
      failed: this.failed,
      inapplicable: this.inapplicable
    };
  }
}

export = Metadata;
