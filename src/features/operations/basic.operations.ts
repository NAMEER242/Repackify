import { filterPackageJson } from '../../commons/package-utils';

/**
 * Add properties to package.json
 * @param packProps
 * @param props
 */
export const add = (
  packProps: Record<string, any>,
  props: Record<string, any>,
): Record<string, any> => {
  for (const key in props) {
    if (!(key in packProps)) {
      packProps[key] = props[key];
    }
  }
  return filterPackageJson(packProps);
};

/**
 * Remove properties from package.json
 * @param packProps
 * @param prop
 */
export const remove = (
  packProps: Record<string, any>,
  prop: string,
): Record<string, any> => {
  if (prop in packProps) {
    delete packProps[prop];
  }
  return packProps;
};

/**
 * Replace properties from package.json
 * @param packProps
 * @param props
 */
export const replace = (
  packProps: Record<string, any>,
  props: Record<string, any>,
): Record<string, any> => {
  for (const key in props) {
    if (key in packProps) {
      packProps[key] = props[key];
    }
  }
  return packProps;
};

/**
 * Replace text from package.json
 * @param packProps
 * @param text
 * @param replace
 */
export const replaceText = (
  packProps: Record<string, any>,
  text: string,
  replace: string,
): Record<string, any> => {
  let resultString = JSON.stringify(packProps);
  resultString = resultString.replaceAll(text, replace);
  return JSON.parse(resultString);
};

/**
 * Runs a custom operation.
 * @param packProps
 * @param operation
 */
export const customOperation = (
  packProps: Record<string, any>,
  operation: (packProps: Record<string, any>) => Record<string, any>,
): Record<string, any> => {
  return operation(packProps);
};
