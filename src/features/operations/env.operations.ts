const envRegex = /!\{(.*?)}/;

/**
 * Extracts the environment key from a string
 * @param text
 */
export const extractEnvRegex = (text: string): string | null => {
  const match = text.match(envRegex);
  return match ? match[1] : null;
};

/**
 * Replaces the environment key in a string with a given replacement
 * @param text
 * @param replacement
 */
export const replaceEnvRegex = (text: string, replacement: string): string => {
  return text.replace(envRegex, replacement);
};

/**
 * Replaces environment keys in a string recursively
 * @param text
 * @param env
 */
export const replaceEnvKeyRecursively = (
  text: string,
  env: Record<string, string>,
) => {
  const envInKey = extractEnvRegex(text);
  if (envInKey) {
    const newText = replaceEnvRegex(text, env[envInKey]);
    return replaceEnvKeyRecursively(newText, env);
  }
  return text;
};

/**
 * Replaces environment keys in a record object recursively
 * @param record
 * @param env
 */
export const replaceEnvPlaceholders = (
  record: Record<string, any>,
  env: Record<string, string>,
): any => {
  for (const key in record) {
    // set props values env:
    if (typeof record[key] === 'string') {
      record[key] = replaceEnvKeyRecursively(record[key], env);
    } else if (typeof record[key] === 'object') {
      record[key] = replaceEnvPlaceholders(record[key], env);
    }
    // set props keys env:
    const newKey = replaceEnvKeyRecursively(key, env);
    if (newKey !== key) {
      record[newKey] = record[key];
      delete record[key];
    }
  }
  return record;
};
