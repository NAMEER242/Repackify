import * as fs from 'fs';
import * as path from 'path';
import { ConfigDto } from '../dtos';

export const getConfigFromJSFile = (): ConfigDto | null => {
  const filePath = path.join(global._projectDir, 'repackify.js');
  if (fs.existsSync(filePath)) {
    return require(filePath);
  }
  return null;
};

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
