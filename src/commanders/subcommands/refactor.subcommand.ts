import { Commander } from '../commander';
import { operationRunner } from '../../features/operationRunner';
import { backup, getPackageJson, restore } from '../../commons/package-utils';
import { getConfig, loadEnv } from '../../commons/utils';

export const refactorSubcommand = new Commander({
  command: 'refactor',
  commandOptions: [
    { option: '--env', shortOption: '-e' },
    { option: '--extra_env', shortOption: '-ee' },
  ],
  script: async (options) => {
    const baseEnv = options['env'] ?? '.env';
    const extraEnvs = (options['extra_env'] ?? '').split(',') ?? [];

    const packageJson = await getPackageJson(global.configs.packageDir);
    await backup(packageJson, global.configs.backupDir);
    const refactorConfig = getConfig(packageJson);
    const env = loadEnv(baseEnv, extraEnvs);
    const refactoredPackage = operationRunner(packageJson, refactorConfig, env);
    await restore(refactoredPackage, global.configs.packageDir);
    global._logger.success(`Refactor complete.`);
  },
});
