#!/usr/bin/env node
import { dirname } from 'path';
import { CommandRunner, packageCommand } from './commanders';
import { Logger } from './commons/utils';

// setting global variable to the parent directory.
global._projectDir = dirname(__dirname);

// setting global logger.
global._logger = new Logger('Repackify');

// setting global configs.
global.configs = {
  packageDir: `${global._projectDir}/package.json`,
  backupDir: `${global._projectDir}/package.backup`,
};

async function bootstrap() {
  const commandApp = new CommandRunner([packageCommand]);
  await commandApp.run();
}

bootstrap();
