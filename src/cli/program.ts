import { join } from 'node:path';
import { Command } from 'commander';
import { PackageJson } from '@gmjs/package-json';
import { readTextSync } from '@gmjs/file-system';

export function createProgram(): Command {
  const program = new Command();

  const packageJson = readPackageJsonSync(
    join(__dirname, '../..', 'package.json'),
  );

  const version = packageJson.version ?? '';

  program
    .name('jsgen')
    .description('TypeScript project generator.')
    .version(version);

  return program;
}

function readPackageJsonSync(path: string): PackageJson {
  const content = readTextSync(path);
  return JSON.parse(content) as PackageJson;
}
