// eslint-disable-next-line @typescript-eslint/no-var-requires
const readJson = require('read-package-json');

export const getPackageJson = async (
  packagePath: string,
  decodeUri: boolean = true,
) => {
  let packageJson = await new Promise<Record<string, any>>(
    (resolve, reject) => {
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
    },
  );

  if (decodeUri) {
    packageJson = JSON.parse(decodeURIComponent(JSON.stringify(packageJson)));
  }

  return packageJson;
};
