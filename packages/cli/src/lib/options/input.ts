import { Command, Option, InvalidOptionArgumentError } from 'commander';
import fs from 'node:fs';

export type InputOptions = {
  /**
   * Single URL to test.
   */
  url?: string,

  /**
   * Path to file containing URLs to evaluate.
   */
  file?: string,

  /**
   * Base URL to perform a crawl on.
   */
  crawl?: string,
}

/**
 * Adds input options (URL, file, crawl) to a command.
 * @param command The command to add the options to. This *will* modify the
 * {@link Command} object.
 * @returns The modified {@link Command} object. Good for chaining.
 */
export function addInputOptionsToCommand(command: Command): Command {
  const urlInputOption = new Option('-u, --url <url>', 'URL to test');
  const fileInputOption = new Option('-f, --file <file>', 'File with URLs to test. Separate each URL with a newline.')
    // Check file exists before allowing parse to finish.
    .argParser((value: string) => {
      if (fs.existsSync(value) === false) {
        throw new InvalidOptionArgumentError(`File at ${value} does not exist`);
      }

      return value;
    })
    ;
  const crawlInputOption = new Option('-c, --crawl <crawl>', 'Crawl a website');

  urlInputOption.conflicts([fileInputOption.attributeName(), crawlInputOption.attributeName()]);
  fileInputOption.conflicts([urlInputOption.attributeName(), crawlInputOption.attributeName()]);
  crawlInputOption.conflicts([urlInputOption.attributeName(), fileInputOption.attributeName()]);

  command.addOption(urlInputOption);
  command.addOption(fileInputOption);
  command.addOption(crawlInputOption);

  return command;
}
