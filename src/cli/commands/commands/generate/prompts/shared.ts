import {
  isBlankString,
  isValidIdentifier,
  INVALID_IDENTIFIER_MESSAGE,
} from '../../../util';
import { OptionValue } from '../types';

export function validateIdentifier(value: string): string | true {
  if (isBlankString(value)) {
    return 'Cannot be blank.';
  }

  if (!isValidIdentifier(value)) {
    return INVALID_IDENTIFIER_MESSAGE;
  }

  return true;
}

export async function promptValueIfMissing<T extends OptionValue>(
  value: T | undefined,
  prompt: () => Promise<T>,
): Promise<T> {
  return value === undefined ? await prompt() : value;
}
