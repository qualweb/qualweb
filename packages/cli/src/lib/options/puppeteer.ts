import { PuppeteerLifeCycleEvent } from '@qualweb/core';
import { Command, InvalidOptionArgumentError, Option } from 'commander';

export type PuppeteerOptions = {
  waitUntil?: PuppeteerLifeCycleEvent,
  maxParallelEvaluations?: number,
  timeout?: number,
};

export function addPuppeteerOptions(command: Command): Command {
  command.addOption(
    new Option('--wait-until', 'Puppeteer lifecycle event to wait for before starting evaluation')
      .choices(<PuppeteerLifeCycleEvent[]>['load', 'domcontentloaded', 'networkidle0', 'networkidle2'])
  );

  command.option(
    '--max-parallel-evaluations <number>',
    'Maximum number of parallel evaluations to run.',
    (value) => {
      const parsed = Number.parseInt(value);

      if (Number.isNaN(parsed) || parsed < 1) {
        throw new InvalidOptionArgumentError('Max parallel evaluations must be a number greater than 0');
      }

      return parsed;
    }
  );

  command.option(
    '--timeout',
    'Maximum time to wait for the evaluation to finish or try to connect to URL.',
    (value) => {
      const parsed = Number.parseInt(value);

      if (Number.isNaN(parsed) || parsed < 1) {
        throw new InvalidOptionArgumentError('Timeout must be a number greater than 0');
      }

      return parsed;
    }
  )

  return command;
}