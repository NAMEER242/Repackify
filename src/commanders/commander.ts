type CommandOptions = {
  option: string;
  shortOption: string;
  required?: boolean;
};

interface CommanderProps {
  command: string;
  commandOptions?: CommandOptions[];
  subCommands?: Commander[];
  script: (options: Record<string, any>) => void;
}

export class Commander {
  constructor(props: CommanderProps) {
    this.command = props.command;
    this.commandOptions = props.commandOptions;
    this.subCommands = props.subCommands ?? [];
    this.script = props.script;
  }

  private readonly command: string;
  private readonly commandOptions: CommandOptions[];
  private readonly subCommands: Commander[];
  private readonly script: (options: Record<string, any>) => void;

  run(args: string[]): boolean {
    if (this.extractCommand(args, this.command)) {
      if (!this.checkSubCommands(this.subCommands, args)) {
        throw new Error(`Command ${args[0]} not found`);
      }

      for (const subCommand of this.subCommands) {
        if (subCommand && subCommand.command) {
          const subcommand = subCommand.run(args);
          if (subcommand) {
            return true;
          }
        }
      }

      let options: Record<string, any> = {};
      if (this.commandOptions) {
        options = this.getCommandOptions(args, this.commandOptions);
        this.checkForRequiredOptions(this.commandOptions, options);
      }

      this.script(options);

      return true;
    }

    return false;
  }

  private extractCommand(args: string[], command: string): string | null {
    if (args.length === 0) {
      return null;
    }

    const commandExists = command == args[0];

    if (commandExists) {
      args.splice(0, 1);
      return command;
    } else {
      return null;
    }
  }

  private removeCommandOptionPrefix(args: string) {
    return args.replace(/^-+/g, '');
  }

  private getCommandOptions(args: string[], options: CommandOptions[]) {
    if (args.length === 0 || options.length === 0) {
      return {};
    }
    const finalOptions: Record<string, any> = {};
    for (const option of options) {
      if (option.option === args[0] || option.shortOption === args[0]) {
        const key = this.removeCommandOptionPrefix(args[0]);
        finalOptions[key] = args[1];
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
        if (!options[option.option] && !options[option.shortOption]) {
          throw new Error(
            `Option [${option.option} or ${option.shortOption}] is required`,
          );
        }
      }
    }
  }

  private checkSubCommands(subCommands: Commander[], args: string[]) {
    if (args.length === 0 || subCommands.length === 0) {
      return true;
    }
    const isCommandOption = args[0].startsWith('-');
    const isSubcommand =
      subCommands.find((subCommand) => subCommand.command === args[0]) !==
      undefined;
    return isCommandOption || isSubcommand;
  }
}
