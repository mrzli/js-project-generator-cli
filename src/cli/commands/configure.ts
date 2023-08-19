import { Command } from 'commander';
import { input } from '@inquirer/prompts';
import { Writable } from 'type-fest';
import { mapGetOrThrow } from '@gmjs/data-container-util';
import { readGlobalConfig, writeGlobalConfig } from './util';
import { GlobalConfig } from './types';

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

type OptionName = keyof GlobalConfig;

async function action(_options: Options, _command: Command): Promise<void> {
  const globalConfig = await readGlobalConfig();

  const optionsNames: readonly OptionName[] = [
    'scopeName',
    'author',
    'email',
    'authorUrl',
    'githubAccount',
  ];

  const newGlobalConfig: Partial<Writable<GlobalConfig>> = {};

  for (const optionName of optionsNames) {
    const value = await promptForValue(
      globalConfig,
      optionName,
      validateConfigOption,
    );
    newGlobalConfig[optionName] = value;
  }

  await writeGlobalConfig(newGlobalConfig as GlobalConfig);
  console.log('Global configuration succesfully updated!');
}

async function promptForValue(
  globalConfig: Partial<GlobalConfig>,
  optionName: OptionName,
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

function validateConfigOption(value: string | undefined): boolean {
  return value !== undefined && value.trim().length > 0;
}

const GLOBAL_CONFIG_OPTION_DISPLAY_NAME_MAP: ReadonlyMap<OptionName, string> =
  new Map<OptionName, string>([
    ['scopeName', 'Scope Name'],
    ['author', 'Author'],
    ['email', 'Email'],
    ['authorUrl', 'Author URL'],
    ['githubAccount', 'GitHub Account'],
  ]);
