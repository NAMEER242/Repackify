import { blacklistProperties } from './blacklist-properties';

/**
 * Filters out the properties in the package.json using the blacklistProperties.
 */
export const filterPackageJson = (record: Record<string, any>) => {
  for (const key in record) {
    if (blacklistProperties.includes(key)) {
      delete record[key];
    }
  }

  return record;
};
