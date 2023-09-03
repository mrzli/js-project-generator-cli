import { input, select } from '@inquirer/prompts';
import {
  GenerateInput,
  ProjectDataAny,
  ProjectKind,
  TemplateAppDataAny,
  TemplateAppKind,
  TemplateLibDataAny,
  TemplateLibKind,
} from '@gmjs/js-project-generator';
import { Options } from './types';
import {
  INVALID_IDENTIFIER_MESSAGE,
  isBlankString,
  isValidIdentifier,
} from '../../util';
import { Except } from 'type-fest';

export async function readGeneratorInputs(
  output: string,
  options: Options,
): Promise<Except<GenerateInput, 'authorData'>> {
  const projectName = await promptValueIfMissing(options['projectName'], () =>
    input({
      message: 'Enter project name',
      validate: validateIdentifier,
    }),
  );

  const projectData = await readProjectData(output, options);

  return {
    output,
    projectName,
    projectData,
  };
}

async function readProjectData(
  output: string,
  options: Options,
): Promise<ProjectDataAny> {
  const projectType = await promptValueIfMissing<ProjectKind>(
    options['projectType'] as ProjectKind | undefined,
    () =>
      select<ProjectKind>({
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
      const template = await readTemplateAppData(options);
      return {
        kind: projectType,
        template,
      };
    }
    case 'lib': {
      const template = await readTemplateLibData(options);
      return {
        kind: projectType,
        template,
      };
    }
  }
}

async function readTemplateAppData(
  options: Options,
): Promise<TemplateAppDataAny> {
  const templateKind = await promptValueIfMissing<TemplateAppKind>(
    options['template'] as TemplateAppKind | undefined,
    () =>
      select<TemplateAppKind>({
        message: 'Select template',
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

  switch (templateKind) {
    case 'react': {
      return {
        kind: templateKind,
      };
    }
    case 'node': {
      return {
        kind: templateKind,
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
        kind: templateKind,
        commandName,
      };
    }
  }
}

async function readTemplateLibData(
  options: Options,
): Promise<TemplateLibDataAny> {
  const templateKind = await promptValueIfMissing<TemplateLibKind>(
    options['template'] as TemplateLibKind | undefined,
    () =>
      select<TemplateLibKind>({
        message: 'Select template',
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

  switch (templateKind) {
    case 'shared': {
      return {
        kind: templateKind,
      };
    }
    case 'node': {
      return {
        kind: templateKind,
      };
    }
    case 'browser': {
      return {
        kind: templateKind,
      };
    }
    case 'react': {
      return {
        kind: templateKind,
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
