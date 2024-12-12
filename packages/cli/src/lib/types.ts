/**
 * Option values for --module.
 */
export enum ModuleOptionsEnum {
  ACTRules = 'act-rules',
  BestPractices = 'best-practices',
  WCAGTechniques = 'wcag-techniques',
  Counter = 'counter',
};

export enum ConformanceLevelEnum {
  A = 'A',
  AA = 'AA',
  AAA = 'AAA',
};

export enum PrincipleEnum {
  Perceivable = 'Perceivable',
  Operable = 'Operable',
  Understandable = 'Understandable',
  Robust = 'Robust',
};

/**
 * Results of parsing a list of rules (ACT/WCAG techniques/BP) through an
 * accumulator function.
 */
export type RuleListParseResult = {
  /**
   * List of valid rules.
   */
  ok: string[],

  /**
   * List of invalid rules.
   */
  error: string[],
};