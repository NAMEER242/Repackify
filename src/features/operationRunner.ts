import { ConfigDto } from '../commons/dtos';
import * as operations from './operations/basic.operations';
import { filterPackageJson } from '../commons/package-utils';
import { replaceEnvPlaceholders } from './operations/env.operations';

export const operationRunner = (
  packProps: Record<string, any>,
  config: ConfigDto,
  env: Record<string, string>,
): Record<string, any> => {
  if (config.add) {
    config.add.forEach((prop) => {
      packProps = operations.add(packProps, prop);
    });
  }

  if (config.remove) {
    config.remove.forEach((prop) => {
      packProps = operations.remove(packProps, prop);
    });
  }

  if (config.replace) {
    config.replace.forEach((prop) => {
      packProps = operations.replace(packProps, prop);
    });
  }

  if (config.replaceText) {
    config.replaceText.forEach((prop) => {
      packProps = operations.replaceText(packProps, prop.text, prop.replace);
    });
  }

  if (config.customOperation) {
    config.customOperation.forEach((customOperation) => {
      packProps = operations.customOperation(packProps, customOperation);
    });
  }

  packProps = filterPackageJson(packProps);
  packProps = replaceEnvPlaceholders(replaceEnvPlaceholders, env);
  return packProps;
};
