/**
 * Retrieves all packages that are directly or transitively dependent on the
 * package named as input argument.
 */

import { execSync } from 'node:child_process';
import { Command } from 'commander';

type PartialNpmLsData = {
  dependencies: Record<string, unknown>;
}

const command = new Command('get-dependents')
  .option('--as-workspaces', 'Outputs the results as a list of workspace parameters fit for consumption by npm and npx.')
  .option('--include-self', 'If set, will include the input package as part of the output list.')
  .argument('<package-name>', 'Package to find dependents for')
  ;

export function getDependents(packageName: string): string[] {
  const lsData: PartialNpmLsData = JSON.parse(execSync(`npm ls --json ${packageName}`, { encoding:'utf-8' }));

  return Object.keys(lsData.dependencies);
}

async function main(): Promise<void> {
  command.parse(process.argv);

  const packageName = command.args[0];

  let dependents = getDependents(packageName);

  if (command.opts().includeSelf !== true)
    dependents = dependents.filter(dep => dep !== packageName);

  if (command.opts().asWorkspaces === true)
    console.debug(dependents.map(dep => `-w ${dep}`).join(' '))
  else
    console.debug(dependents);
}

// Run as CLI if executed directly.
if (require.main == module)
  main();