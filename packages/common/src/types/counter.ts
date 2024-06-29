export type RolesCount = {
  [role: string]: number;
};

export type TagsCount = {
  [tag: string]: number;
};

export type CounterResult = {
  roles: RolesCount;
  tags: TagsCount;
};

export type CounterReport = {
  type: 'counter';
  data: CounterResult;
};
