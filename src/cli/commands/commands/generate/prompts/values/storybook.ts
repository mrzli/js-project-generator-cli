import { expand } from '@inquirer/prompts';
import { Options } from '../../types';
import { promptValueIfMissing } from '../shared';

export async function getStorybook(options: Options): Promise<boolean> {
  const storybook = await promptValueIfMissing(
    options['storybook'] as boolean | undefined,
    async () => {
      const result = await expand({
        message: 'Use Storybook?',
        choices: [
          { key: 'y', name: 'Yes', value: 'yes' },
          { key: 'n', name: 'No', value: 'no' },
        ],
      });
      return result === 'yes';
    },
  );

  return storybook;
}
