import { join } from 'node:path';
import { homedir } from 'node:os';
import { Command, Option } from 'commander';
import { readPackageJsonSync } from '@gmjs/package-json';
import { existsAsync, readTextAsync } from '@gmjs/fs-async';
import {
  Config,
  ProjectType,
  generateProject,
} from '@gmjs/js-project-generator';

export async function run(): Promise<void> {
  const program = new Command();
  program
    .name('jsgen')
    .description('Generate a TypeScript project.')
    .version(readPackageJsonSync(join(__dirname, '..')).version ?? '')
    .option('-c, --config <config>', 'Path to config file')
    .addOption(
      new Option('-t, --project-type <projectType>', 'Project type').choices([
        'shared',
        'node',
        'cli',
        'browser',
        'react',
      ]),
    )
    .option('-o, --output <output>', 'Output directory')
    .option('-p, --project-name <projectName>', 'Project name')
    .action(jsgen);

  await program.parseAsync(process.argv);
}

type Options = Readonly<Record<string, string | number | boolean | undefined>>;

async function jsgen(options: Options, _command: Command): Promise<void> {
  const defaultConfigPaths = getDefaultConfigPaths();
  const defaultConfigs = await Promise.all(
    defaultConfigPaths.map((path) => readConfig(path)),
  );

  const configPath = options['config'] as string | undefined;
  const config = await readConfig(configPath);

  const configFromCli = cliResultToConfig(options);

  const finalConfig: Partial<Config> = {
    // eslint-disable-next-line unicorn/no-array-reduce
    ...defaultConfigs.reduce((conf, curr) => ({ ...conf, ...curr }), {}),
    ...config,
    ...configFromCli,
  };

  await generateProject(finalConfig);
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

async function readConfig(
  configPath: string | undefined,
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

function getDefaultConfigPaths(): readonly string[] {
  const homeDir = homedir();

  return [`${homeDir}/.jsgen.config.json`, './jsgen.config.json'];
}

run();
