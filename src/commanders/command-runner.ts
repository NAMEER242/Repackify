import { Commander } from './commander';
import { replaceEnvPlaceholders } from '../features/operations/env.operations';
import { loadEnv } from '../commons/utils';

export class CommandRunner {
  constructor(private readonly commands: Commander[]) {
    this.checkDuplicatedCommands(commands);
  }

  private checkDuplicatedCommands(commands: Commander[]): void {
    for (const command of commands) {
      const isDuplicated =
        commands.filter((c) => {
          return c.command === command.command;
        }).length > 1;
      if (isDuplicated) {
        const error = `Command "${command.command}" is duplicated`;
        global._logger.error(error);
        throw new Error(error);
      }
    }
  }

  private getArgs(): string[] {
    const args = { args: process.argv.slice(2) };
    const env = loadEnv('.env', []);
    return replaceEnvPlaceholders(args, env)['args'];
  }

  async run(): Promise<boolean> {
    for (const command of this.commands) {
      const args = this.getArgs();
      const isExecuted = await command.run(args);
      if (isExecuted) {
        return true;
      }
    }
    return false;
  }
}
