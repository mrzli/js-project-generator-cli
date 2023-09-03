import { homedir } from 'node:os';
import {
  ensureDirAsync,
  existsAsync,
  readTextAsync,
  writeTextAsync,
} from '@gmjs/fs-async';
import { GlobalConfig, GlobalConfigOptionName } from '../types';

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
  ['scopeName', 'scope name'],
  ['author', 'author'],
  ['email', 'email'],
  ['authorUrl', 'author URL'],
  ['githubAccount', 'GitHub account'],
]);

export function isBlankString(value: string): boolean {
  return value.trim().length === 0;
}

export function isNonBlankString(value: string): boolean {
  return !isBlankString(value);
}

export function isValidIdentifier(value: string): boolean {
  return /^[A-Za-z][\dA-Za-z]*(-[\dA-Za-z]+)*$/.test(value);
}

export const INVALID_IDENTIFIER_MESSAGE = `Invalid identifier. Must contain only letters, numbers, and dashes. Must start with a letter. Cannot end with a dash or contain consecutive dashes. Example of valid identifiers: 'some-valid-identifier' or 'AN-identifier1'.`;
