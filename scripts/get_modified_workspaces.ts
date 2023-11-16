/**
 * Using a path to a file containing a list of modified files, outputs all
 * workspaces that are affected by the modifications. If a file in packages/core
 * has been changed, will output @qualweb/core. If a file in packages/act-rules
 * has been changed, will output @qualweb/core, @qualweb/act-rules, and
 * @qualweb/evaluation. Will mention a package at most once.
 */

import { execSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { Command } from 'commander';
import { getDependents } from './get_dependents';

type NpmQueryResult = {
  /**
   * Name of the package, as stated in package.json
   */
  name: string;

  /**
   * Location of the package, relative to the root of the monorepo.
   */
  location: string;
  dependencies: Record<string, unknown>;
  devDependencies: Record<string, unknown>;
}

const command = new Command('get-modified-workspaces')
  .option('--as-workspaces', 'Outputs the results as a list of workspace parameters fit for consumption by npm and npx.')
  .option('--input-separator <separator>', 'Separator between filenames in the input file.', ' ')
  .option('--output-separator <outputSeparator>', 'Separator between workspace entries. This is ignored when using --as-workspaces', ' ')
  .argument('<path-to-modified_files.txt>', 'Input file. Each entry should be separated by the value of --separator (defaults to a whitespace)')
  ;

export async function get_workspace_data(): Promise<NpmQueryResult[]> {
  return JSON.parse(execSync('npm query .workspace', { encoding: 'utf-8'} ));
}

export async function get_workspaces_in_file(path: string, separator: string = ' '): Promise<NpmQueryResult[]> {
  const workspaces = await get_workspace_data();
  const workspaceLocations = workspaces.map(ws => ws.location);

  const affectedWorkspaces = (await fs.readFile(path, 'utf-8'))
    .split(separator) // Split into separate file entries.
    .filter(entry => workspaceLocations.some(ws => entry.startsWith(ws))) // Only look at files that are in one of the workspaces.
    .map(entry => entry.split('/').slice(0, 2).join('/')) // Retrieve the part of the path that refers to the package.
    ;

  const uniqueWorkspaces = Array.from(new Set(affectedWorkspaces));

  return workspaces.filter(ws => uniqueWorkspaces.find(uws => ws.location == uws));
}

async function main(): Promise<void> {
  command.parse(process.argv);

  const opts = command.opts();

  const affectedWorkspaces = await get_workspaces_in_file(command.args[0], opts.inputSeparator);

  const uniqueWorkspaces = new Set();

  for (const affectedWorkspace of affectedWorkspaces) {
    for (const pkg of getDependents(affectedWorkspace.name)) {
      uniqueWorkspaces.add(pkg);
    }
  }

  const finalResult = Array.from(uniqueWorkspaces);

  if (command.opts().asWorkspaces === true)
    console.debug(finalResult.map(dep => `-w ${dep}`).join(' '))
  else
    console.debug(finalResult.join(opts.outputSeparator));
}

// Run as CLI if executed directly.
if (require.main == module)
  main();