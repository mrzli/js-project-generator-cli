import { Command } from 'commander';
import { existsAsync, readTextAsync } from '@gmjs/fs-async';

type OptionValue = never;
type Options = Readonly<Record<string, OptionValue | undefined>>;

export function addCommandConfigure(program: Command): Command {
  program
    .command('configure')
    .alias('c')
    .description('Configure the global settings')
    .action(action);

  return program;
}

async function action(
  _options: Options,
  _command: Command,
): Promise<void> {
  console.log('Global configuration successfully!');
}
