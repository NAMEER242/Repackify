import { Commander } from '../commander';
import {
  deleteFile,
  getPackageJson,
  restore,
} from '../../commons/package-utils';

export const restoreSubcommand = new Commander({
  command: 'restore',
  script: async () => {
    const backupPackage = await getPackageJson(global.configs.backupDir);
    await restore(backupPackage, global.configs.packageDir);
    deleteFile(global.configs.backupDir);
    global._logger.success('Package restored successfully.');
  },
});
