import { Commander, HelpDoc } from '../commander';
import { formatCommandHelpDoc } from '../../commons/utils';
import { packageService } from '../providers/package.service';

export const backupSubcommand = new Commander({
  command: 'backup',
  description: 'Backup the package.json file.',
  commandOptions: [
    {
      option: '--help',
      shortOption: '-h',
      description: 'Display help for the command.',
    },
  ],
  script: async (options) => {
    if (options['help']) {
      const helpDoc: HelpDoc = backupSubcommand.getHelpDocs();
      console.log(formatCommandHelpDoc(helpDoc));
      return;
    }

    await new packageService().backup();
  },
});
