#!/usr/bin/env node
import { dirname } from 'path';
import { packageCommand } from './commanders';
import { Logger } from './commons/utils/logger';

// setting global variable to the parent directory.
global._projectDir = dirname(__dirname);

// setting global logger.
global._logger = new Logger('Repackify');

// setting global configs.
global.configs = {
  packageDir: `${global._projectDir}/package.json`,
  backupDir: `${global._projectDir}/package.backup`,
};

packageCommand.run(process.argv.slice(2));
