export type CounterResult = {
  roles: Record<string, number>;
  tags: Record<string, number>;
};

export type CounterReport = {
  type: 'counter';
  data: CounterResult;
};
