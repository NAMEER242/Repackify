import * as fs from 'fs';
import { promisify } from 'util';
import { filterPackageJson } from './filter-package-json';

const writeFile = promisify(fs.writeFile);

export const restore = async (
  record: Record<string, any>,
  packageName = 'package.json',
) => {
  record = filterPackageJson(record);
  const data = JSON.stringify(record, null, 2);
  await writeFile(`${global._projectDir}/${packageName}`, data);
};
