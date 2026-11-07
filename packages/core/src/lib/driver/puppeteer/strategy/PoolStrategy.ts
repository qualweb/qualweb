import type { DriverPool } from '../../types';
import type { ResolvedChrome } from '../browser/resolveChrome';

export interface PoolRequest {
  chrome: ResolvedChrome;
  maxConcurrency: number;
  /** Per-task timeout, in milliseconds. */
  timeout: number;
  monitor: boolean;
}

/** Knows how to build a {@link DriverPool} for a given execution mode. */
export interface PoolStrategy {
  launch(request: PoolRequest): Promise<DriverPool>;
}