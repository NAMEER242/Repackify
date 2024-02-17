import dotenv from 'dotenv';

export const loadEnv = (env: string, extraEnvs: string[]): void => {
  if (env) {
    dotenv.config({ path: env });
  }
  if (extraEnvs) {
    dotenv.config({ path: extraEnvs });
  }
};
