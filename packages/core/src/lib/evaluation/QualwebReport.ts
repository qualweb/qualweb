import { ModulesData } from './ModulesData';
import { SystemData } from './SystemData';
import { Metadata } from './Metadata';

export type QualwebReport = {
  type: 'evaluation';
  system: SystemData;
  metadata: Metadata;
  modules: ModulesData;
};
