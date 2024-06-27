import { ProjectKind } from '@gmjs/js-project-generator';
import { Options } from '../types';

export function validateCommandLineInputs(options: Options): Options {
  const projectType = options['projectType'] as ProjectKind | undefined;
  const commandName = options['commandName'] as string | undefined;
  const storybook = options['storybook'] as boolean | undefined;

  let finalCommandName: string | undefined;

  const isCommandNameValid =
    commandName === undefined ||
    (projectType !== undefined && COMMAND_NAME_PROJECT_TYPES.has(projectType));
  if (isCommandNameValid) {
    finalCommandName = commandName;
  } else {
    const message =
      projectType === undefined
        ? `Project type is unspecified. Command name will be ignored.`
        : `Project type '${projectType}' does not support command name. Command name will be ignored.`;
    console.warn(message);
    finalCommandName = undefined;
  }

  let finalStorybook: boolean | undefined;

  const isStorybookValid =
    storybook === undefined ||
    (projectType !== undefined && STORYBOOK_PROJECT_TYPES.has(projectType));
  if (isStorybookValid) {
    finalStorybook = storybook;
  } else {
    const message =
      projectType === undefined
        ? `Project type is unspecified. Storybook flag will be ignored.`
        : `Project type '${projectType}' does not support Storybook. Storybook flag will be ignored.`;
    console.warn(message);
    finalStorybook = undefined;
  }

  return {
    ...options,
    commandName: finalCommandName,
    storybook: finalStorybook,
  };
}

const STORYBOOK_PROJECT_TYPES: ReadonlySet<ProjectKind> = new Set([
  'app-vanilla',
  'app-react',
]);

const COMMAND_NAME_PROJECT_TYPES: ReadonlySet<ProjectKind> = new Set([
  'app-cli',
]);
