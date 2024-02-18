import { Commander } from './commander';

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
    return process.argv.slice(2);
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
