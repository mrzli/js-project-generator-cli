import { Command, Option } from 'commander';
import {
  Config,
  ProjectType,
  generateProject,
} from '@gmjs/js-project-generator';
import { readGlobalConfig } from './util';

type OptionValue = string | number | boolean;
type Options = Readonly<Record<string, OptionValue | undefined>>;

export function addCommandGenerate(program: Command): Command {
  program
    .command('generate', { isDefault: true })
    .alias('g')
    .description('Generate a new project')
    .argument('[output]', 'Output directory', '.')
    .option('-c, --config <config>', 'Path to config file')
    .addOption(
      new Option('-t, --project-type <projectType>', 'Project type')
        .choices(['shared', 'node', 'cli', 'browser', 'react'])
        .makeOptionMandatory(true),
    )
    .requiredOption('-p, --project-name <projectName>', 'Project name')
    .action(action);

  return program;
}

async function action(
  output: string,
  options: Options,
  _command: Command,
): Promise<void> {
  const globalConfig = await readGlobalConfig();

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

function cliResultToConfig(options: Options): Partial<Config> {
  const projectType = options['projectType'] as ProjectType | undefined;
  const output = options['output'] as string | undefined;
  const projectName = options['projectName'] as string | undefined;

  const config: Partial<Config> = {
    projectType,
    output,
    projectName,
  };

  // remove any undefined values
  // eslint-disable-next-line unicorn/no-array-reduce
  return (Object.keys(config) as readonly (keyof Config)[]).reduce(
    (conf, key) => {
      const value = config[key];
      return value === undefined ? conf : { ...conf, [key]: value };
    },
    {},
  );
}
