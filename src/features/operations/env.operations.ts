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
 * Replaces environment keys in a packProps object recursively
 * @param packProps
 * @param env
 */
export const replaceEnvPlaceholders = (
  packProps: Record<string, any>,
  env: Record<string, string>,
): any => {
  for (const key in packProps) {
    // set props values env:
    if (typeof packProps[key] === 'string') {
      packProps[key] = replaceEnvKeyRecursively(packProps[key], env);
    } else if (typeof packProps[key] === 'object') {
      packProps[key] = replaceEnvPlaceholders(packProps[key], env);
    }
    // set props keys env:
    const newKey = replaceEnvKeyRecursively(key, env);
    if (newKey !== key) {
      packProps[newKey] = packProps[key];
      delete packProps[key];
    }
  }
  return packProps;
};
