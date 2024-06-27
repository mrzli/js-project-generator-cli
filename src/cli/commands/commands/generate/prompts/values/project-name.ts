import { input } from '@inquirer/prompts';
import { Options } from '../../types';
import { promptValueIfMissing, validateIdentifier } from '../shared';

export async function getProjectName(options: Options): Promise<string> {
  const projectName = await promptValueIfMissing(
    options['projectName'] as string | undefined,
    () =>
      input({
        message: 'Enter project name',
        validate: validateIdentifier,
      }),
  );

  return projectName;
}
