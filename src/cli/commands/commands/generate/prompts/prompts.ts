import {
  GenerateInput,
  ProjectDataAny,
  ProjectKind,
} from '@gmjs/js-project-generator';
import { Options } from '../types/options';
import { Except } from 'type-fest';
import {
  getCommandName,
  getProjectName,
  getProjectType,
  getStorybook,
} from './values';

export async function readGeneratorInputs(
  output: string,
  options: Options,
): Promise<Except<GenerateInput, 'authorData'>> {
  const projectName = await getProjectName(options);
  const projectType = await getProjectType(options);

  const projectData = await getProjectData(options, projectType);

  return {
    output,
    projectName,
    projectData,
  };
}

async function getProjectData(
  options: Options,
  projectType: ProjectKind,
): Promise<ProjectDataAny> {
  switch (projectType) {
    case 'app-vanilla': {
      const storybook = await getStorybook(options);
      return {
        kind: 'app-vanilla',
        storybook,
      };
    }
    case 'app-react': {
      const storybook = await getStorybook(options);
      return {
        kind: 'app-react',
        storybook,
      };
    }
    case 'app-node': {
      return {
        kind: 'app-node',
      };
    }
    case 'app-nest': {
      return {
        kind: 'app-nest',
      };
    }
    case 'app-cli': {
      const commandName = await getCommandName(options);
      return {
        kind: 'app-cli',
        commandName,
      };
    }
    case 'lib-browser': {
      return {
        kind: 'lib-browser',
      };
    }
    case 'lib-node': {
      return {
        kind: 'lib-node',
      };
    }
    case 'lib-shared': {
      return {
        kind: 'lib-shared',
      };
    }
  }
}
