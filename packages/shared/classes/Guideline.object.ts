import { QWElement } from '@packages/qw-element/src';
import { Assertion, Principle, Level } from '../types';

export abstract class Guideline {
  public abstract getCode(): string;
  public abstract getMapping(): string;
  public abstract hasPrincipleAndLevels(principles: Principle[], levels: Level[]): boolean;
  public abstract execute?(element?: QWElement): void;
  public abstract getFinalResults(): Assertion;
}
