declare module "@qualweb/counter" {
  import { QWPage } from "@qualweb/qw-page";

  interface Roles {
    [role: string]: number;
  }

  interface Tags {
    [tag: string]: number;
  }

  interface CounterResult {
    roles: Roles;
    tags: Tags;
  }

  interface CounterReport {
    type: "counter";
    data: CounterResult;
  }

  function executeCounter(page: QWPage): Promise<CounterReport>;

  export { CounterResult, CounterReport, Roles, Tags, executeCounter };
}
