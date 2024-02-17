type CommandOptions = {
  option: string;
  shortOption: string;
  required?: boolean;
};

interface CommanderProps {
  command: string;
  commandOptions?: CommandOptions[];
  subCommand?: Commander;
  script: (options: Record<string, any>) => void;
}

export class Commander {
  constructor(props: CommanderProps) {
    this.command = props.command;
    this.commandOptions = props.commandOptions;
    this.subCommand = props.subCommand;
    this.script = props.script;
  }

  private readonly command: string;
  private readonly commandOptions: CommandOptions[];
  private readonly subCommand: Commander;
  private readonly script: (options: Record<string, any>) => void;

  run(args: string[]): boolean {
    if (this.extractCommand(args, this.command)) {
      if (this.subCommand && this.subCommand.command) {
        const subcommand = this.subCommand.run(args);
        if (subcommand) {
          return true;
        }
      }

      let options: Record<string, any> = {};
      if (this.commandOptions) {
        options = this.getCommandOptions(args, this.commandOptions);
        this.checkForRequiredOptions(this.commandOptions, options);
      }

      this.script(options);
    }
  }

  private extractCommand(args: string[], command: string): string | null {
    const commandExists = command == args[0];

    if (commandExists) {
      args.splice(0, 1);
      return command;
    } else {
      return null;
    }
  }

  private getCommandOptions(args: string[], options: CommandOptions[]) {
    const finalOptions: Record<string, any> = {};
    for (const option of options) {
      if (option.option === args[0] || option.shortOption === args[0]) {
        finalOptions[args[0]] = args[1];
        args.splice(0, 2);
      }
    }
    return finalOptions;
  }

  private checkForRequiredOptions(
    commandOptions: CommandOptions[],
    options: Record<string, any>,
  ) {
    for (const option of commandOptions) {
      if (option.required) {
        if (!options[option.option]) {
          throw new Error(`Option ${option.option} is required`);
        }
      }
    }
  }
}
