export const PROJECT_TYPE_APP_ENVIRONMENT_LIST = [
  'react',
  'node',
  'cli',
] as const;

export type ProjectTypeAppEnvironmentType =
  (typeof PROJECT_TYPE_APP_ENVIRONMENT_LIST)[number];

export interface ProjectTypeAppEnvironmentDataBase {
  readonly environment: ProjectTypeAppEnvironmentType;
}

export interface ProjectTypeAppEnvironmentDataReact
  extends ProjectTypeAppEnvironmentDataBase {
  readonly environment: 'react';
}

export interface ProjectTypeAppEnvironmentDataNode
  extends ProjectTypeAppEnvironmentDataBase {
  readonly environment: 'node';
}

export interface ProjectTypeAppEnvironmentDataCli
  extends ProjectTypeAppEnvironmentDataBase {
  readonly environment: 'cli';
  readonly commandName: string;
}

export type ProjectTypeAppEnvironmentDataAny =
  | ProjectTypeAppEnvironmentDataReact
  | ProjectTypeAppEnvironmentDataNode
  | ProjectTypeAppEnvironmentDataCli;
