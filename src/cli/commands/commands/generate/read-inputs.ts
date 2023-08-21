import { input, select } from '@inquirer/prompts';
import {
  GeneratorInputs,
  ProjectType,
  ProjectTypeAppEnvironmentDataAny,
  ProjectTypeAppEnvironmentType,
  ProjectTypeDataAny,
  ProjectTypeLibEnvironmentDataAny,
  ProjectTypeLibEnvironmentType,
} from '../../types';
import { Options } from './types';
import {
  INVALID_IDENTIFIER_MESSAGE,
  isBlankString,
  isValidIdentifier,
} from '../../util';

export async function readGeneratorInputs(
  output: string,
  options: Options,
): Promise<GeneratorInputs> {
  const projectName = await promptValueIfMissing(options['projectName'], () =>
    input({
      message: 'Enter project name',
      validate: validateIdentifier,
    }),
  );

  const projectTypeData = await readProjectTypeData(output, options);

  return {
    output,
    projectName,
    projectTypeData,
  };
}

async function readProjectTypeData(
  output: string,
  options: Options,
): Promise<ProjectTypeDataAny> {
  const projectType = await promptValueIfMissing<ProjectType>(
    options['projectType'] as ProjectType | undefined,
    () =>
      select<ProjectType>({
        message: 'Select project type',
        choices: [
          {
            value: 'app',
            description: 'Application project',
          },
          {
            value: 'lib',
            description: 'Library project',
          },
        ],
      }),
  );

  switch (projectType) {
    case 'app': {
      const environment = await readProjectTypeAppEnvironmentData(
        output,
        options,
      );
      return {
        type: projectType,
        environment,
      };
    }
    case 'lib': {
      const environment = await readProjectTypeLibEnvironmentData(
        output,
        options,
      );
      return {
        type: projectType,
        environment,
      };
    }
  }
}

async function readProjectTypeAppEnvironmentData(
  output: string,
  options: Options,
): Promise<ProjectTypeAppEnvironmentDataAny> {
  const environment = await promptValueIfMissing<ProjectTypeAppEnvironmentType>(
    options['environment'] as ProjectTypeAppEnvironmentType | undefined,
    () =>
      select<ProjectTypeAppEnvironmentType>({
        message: 'Select environment',
        choices: [
          {
            value: 'react',
            description: 'React application',
          },
          {
            value: 'node',
            description: 'Node (backend) application',
          },
          {
            value: 'cli',
            description: 'CLI application',
          },
        ],
      }),
  );

  switch (environment) {
    case 'react': {
      return {
        environment,
      };
    }
    case 'node': {
      return {
        environment,
      };
    }
    case 'cli': {
      const commandName = await promptValueIfMissing(
        options['commandName'],
        () =>
          input({
            message: 'Enter command name',
            validate: validateIdentifier,
          }),
      );

      return {
        environment,
        commandName,
      };
    }
  }
}

async function readProjectTypeLibEnvironmentData(
  output: string,
  options: Options,
): Promise<ProjectTypeLibEnvironmentDataAny> {
  const environment = await promptValueIfMissing<ProjectTypeLibEnvironmentType>(
    options['environment'] as ProjectTypeLibEnvironmentType | undefined,
    () =>
      select<ProjectTypeLibEnvironmentType>({
        message: 'Select environment',
        choices: [
          {
            value: 'shared',
            description: 'Library usable from both Node and browser',
          },
          {
            value: 'node',
            description: 'Node (backend) library',
          },
          {
            value: 'browser',
            description: 'Browser (frontend) library',
          },
          {
            value: 'react',
            description: 'React (frontend) library',
          },
        ],
      }),
  );

  switch (environment) {
    case 'shared': {
      return {
        environment,
      };
    }
    case 'node': {
      return {
        environment,
      };
    }
    case 'browser': {
      return {
        environment,
      };
    }
    case 'react': {
      return {
        environment,
      };
    }
  }
}

function validateIdentifier(value: string): string | true {
  if (isBlankString(value)) {
    return 'Cannot be blank.';
  }

  if (!isValidIdentifier(value)) {
    return INVALID_IDENTIFIER_MESSAGE;
  }

  return true;
}

async function promptValueIfMissing<T extends string>(
  value: T | undefined,
  prompt: () => Promise<T>,
): Promise<T> {
  return value === undefined ? await prompt() : value;
}
