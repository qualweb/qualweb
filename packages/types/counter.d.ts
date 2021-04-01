declare module "@qualweb/counter" {

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

  function executeCounter(): Promise<CounterReport>;

  export { CounterResult, CounterReport, Roles, Tags, executeCounter };
}
