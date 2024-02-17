import { filterPackageJson } from '../common/package-utils';

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

export const remove = (
  packProps: Record<string, any>,
  prop: string,
): Record<string, any> => {
  if (prop in packProps) {
    delete packProps[prop];
  }
  return packProps;
};

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

export const replaceText = (
  packProps: Record<string, any>,
  text: string,
  replace: string,
): Record<string, any> => {
  let resultString = JSON.stringify(packProps);
  resultString = resultString.replaceAll(text, replace);
  return JSON.parse(resultString);
};

export const customOperation = (
  packProps: Record<string, any>,
  operation: (packProps: Record<string, any>) => Record<string, any>,
): Record<string, any> => {
  return operation(packProps);
};
