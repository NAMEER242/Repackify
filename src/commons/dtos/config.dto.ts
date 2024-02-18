/**
 * The ConfigDto class is used to define the configuration for a refactoring operation,
 * it contains several properties that determine how the operation should be performed.
 */
export class ConfigDto {
  remove: string[];
  replace: Record<string, any>[];
  add: Record<string, any>[];
  replaceText: { text: string; replace: string }[];
  customOperation: ((record: Record<string, any>) => Record<string, any>)[];
}
