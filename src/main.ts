#!/usr/bin/env node
import { CommandRunner, packageCommand } from './commanders';
import { Logger } from './commons/utils';

// setting global running directory.
global._cwd = process.cwd();

// setting global logger.
global._logger = new Logger('Repackify');

// setting global configs.
global.configs = {
  packageDir: `${global._cwd}/package.json`,
  backupDir: `${global._cwd}/package.backup`,
};

async function bootstrap() {
  const commandApp = new CommandRunner([packageCommand]);
  await commandApp.run();
}

bootstrap();
