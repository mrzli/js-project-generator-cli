import { input } from '@inquirer/prompts';
import { Options } from '../../types';
import { promptValueIfMissing, validateIdentifier } from '../shared';

export async function getCommandName(options: Options): Promise<string> {
  const projectName = await promptValueIfMissing(
    options['commandName'] as string | undefined,
    () =>
      input({
        message: 'Enter command name',
        validate: validateIdentifier,
      }),
  );

  return projectName;
}
