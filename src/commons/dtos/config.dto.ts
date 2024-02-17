export class ConfigDto {
  remove: string[];
  replace: Record<string, any>[];
  add: Record<string, any>[];
  replaceText: { text: string; replace: string }[];
  customOperation: ((record: Record<string, any>) => Record<string, any>)[];
}
