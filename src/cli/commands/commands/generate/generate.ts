import { Command, Option } from 'commander';
import { Config, generateProject } from '@gmjs/js-project-generator';
import { readGlobalConfig } from '../../util';
import { validateGlobalConfig } from './validate-global-config';
import { Options } from './types';
import { readGeneratorInputs } from './read-inputs';
import { validateCommandLineInputs } from './validate-command-line-inputs';

export function addCommandGenerate(program: Command): Command {
  program
    .command('generate')
    .alias('g')
    .description('Generate a new project')
    .argument('[output]', 'Output directory', '.')
    .option('-p, --project-name <projectName>', 'Project name')
    .addOption(
      new Option('-t, --project-type <projectType>', 'Project type').choices([
        'app',
        'lib',
      ]),
    )
    .addOption(
      new Option(
        '-e, --environment <environment>',
        'Project environment',
      ).choices(['shared', 'node', 'cli', 'browser', 'react']),
    )
    .option('-c, --command-name <commandName>', 'Command name')
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

  const finalOptions = validateCommandLineInputs(options);

  const generatorInputs = await readGeneratorInputs(output, finalOptions);

  console.log(generatorInputs);

  // const finalConfig: Partial<Config> = {
  //   ...globalConfig,
  //   ...configFromCli,
  // };

  // await generateProject(finalConfig);
  console.log('Project generated successfully!');
}
