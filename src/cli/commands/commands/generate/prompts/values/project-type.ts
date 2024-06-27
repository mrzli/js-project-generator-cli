import { select } from '@inquirer/prompts';
import { ProjectKind } from '@gmjs/js-project-generator';
import { Options } from '../../types';
import { promptValueIfMissing } from '../shared';

export async function getProjectType(options: Options): Promise<ProjectKind> {
  const projectType = await promptValueIfMissing<ProjectKind>(
    options['projectType'] as ProjectKind | undefined,
    () =>
      select<ProjectKind>({
        message: 'Select project type',
        choices: [
          {
            value: 'app-vanilla',
            description: 'Vanilla browser application',
          },
          {
            value: 'app-react',
            description: 'React application',
          },
          {
            value: 'app-node',
            description: 'Node application',
          },
          {
            value: 'app-nest',
            description: 'Nest application',
          },
          {
            value: 'app-cli',
            description: 'Node CLI application',
          },
          {
            value: 'lib-browser',
            description: 'Browser library',
          },
          {
            value: 'lib-node',
            description: 'Node library',
          },
          {
            value: 'lib-shared',
            description: 'Shared library',
          },
        ],
      }),
  );

  return projectType;
}
