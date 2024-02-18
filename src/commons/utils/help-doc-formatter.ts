/**
 * ╔══════════════════════════════════════╗
 * ║                                      ║
 * ║  Code Quality Improvement Notice!!   ║
 * ║                                      ║
 * ╠══════════════════════════════════════╣
 * ║                                      ║
 * ║   The current state of this file     ║
 * ║   indicates a need for refinement.   ║
 * ║   Please consider performing         ║
 * ║   a thorough code cleanup to enhance ║
 * ║   maintainability and readability.   ║
 * ║                                      ║
 * ╚══════════════════════════════════════╝
 */

import { HelpDoc } from '../../commanders/commander';

export const formatCommandHelpDoc = (helpDoc: HelpDoc): string => {
  return `${helpDoc.command}
  
${helpDoc.description ?? ''}

${helpDoc.subCommandsDoc.length > 0 ? 'Usage:\n' : ''}
${formatSubCommandsHelpDoc(helpDoc)}

${helpDoc.optionsDoc.length > 0 ? 'Options:\n' : ''}
${formatCommandOptionsHelpDoc(helpDoc)}
`;
};

export const formatSubCommandsHelpDoc = (helpDoc: HelpDoc): string => {
  // Find the maximum length of the command names
  const maxCommandLength = helpDoc.subCommandsDoc.reduce((max, subCommand) => {
    const formattedSubCommands = `${helpDoc.command} ${subCommand.command}`;
    return Math.max(max, formattedSubCommands.length);
  }, 0);

  // Format each subcommand's documentation
  return helpDoc.subCommandsDoc
    .map((subCommand) => {
      const formattedSubCommands = `${helpDoc.command} ${subCommand.command}`;

      // Pad the command name with spaces to align the descriptions
      const paddedCommand = formattedSubCommands.padEnd(maxCommandLength, ' ');

      return `${paddedCommand}  ${subCommand.description ?? ''}`;
    })
    .join('\n');
};

export const formatCommandOptionsHelpDoc = (helpDoc: HelpDoc): string => {
  // Find the maximum length of the command names
  const maxOptionLength = helpDoc.optionsDoc.reduce((max, commandOption) => {
    const formattedOption = `${helpDoc.command} ${commandOption.option}`;
    return Math.max(max, formattedOption.length);
  }, 0);

  // Format each subcommand's documentation
  return helpDoc.optionsDoc
    .map((commandOption) => {
      const formattedOption = `${helpDoc.command} ${commandOption.option}`;

      // Pad the command name with spaces to align the descriptions
      const paddedCommand = formattedOption.padEnd(maxOptionLength, ' ');

      return `${paddedCommand}  ${commandOption.description ?? ''}`;
    })
    .join('\n');
};
