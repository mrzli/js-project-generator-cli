import {
  KINDS_OF_TEMPLATE_APP,
  KINDS_OF_TEMPLATE_LIB,
  ProjectKind,
} from '@gmjs/js-project-generator';
import { Options } from './types';

export function validateCommandLineInputs(options: Options): Options {
  const projectType = options['projectType'];
  const environment = options['environment'];

  switch (projectType) {
    case 'app': {
      if (
        environment !== undefined &&
        KINDS_OF_TEMPLATE_APP.every((e) => e !== environment)
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
        KINDS_OF_TEMPLATE_LIB.every((e) => e !== environment)
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
  projectType: ProjectKind,
  environment: string,
): string {
  return `Invalid environment '${environment}' for project type '${projectType}'. You will be prompted to select a valid environment.`;
}
