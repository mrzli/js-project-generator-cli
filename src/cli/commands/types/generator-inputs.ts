import { ProjectDataAny } from './project-kind';

export interface GeneratorInputs {
  readonly output: string;
  readonly projectName: string;
  readonly projectData: ProjectDataAny;
}
