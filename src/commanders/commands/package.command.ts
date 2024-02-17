import { Commander, HelpDoc } from '../commander';
import { backupSubcommand } from '../subcommands/backup.subcommand';
import { restoreSubcommand } from '../subcommands/restore.subcommand';
import { refactorSubcommand } from '../subcommands/refactor.subcommand';
import { formatCommandHelpDoc } from '../../commons/utils';

export const packageCommand = new Commander({
  command: 'repack',
  description:
    'This package provides a command-line interface for managing node packages.json files.',
  commandOptions: [
    {
      option: '--help',
      shortOption: '-h',
      description: 'Display help for the command.',
    },
  ],
  isDefault: true,
  script: async (options: Record<string, any>) => {
    // remove "|| true" when this script gets more options and functionality.
    if (options['help'] || true) {
      const helpDoc: HelpDoc = packageCommand.getHelpDocs();
      console.log(formatCommandHelpDoc(helpDoc));
      return;
    }
  },
  subCommands: [backupSubcommand, restoreSubcommand, refactorSubcommand],
});
