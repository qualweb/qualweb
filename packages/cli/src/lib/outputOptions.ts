import { Command, Option } from 'commander';

/**
 * 
 * @param command 
 */
export function addOutputOptions(command: Command): Command {
  const filePathOption = new Option('-o, --out <file>', 'Output file path');

  const fileTypeOption = new Option('--format <format>', 'Output file format')
    .choices(['qualweb', 'earl', 'earl-a'])
    ;

  command.addOption(filePathOption);
  command.addOption(fileTypeOption);

  return command;
}