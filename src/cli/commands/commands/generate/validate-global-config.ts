import { mapGetOrThrow } from '@gmjs/data-container-util';
import { GlobalConfig } from '../../types';
import {
  GLOBAL_CONFIG_OPTION_NAMES,
  GLOBAL_CONFIG_OPTION_DISPLAY_NAME_MAP,
  isBlankString,
} from '../../util';

export function validateGlobalConfig(
  globalConfig: Partial<GlobalConfig>,
): readonly string[] {
  const errors: string[] = [];

  for (const optionName of GLOBAL_CONFIG_OPTION_NAMES) {
    const value = globalConfig[optionName];
    if (value === undefined || isBlankString(value)) {
      const displayName = mapGetOrThrow(
        GLOBAL_CONFIG_OPTION_DISPLAY_NAME_MAP,
        optionName,
      );
      errors.push(`Missing ${displayName}.`);
    }
  }

  return errors;
}
