export type CounterResult = {
  roles: Record<string, number>;
  tags: Record<string, number>;
};

// FIXME: I think this type is outside of core's scope, and should be worked into @qualweb/counter
export type CounterReport = {
  type: 'counter';
  data: CounterResult;
};
