import * as fs from 'fs';
import { promisify } from 'util';
import { filterPackageJson } from './filter-package-json';

const writeFile = promisify(fs.writeFile);

export const restore = async (
  record: Record<string, any>,
  packagePath: string,
) => {
  record = filterPackageJson(record);
  const data = JSON.stringify(record, null, 2);
  await writeFile(packagePath, data);
};
