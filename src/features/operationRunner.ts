import { ConfigDto } from '../commons/dtos';
import * as operations from './operations/basic.operations';
import { filterPackageJson } from '../commons/package-utils';
import { replaceEnvPlaceholders } from './operations/env.operations';

/**
 * The operationRunner function is used to perform a series of operations on a given
 * packProps, these operations are defined by the ConfigDto object passed as a parameter.
 *
 * The operations include adding, removing, replacing properties, replacing text, and
 * executing custom operations.
 *
 * The function also filters the resulting object and replaces environment placeholders.
 *
 * @param {Record<string, any>} packProps - The initial object on which the operations will be performed.
 * @param {ConfigDto} config - The configuration object defining the operations to be performed.
 * @param {Record<string, string>} env - The environment variables used for replacing placeholders.
 *
 * @returns {Record<string, any>} - The resulting object after all operations have been performed.
 */
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
      const result = operations.customOperation(packProps, customOperation);
      if (result) {
        packProps = result;
      }
    });
  }

  packProps = filterPackageJson(packProps);
  packProps = replaceEnvPlaceholders(packProps, env);
  return packProps;
};
