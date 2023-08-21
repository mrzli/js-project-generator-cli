export interface GlobalConfig {
  readonly scopeName: string;
  readonly author: string;
  readonly email: string;
  readonly authorUrl: string;
  readonly githubAccount: string;
}

export type GlobalConfigOptionName = keyof GlobalConfig;
