import { Commander } from '../commander';
import { backupSubcommand } from '../subcommands/backup.subcommand';
import { restoreSubcommand } from '../subcommands/restore.subcommand';
import { refactorSubcommand } from '../subcommands/refactor.subcommand';

export const packageCommand = new Commander({
  command: 'package',
  script: async () => {
    console.log('Repacking');
  },
  subCommands: [backupSubcommand, restoreSubcommand, refactorSubcommand],
});
