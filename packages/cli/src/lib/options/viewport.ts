import { Command, InvalidOptionArgumentError, Option } from 'commander';

export type ViewportOptions = {
  mobile?: boolean,
  orientation?: 'portrait' | 'landscape',
  userAgent?: string,
  viewportResolution?: { width: number, height: number },
};

export function addViewportOptions(command: Command): Command {
  command.option('--mobile', 'Use mobile mode in the browser viewport');

  const orientationOption = new Option('--orientation <orientation>', 'Orientation of the screen.')
    .choices(['portrait', 'landscape'])
    .default('portrait')
    ;

  command.addOption(orientationOption);

  command.option('--user-agent <user-agent>', 'Sets a custom user agent for the browser.');

  // Should this just be a single --viewport option with WIDTHxHEIGHT?
  command.option('--viewport-resolution <WIDTHxHEIGHT>', 'Resolution of the browser viewport', (value: string): { width: number, height: number } => {
    const matches = /^(?<width>\d+)x(?<height>\d+)$/.exec(value);

    if (matches === null) {
      throw new InvalidOptionArgumentError('Viewport resolution must be in the format WIDTHxHEIGHT. Both values must be integers.');
    } else {
      return {
        width: Number.parseInt(matches.groups!.width),
        height: Number.parseInt(matches.groups!.height),
      }
    }
  });

  return command;
}