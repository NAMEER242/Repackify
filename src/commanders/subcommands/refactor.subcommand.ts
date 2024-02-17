import { Commander, HelpDoc } from '../commander';
import { packageService } from '../providers/package.service';
import { formatCommandHelpDoc } from '../../commons/utils';

export const refactorSubcommand = new Commander({
  command: 'refactor',
  description: 'Refactor package.json file using the provided configuration.',
  commandOptions: [
    {
      option: '--env',
      shortOption: '-e',
      description: 'Path to the base .env file.',
    },
    {
      option: '--extra_env',
      shortOption: '-ee',
      description: 'Used to set extra .env files (e.g. "-ee .env,.dev.env").',
    },
    {
      option: '--help',
      shortOption: '-h',
      description: 'Display help for the command.',
    },
  ],
  script: async (options) => {
    if (options['help']) {
      const helpDoc: HelpDoc = refactorSubcommand.getHelpDocs();
      console.log(formatCommandHelpDoc(helpDoc));
      return;
    }

    await new packageService().refactor(options);
  },
});
