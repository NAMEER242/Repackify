import { blacklistProperties } from './blacklist-properties';

export const filterPackageJson = (record: Record<string, any>) => {
  for (const key in record) {
    if (blacklistProperties.includes(key)) {
      delete record[key];
    }
  }

  return record;
};
