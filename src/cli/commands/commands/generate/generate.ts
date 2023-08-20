import { Command } from 'commander';
import { Config, generateProject } from '@gmjs/js-project-generator';
import { readGlobalConfig } from '../../util';
import { validateGlobalConfig } from './validate-global-config';
import { Options } from './types';
import { readGeneratorInputs } from './read-inputs';

export function addCommandGenerate(program: Command): Command {
  program
    .command('generate')
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

  const generatorInputs = await readGeneratorInputs(output, options);

  console.log(generatorInputs);

  // const finalConfig: Partial<Config> = {
  //   ...globalConfig,
  //   ...configFromCli,
  // };

  // await generateProject(finalConfig);
  console.log('Project generated successfully!');
}
