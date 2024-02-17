import { Commander } from '../commander';
import { backup, getPackageJson } from '../../commons/package-utils';

export const backupSubcommand = new Commander({
  command: 'backup',
  script: async () => {
    const packageJson = await getPackageJson(global.configs.packageDir);
    await backup(packageJson, global.configs.backupDir);
    global._logger.success(`Backup complete.`);
  },
});
