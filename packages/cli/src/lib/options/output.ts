import { Command, Option } from 'commander';

export enum OutputFormatEnum {
  JSON = 'json',
  EARL = 'earl',
};

export type OutputOptions = {
  outFile?: string;
  format: OutputFormatEnum;
};

/**
 * 
 * @param command 
 */
export function addOutputOptions(command: Command): Command {
  const filePathOption = new Option('-o, --out-file <path>', 'Output file path');

  const fileTypeOption = new Option('--format <format>', 'Output file format. If omitted, will write to stdout. "json" uses QualWeb\'s own JSON format.')
    .choices(Object.values(OutputFormatEnum))
    .default(OutputFormatEnum.JSON)
    ;

  command.addOption(filePathOption);
  command.addOption(fileTypeOption);

  return command;
}