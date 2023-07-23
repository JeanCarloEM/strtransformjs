export type TSSource = Object;

export type TstringTransform = (
  src: TSSource,
  defkey: string,
  ukn: TSReplacerAllAsync,
  filterValue: TSReplaceFilter
) => Promise<string>;

export type TSPromiseMatch = (
  match: string,
  ...args: any[]
) => Promise<string>;

export type TSReplaceAsync = (
  searchValue: string | RegExp,
  replacer: string | TSPromiseMatch
) => Promise<string>;

export interface ISHookTO {
  hook: RegExp,
  run: TSReplacerAllAsync
}

export type TSDinamicRegexGetter = () => RegExp | null;

export interface ISTRHookableTransform {
  addHook(hook: ISHookTO): boolean;
  hookLen(): number;
  run(str: string): Promise<string>;
  getHooks(key: number | boolean): ISHookTO | readonly ISHookTO[];
}

export type TSReplacerAllAsync = (match: RegExpMatchArray, from: string) => Promise<string>;
export type TSReplaceFilter = (value: string, match: RegExpMatchArray) => Promise<string>;

export interface strEmbryonicTransform {
  replaceAllAsync(
    str: string,
    pattern: RegExp,
    replacer: TSReplacerAllAsync,
    mode: PromiseExecutionMode
  ): Promise<string>;

  replaceAsync(
    input: string, regex: string | RegExp,
    replacer: string | TSPromiseMatch
  ): Promise<string>;
}

export type TSReplaceAllAsync = (
  searchValue: RegExp,
  replacer: TSReplacerAllAsync
) => Promise<string>;

declare global {
  export interface String {
    tranform: TstringTransform,
    replaceAsync: TSReplaceAsync,
    replaceAllAsync: TSReplaceAllAsync
  }
}

export enum PromiseExecutionMode {
  // Uses Promise.All -- which is the fastest, but may overwhelm
  All = 0,
  // Uses an await on each replacement, making it synchronous
  ForEach = 1,
}
