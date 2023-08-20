export const PROJECT_TYPE_LIB_ENVIRONMENT_LIST = [
  'shared',
  'node',
  'browser',
  'react',
] as const;

export type ProjectTypeLibEnvironmentType =
  (typeof PROJECT_TYPE_LIB_ENVIRONMENT_LIST)[number];

export interface ProjectTypeLibEnvironmentDataBase {
  readonly environment: ProjectTypeLibEnvironmentType;
}

export interface ProjectTypeLibEnvironmentDataShared
  extends ProjectTypeLibEnvironmentDataBase {
  readonly environment: 'shared';
}

export interface ProjectTypeLibEnvironmentDataNode
  extends ProjectTypeLibEnvironmentDataBase {
  readonly environment: 'node';
}

export interface ProjectTypeLibEnvironmentDataBrowser
  extends ProjectTypeLibEnvironmentDataBase {
  readonly environment: 'browser';
}

export interface ProjectTypeLibEnvironmentDataReact
  extends ProjectTypeLibEnvironmentDataBase {
  readonly environment: 'react';
}

export type ProjectTypeLibEnvironmentDataAny =
  | ProjectTypeLibEnvironmentDataShared
  | ProjectTypeLibEnvironmentDataNode
  | ProjectTypeLibEnvironmentDataBrowser
  | ProjectTypeLibEnvironmentDataReact;
