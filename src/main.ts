import { dirname } from 'path';
import { backup, getPackageJson, restore } from './commons/package-utils';
import { getConfig } from './commons/utils';
import { packageCommand } from './commanders';
import { Logger } from './commons/utils/logger';

// setting global variable to the parent directory.
global._projectDir = dirname(__dirname);

// setting global logger.
global._logger = new Logger('Repackify');

global.configs = {
  packageDir: `${global._projectDir}/package.json`,
  backupDir: `${global._projectDir}/package.backup`,
};

async function main() {
  const packageJson = await getPackageJson(global.configs.packageDir);
  const backupPackage = await backup(packageJson, global.configs.backupDir);
  console.log('Backup complete');
  await restore(backupPackage, global.configs.packageDir);
  console.log('Restore complete');

  const config = getConfig(packageJson);
  console.log(config);
}

// main();

packageCommand.run(process.argv.slice(2));
