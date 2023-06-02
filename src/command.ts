import { join } from 'node:path';
import { cli } from '@gmjs/cli-wrapper';
import { readPackageJsonSync } from '@gmjs/package-json';
import { readTextAsync } from '@gmjs/fs-async';
import { Config } from '@gmjs/js-project-generator';

export async function run(): Promise<void> {
  const result = cli(
    `
Usage
  $ jsgen <input>

Options
  --config, -c  Path to config file
  --output, -o  Output directory
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
          required: true,
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
    const configPath = result.options['config'].value as string;
    const configContent = await readTextAsync(configPath);
    const config = JSON.parse(configContent) as Config;

    const outputOption = result.options['output'];
    const output = outputOption ? (outputOption.value as string) : undefined;

    const projectNameOption = result.options['projectName'];
    const projectName = projectNameOption
      ? (projectNameOption.value as string)
      : undefined;

    const finalConfig: Config = {
      ...config,
      output: output ?? config.output,
      projectName: projectName ?? config.projectName,
    };

    console.log(finalConfig);
  }
}

run();
