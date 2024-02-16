// eslint-disable-next-line @typescript-eslint/no-var-requires
const readJson = require('read-package-json');

export const getPackageJson = (packageName = 'package.json') => {
  return new Promise<Record<string, any>>((resolve, reject) => {
    const packageJsonPath = `${global._projectDir}/${packageName}`;

    readJson(
      packageJsonPath,
      console.error,
      false,
      (er: NodeJS.ErrnoException, data: Record<string, any>) => {
        if (er) {
          reject(er);
        } else {
          resolve(data);
        }
      },
    );
  });
};
