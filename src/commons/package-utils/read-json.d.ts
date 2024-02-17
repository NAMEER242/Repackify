declare module 'read-package-json' {
  type Callback = (err: Error | null, data?: any) => void;
  type LogFunction = (...args: any[]) => void;

  export default function readJson(
    file: string,
    log_?: LogFunction,
    strict_?: boolean,
    cb_?: Callback,
  );
}
