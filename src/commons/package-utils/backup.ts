import * as fs from 'fs';
import { promisify } from 'util';
import { filterPackageJson } from './filter-package-json';

const writeFile = promisify(fs.writeFile);

export const backup = async (
  record: Record<string, any>,
  backupPath: string,
) => {
  record = filterPackageJson(record);
  const data = JSON.stringify(record, null, 2);
  await writeFile(backupPath, data);

  return record;
};
