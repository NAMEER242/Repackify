import { dirname } from 'path';
import { backup, getPackageJson, restore } from './common/package-utils';
import { getConfig } from './common/utils';

// setting global variable to the parent directory.
global._projectDir = dirname(__dirname);

async function main() {
  const packageJson = await getPackageJson();
  const backupPackage = await backup(packageJson);
  console.log('Backup complete');
  await restore(backupPackage);
  console.log('Restore complete');

  const config = getConfig(packageJson);
  console.log(config);
}

// main();

require('dotenv').config({ path: '/custom/path/to/your/.env' });
console.log(process.env);
