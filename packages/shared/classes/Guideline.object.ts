import { Assertion, Principle, Level } from '../types';

export abstract class Guideline {
  public abstract getCode(): string;
  public abstract getMapping(): string;
  public abstract hasPrincipleAndLevels(principles: Principle[], levels: Level[]): boolean;
  public abstract getFinalResults(): Assertion;
}
