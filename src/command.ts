import { join } from 'node:path';
import { CliResult, cli } from '@gmjs/cli-wrapper';
import { readPackageJsonSync } from '@gmjs/package-json';
import { existsAsync, readTextAsync } from '@gmjs/fs-async';
import {
  Config,
  ProjectType,
  generateProject,
} from '@gmjs/js-project-generator';

export async function run(): Promise<void> {
  const result = cli(
    `
Usage
  $ jsgen <input>

Options
  --config, -c        Path to config file
  --project-type, -t  Project type (shared, node, cli, browser, react)
  --output, -o        Output directory
  --project-name, -p  Project name

Examples
  $ jsgen --config config.json --output . --project-name my-project
`,
    {
      meta: {
        version: readPackageJsonSync(join(__dirname, '..')).version ?? '',
      },
      options: {
        config: {
          type: 'string',
          short: 'c',
          required: false,
        },
        projectType: {
          type: 'string',
          short: 't',
          required: false,
          choices: ['shared', 'node', 'cli', 'browser', 'react'],
        },
        output: {
          type: 'string',
          short: 'o',
          required: false,
        },
        projectName: {
          type: 'string',
          short: 'p',
          required: false,
        },
      },
    }
  );

  if (result.success) {
    const defaultConfigs = await Promise.all(
      DEFAULT_CONFIG_PATHS.map((path) => readConfig(path))
    );

    const configPath = getOptionalStringValue(result, 'config');
    const config = await readConfig(configPath);

    const configFromCli = cliResultToConfig(result);

    const finalConfig: Partial<Config> = {
      // eslint-disable-next-line unicorn/no-array-reduce
      ...defaultConfigs.reduce((conf, curr) => ({ ...conf, ...curr }), {}),
      ...config,
      ...configFromCli,
    };

    await generateProject(finalConfig);
    console.log('Project generated successfully!');
  }
}

function cliResultToConfig(result: CliResult): Partial<Config> {
  const projectType = getOptionalStringValue<ProjectType>(
    result,
    'projectType'
  );
  const output = getOptionalStringValue(result, 'output');
  const projectName = getOptionalStringValue(result, 'projectName');

  return {
    projectType,
    output,
    projectName,
  };
}

function getOptionalStringValue<T extends string>(
  result: CliResult,
  optionName: string
): T | undefined {
  const option = result.options[optionName];
  return option ? (option.value as T) : undefined;
}

async function readConfig(
  configPath: string | undefined
): Promise<Partial<Config> | undefined> {
  if (!configPath) {
    return undefined;
  }

  const pathExists = await existsAsync(configPath);
  if (!pathExists) {
    return undefined;
  }

  const configContent = await readTextAsync(configPath);
  return JSON.parse(configContent) as Partial<Config>;
}

const DEFAULT_CONFIG_PATHS: readonly string[] = [
  '~/.jsgen.config.json',
  './jsgen.config.json',
];

run();
