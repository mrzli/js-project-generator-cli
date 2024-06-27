import { mapGetOrThrow } from '@gmjs/data-container-util';
import { GlobalConfig } from '../../../types';
import {
  GLOBAL_CONFIG_OPTION_NAMES,
  GLOBAL_CONFIG_OPTION_DISPLAY_NAME_MAP,
  isBlankString,
} from '../../../util';

export interface ValidateGlobalConfigResultError {
  readonly isValid: false;
  readonly errors: readonly string[];
}

export interface ValidateGlobalConfigResultSuccess {
  readonly isValid: true;
  readonly globalConfig: GlobalConfig;
}

export type ValidateGlobalConfigResult =
  | ValidateGlobalConfigResultError
  | ValidateGlobalConfigResultSuccess;

export function validateGlobalConfig(
  globalConfig: Partial<GlobalConfig>,
): ValidateGlobalConfigResult {
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

  return errors.length === 0
    ? {
        isValid: true,
        globalConfig: globalConfig as GlobalConfig,
      }
    : {
        isValid: false,
        errors,
      };
}
