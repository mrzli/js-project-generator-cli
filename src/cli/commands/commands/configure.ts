import { GlobalConfigOptionName } from '../types/global-config';
import { Command } from 'commander';
import { input } from '@inquirer/prompts';
import { Writable } from 'type-fest';
import { mapGetOrThrow } from '@gmjs/data-container-util';
import {
  GLOBAL_CONFIG_OPTION_DISPLAY_NAME_MAP,
  GLOBAL_CONFIG_OPTION_NAMES,
  isNonBlankString,
  readGlobalConfig,
  writeGlobalConfig,
} from '../util';
import { GlobalConfig } from '../types';

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

async function action(_options: Options, _command: Command): Promise<void> {
  const globalConfig = await readGlobalConfig();

  const newGlobalConfig: Partial<Writable<GlobalConfig>> = {};

  for (const optionName of GLOBAL_CONFIG_OPTION_NAMES) {
    const value = await promptForValue(
      globalConfig,
      optionName,
      isNonBlankString,
    );
    newGlobalConfig[optionName] = value;
  }

  await writeGlobalConfig(newGlobalConfig as GlobalConfig);
  console.log('Global configuration succesfully updated!');
}

async function promptForValue(
  globalConfig: Partial<GlobalConfig>,
  optionName: GlobalConfigOptionName,
  validator: (value: string) => boolean,
): Promise<string> {
  const displayName = mapGetOrThrow(
    GLOBAL_CONFIG_OPTION_DISPLAY_NAME_MAP,
    optionName,
  );

  const currentValue = globalConfig[optionName];

  if (currentValue === undefined) {
    const answer = await input({
      message: `Enter ${displayName}`,
      validate: validator,
    });
    return answer;
  } else {
    const answer = await input({
      message: `Enter ${displayName} (or leave blank to keep current value: "${currentValue}")`,
    });
    return answer.trim().length > 0 ? answer : currentValue;
  }
}
