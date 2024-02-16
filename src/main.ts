import readJson from 'read-package-json';
import path, { dirname } from 'path';

const __dirname = path.resolve(dirname('./'), 'src');
const parentDir = path.dirname(__dirname);
readJson(
  `${parentDir}/package.json`,
  console.error,
  false,
  function (er: NodeJS.ErrnoException, data: Record<string, any>) {
    if (er) {
      console.error(er);
      return;
    }

    console.error('the package data is', data);
  },
);
