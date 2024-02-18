import * as fs from 'fs';
import * as path from 'path';
import { ConfigDto } from '../dtos';

/**
 * Get the configuration object from the repackify.js file
 */
export const getConfigFromJSFile = (): ConfigDto | null => {
  const filePath = path.join(global._cwd, 'repackify.js');
  if (fs.existsSync(filePath)) {
    return require(filePath);
  }
  return null;
};

/**
 * Get the configuration object from the package.json file
 */
export const getConfigFromRecord = (
  record: Record<string, any>,
): ConfigDto | null => {
  if (Object.keys(record).includes('repackify')) {
    return record['repackify'];
  }
  return null;
};

export const getConfig = (record: Record<string, any>): ConfigDto | null => {
  const jsConfig = getConfigFromJSFile();
  const packageJsonConfig = getConfigFromRecord(record);
  return { ...packageJsonConfig, ...jsConfig };
};
