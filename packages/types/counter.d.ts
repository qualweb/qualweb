declare module '@qualweb/counter' {
  export type Roles = {
    [role: string]: number;
  };

  export type Tags = {
    [tag: string]: number;
  };

  export type CounterResult = {
    roles: Roles;
    tags: Tags;
  };

  type CounterReport = {
    type: 'counter';
    data: CounterResult;
  };

  export function executeCounter(): Promise<CounterReport>;
}
