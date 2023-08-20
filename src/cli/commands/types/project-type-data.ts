import { ProjectTypeAppEnvironmentDataAny } from './project-type-app-environment-data';
import { ProjectTypeLibEnvironmentDataAny } from './project-type-lib-environment-data';

export const PROJECT_TYPE_LIST = ['app', 'lib'] as const;

export type ProjectType = (typeof PROJECT_TYPE_LIST)[number];

export interface ProjectTypeDataBase {
  readonly type: ProjectType;
}

export interface ProjectTypeDataApp extends ProjectTypeDataBase {
  readonly type: 'app';
  readonly environment: ProjectTypeAppEnvironmentDataAny;
}

export interface ProjectTypeDataLib extends ProjectTypeDataBase {
  readonly type: 'lib';
  readonly environment: ProjectTypeLibEnvironmentDataAny;
}

export type ProjectTypeDataAny = ProjectTypeDataApp | ProjectTypeDataLib;
