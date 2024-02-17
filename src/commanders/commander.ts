export type HelpDoc = {
  commandObject: Commander;
  command: string;
  description: string | undefined;
  subCommandsDoc: {
    command: string;
    description: string | undefined;
  }[];
  optionsDoc?: {
    option: string;
    description: string | undefined;
    required: boolean | undefined;
  }[];
};

type CommandOptions = {
  option: string;
  shortOption: string;
  description?: string;
  required?: boolean;
};

export interface CommanderProps {
  command: string;
  description?: string;
  commandOptions?: CommandOptions[];
  subCommands?: Commander[];
  script: (options: Record<string, any>) => Promise<void>;
  isDefault?: boolean;
}

export class Commander {
  constructor(props: CommanderProps) {
    this.command = props.command;
    this.description = props.description;
    this.commandOptions = props.commandOptions;
    this.subCommands = props.subCommands ?? [];
    this.script = props.script;
    this.isDefault = props.isDefault ?? false;
  }

  public readonly command: string;
  public readonly description: string;
  public readonly commandOptions: CommandOptions[];
  public readonly subCommands: Commander[];
  public readonly script: (options: Record<string, any>) => Promise<void>;
  public readonly isDefault: boolean = false;

  async run(args: string[]): Promise<boolean> {
    if (this.extractCommand(args, this.command) || this.isDefault) {
      if (!this.checkSubCommands(this.subCommands, args)) {
        const error = `Command "${args[0]}" not found`;
        global._logger.error(error);
        throw new Error(error);
      }

      for (const subCommand of this.subCommands) {
        if (subCommand && subCommand.command) {
          const subcommand = await subCommand.run(args);
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

      await this.script(options);

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
        const key = this.removeCommandOptionPrefix(option.option);
        const value = args[1] ?? key;
        finalOptions[key] = !value.startsWith('-') ? value : key;
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
          const error = `Option [${option.option} or ${option.shortOption}] is required`;
          global._logger.error(error);
          throw new Error(error);
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

  getHelpDocs(): HelpDoc {
    const subCommandsDoc = (this.subCommands ?? []).map((subCommand) => {
      return {
        command: subCommand.command,
        description: subCommand.description,
      };
    });

    const optionsDoc = (this.commandOptions ?? []).map((options) => {
      return {
        option: `${options.option} ${options.shortOption}`,
        description: options.description,
        required: options.required,
      };
    });

    return {
      commandObject: this,
      command: this.command,
      description: this.description,
      subCommandsDoc,
      optionsDoc,
    };
  }
}
