import {
  backup,
  deleteFile,
  getPackageJson,
  restore,
} from '../../commons/package-utils';
import { getConfig, loadEnv } from '../../commons/utils';
import { operationRunner } from '../../features/operationRunner';

export class packageService {
  async backup() {
    const packageJson = await getPackageJson(global.configs.packageDir);
    await backup(packageJson, global.configs.backupDir);
    global._logger.success(`Backup complete.`);
  }

  async restore() {
    const backupPackage = await getPackageJson(global.configs.backupDir);
    await restore(backupPackage, global.configs.packageDir);
    deleteFile(global.configs.backupDir);
    global._logger.success('Package restored successfully.');
  }

  async refactor(options: Record<string, any>) {
    const baseEnv = options['env'] ?? '.env';
    const extraEnvs = (options['extra_env'] ?? '').split(',') ?? [];

    const packageJson = await getPackageJson(global.configs.packageDir);
    await backup(packageJson, global.configs.backupDir);
    const refactorConfig = getConfig(packageJson);
    const env = loadEnv(baseEnv, extraEnvs);
    const refactoredPackage = operationRunner(packageJson, refactorConfig, env);
    await restore(refactoredPackage, global.configs.packageDir);
    global._logger.success(`Refactor complete.`);
  }
}
