import { Commander, HelpDoc } from '../commander';
import { packageService } from '../providers/package.service';
import { formatCommandHelpDoc } from '../../commons/utils';

export const restoreSubcommand = new Commander({
  command: 'restore',
  description: 'Restore the package.json file from the backup.',
  commandOptions: [
    {
      option: '--help',
      shortOption: '-h',
      description: 'Display help for the command.',
    },
  ],
  script: async (options) => {
    if (options['help']) {
      const helpDoc: HelpDoc = restoreSubcommand.getHelpDocs();
      console.log(formatCommandHelpDoc(helpDoc));
      return;
    }
    await new packageService().restore();
  },
});
