import { homedir } from 'node:os';
import { GlobalConfig } from '../types';
import { existsAsync, readTextAsync } from '@gmjs/fs-async';

export async function readGlobalConfig(): Promise<Partial<GlobalConfig>> {
  const configPath = getGlobalConfigPath();
  const pathExists = await existsAsync(configPath);
  if (!pathExists) {
    return {};
  }

  const configContent = await readTextAsync(configPath);
  return JSON.parse(configContent) as Partial<GlobalConfig>;
}

function getGlobalConfigPath(): string {
  return `${homedir()}/.jsgen.config.json`;
}
