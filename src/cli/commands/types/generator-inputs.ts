import { ProjectTypeDataAny } from './project-type-data';

export interface GeneratorInputs {
  readonly output: string;
  readonly projectName: string;
  readonly projectTypeData: ProjectTypeDataAny;
}
