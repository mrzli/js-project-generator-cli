import { Command, Option } from 'commander';
import { generateProject, GenerateInput } from '@gmjs/js-project-generator';
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
      new Option('-e, --template <template>', 'Project template').choices([
        'shared',
        'node',
        'cli',
        'browser',
        'react',
      ]),
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
  const validationResult = validateGlobalConfig(globalConfig);
  if (!validationResult.isValid) {
    console.log("Invalid global configuration. Run 'jsgen configure' to fix.");
    console.log(validationResult.errors.join('\n'));
    return;
  }

  const finalOptions = validateCommandLineInputs(options);

  const generatorInputs = await readGeneratorInputs(output, finalOptions);

  const finalInput: GenerateInput = {
    ...generatorInputs,
    authorData: validationResult.globalConfig,
  };

  await generateProject(finalInput);
  console.log('Project generated successfully!');
}
