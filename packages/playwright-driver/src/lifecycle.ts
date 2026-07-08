import type { LoadEvent } from '@qualweb/core';

/**
 * Playwright's own life cycle event union.
 */
export type PlaywrightLifeCycleEvent = 'load' | 'domcontentloaded' | 'networkidle' | 'commit';

/**
 * Maps QualWeb {@link LoadEvent}s (which carry Puppeteer's literal values,
 * including `networkidle0`/`networkidle2`) to Playwright's nearest
 * equivalent. Puppeteer distinguishes "no connections for 500ms"
 * (networkidle0) from "at most 2 connections for 500ms" (networkidle2);
 * Playwright only has `networkidle` (no connections for 500ms).
 *
 * Puppeteer also accepts an *array* of events and waits for all of them;
 * Playwright accepts a single event. Since the events are strictly ordered
 * (networkidle implies load implies domcontentloaded), waiting for all is
 * the same as waiting for the strongest, which is what this returns.
 */
export function mapLoadEvent(waitUntil?: LoadEvent | LoadEvent[]): PlaywrightLifeCycleEvent | undefined {
  if (waitUntil === undefined) {
    return undefined;
  }

  const events = Array.isArray(waitUntil) ? waitUntil : [waitUntil];

  if (events.length === 0) {
    return undefined;
  }

  if (events.includes('networkidle0') || events.includes('networkidle2')) {
    return 'networkidle';
  }
  if (events.includes('load')) {
    return 'load';
  }
  return 'domcontentloaded';
}
