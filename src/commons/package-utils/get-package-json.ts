// eslint-disable-next-line @typescript-eslint/no-var-requires
const readJson = require('read-package-json');

export const getPackageJson = (packagePath: string) => {
  return new Promise<Record<string, any>>((resolve, reject) => {
    readJson(
      packagePath,
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
