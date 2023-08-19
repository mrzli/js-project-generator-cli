import { join } from 'node:path';
import { Command } from 'commander';
import { readPackageJsonSync } from '@gmjs/package-json';

export function createProgram(): Command {
  const program = new Command();
  program
    .name('jsgen')
    .description('TypeScript project generator.')
    .version(readPackageJsonSync(join(__dirname, '../..')).version ?? '');

  return program;
}
