import { ClusterPoolStrategy } from './ClusterPoolStrategy';
import type { PoolStrategy } from './PoolStrategy';
import { StandalonePoolStrategy } from './StandalonePoolStrategy';

/** Picks the pool strategy from the `useCluster` flag. */
export function createPoolStrategy(useCluster: boolean = true): PoolStrategy {
  return useCluster ? new ClusterPoolStrategy() : new StandalonePoolStrategy();
}