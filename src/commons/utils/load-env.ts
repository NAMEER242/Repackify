import * as dotenv from 'dotenv';

export const loadEnv = (
  env: string,
  extraEnvs: string[],
): NodeJS.ProcessEnv => {
  if (env) {
    dotenv.config({ path: env });
  }
  if (extraEnvs) {
    dotenv.config({ path: extraEnvs });
  }

  return process.env;
};
