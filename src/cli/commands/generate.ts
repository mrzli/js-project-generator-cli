import { Command, Option } from 'commander';
import {
  Config,
  ProjectType,
  generateProject,
} from '@gmjs/js-project-generator';
import {
  GLOBAL_CONFIG_OPTION_DISPLAY_NAME_MAP,
  GLOBAL_CONFIG_OPTION_NAMES,
  readGlobalConfig,
} from './util';
import { GlobalConfig } from './types';
import { mapGetOrThrow } from '@gmjs/data-container-util';

type OptionValue = string | number | boolean;
type Options = Readonly<Record<string, OptionValue | undefined>>;

export function addCommandGenerate(program: Command): Command {
  program
    .command('generate', { isDefault: true })
    .alias('g')
    .description('Generate a new project')
    .argument('[output]', 'Output directory', '.')
    // .addOption(
    //   new Option('-t, --project-type <projectType>', 'Project type')
    //     .choices(['shared', 'node', 'cli', 'browser', 'react'])
    //     .makeOptionMandatory(true),
    // )
    // .requiredOption('-p, --project-name <projectName>', 'Project name')
    .action(action);

  return program;
}

async function action(
  output: string,
  options: Options,
  _command: Command,
): Promise<void> {
  const globalConfig = await readGlobalConfig();
  const errors = validateGlobalConfig(globalConfig);
  if (errors.length > 0) {
    console.log("Invalid global configuration. Run 'jsgen configure' to fix.");
    console.log(errors.join('\n'));
    return;
  }

  const configFromCli = cliResultToConfig(options);

  const finalConfig: Partial<Config> = {
    ...globalConfig,
    ...configFromCli,
  };

  console.log(output);
  console.log(options);
  console.log(finalConfig);

  // await generateProject(finalConfig);
  console.log('Project generated successfully!');
}

function validateGlobalConfig(
  globalConfig: Partial<GlobalConfig>,
): readonly string[] {
  const errors: string[] = [];

  for (const optionName of GLOBAL_CONFIG_OPTION_NAMES) {
    const value = globalConfig[optionName];
    if (value === undefined || value.trim() === '') {
      const displayName = mapGetOrThrow(
        GLOBAL_CONFIG_OPTION_DISPLAY_NAME_MAP,
        optionName,
      );
      errors.push(`Missing ${displayName}.`);
    }
  }

  return errors;
}

function cliResultToConfig(options: Options): Partial<Config> {
  const projectType = options['projectType'] as ProjectType | undefined;
  const projectName = options['projectName'] as string | undefined;

  return {
    projectType,
    projectName,
  };
}
