import { PROJECT_TYPE_LIB_ENVIRONMENT_LIST, ProjectType } from '../../types';
import { PROJECT_TYPE_APP_ENVIRONMENT_LIST } from './../../types/project-type-app-environment-data';
import { Options } from './types';

export function validateCommandLineInputs(options: Options): Options {
  const projectType = options['projectType'];
  const environment = options['environment'];

  switch (projectType) {
    case 'app': {
      if (
        environment !== undefined &&
        PROJECT_TYPE_APP_ENVIRONMENT_LIST.every((e) => e !== environment)
      ) {
        console.warn(invalidEnvironmentErrorMessage(projectType, environment));
        return {
          ...options,
          environment: undefined,
        };
      }
      break;
    }
    case 'lib': {
      if (
        environment !== undefined &&
        PROJECT_TYPE_LIB_ENVIRONMENT_LIST.every((e) => e !== environment)
      ) {
        console.warn(invalidEnvironmentErrorMessage(projectType, environment));
        return {
          ...options,
          environment: undefined,
        };
      }
      break;
    }
  }

  return options;
}

function invalidEnvironmentErrorMessage(
  projectType: ProjectType,
  environment: string,
): string {
  return `Invalid environment '${environment}' for project type '${projectType}'. You will be prompted to select a valid environment.`;
}
