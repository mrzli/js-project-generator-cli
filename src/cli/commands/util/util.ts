import { homedir } from 'node:os';
import { GlobalConfig, GlobalConfigOptionName } from '../types';
import {
  ensureDirAsync,
  existsAsync,
  readTextAsync,
  writeTextAsync,
} from '@gmjs/fs-async';

export async function readGlobalConfig(): Promise<Partial<GlobalConfig>> {
  const configPath = getGlobalConfigPath();
  const pathExists = await existsAsync(configPath);
  if (!pathExists) {
    return {};
  }

  const configContent = await readTextAsync(configPath);
  return JSON.parse(configContent) as Partial<GlobalConfig>;
}

export async function writeGlobalConfig(config: GlobalConfig): Promise<void> {
  await ensureDirAsync(getGlobalConfigDir());

  const configPath = getGlobalConfigPath();
  const configContent = JSON.stringify(config, undefined, 2);
  await writeTextAsync(configPath, configContent);
}

function getGlobalConfigDir(): string {
  return `${homedir()}/.jsgen`;
}

function getGlobalConfigPath(): string {
  return `${getGlobalConfigDir()}/config.json`;
}

export const GLOBAL_CONFIG_OPTION_NAMES: readonly GlobalConfigOptionName[] = [
  'scopeName',
  'author',
  'email',
  'authorUrl',
  'githubAccount',
];

export const GLOBAL_CONFIG_OPTION_DISPLAY_NAME_MAP: ReadonlyMap<
  GlobalConfigOptionName,
  string
> = new Map<GlobalConfigOptionName, string>([
  ['scopeName', 'Scope Name'],
  ['author', 'Author'],
  ['email', 'Email'],
  ['authorUrl', 'Author URL'],
  ['githubAccount', 'GitHub Account'],
]);
