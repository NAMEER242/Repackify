import { ConfigDto } from '../common/dto';
import * as operations from './operations';
import { filterPackageJson } from '../common/package-utils';

export const operationsRunner = (
  packProps: Record<string, any>,
  config: ConfigDto,
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

  return filterPackageJson(packProps);
};
