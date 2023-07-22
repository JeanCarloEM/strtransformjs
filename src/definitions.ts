export type TSSource = Object;

export type TstringTransformation = (
  regex: RegExp,
  src: TSSource,
  defkey: string,
  ukn: TSReplacerAllAsync,
  filterValue: TSReplaceFilter
) => Promise<string>;

export type TstringTransform = (
  src: TSSource,
  defkey: string,
  ukn: TSReplacerAllAsync,
  filterValue: TSReplaceFilter
) => Promise<string>;

/*
 * OLD
 */

export type TSFilterValue = (value: any,
  match: string,
  ...args: any[]
) => Promise<string>;

export type TSPromiseMatch = (
  match: string,
  ...args: any[]
) => Promise<string>;

export type TSReplaceAsync = (
  searchValue: string | RegExp,
  replacer: string | TSPromiseMatch
) => Promise<string>;

export type TSHookTO = {
  hook: RegExp,
  caller: TSHook
}


export interface ISTRHookableTransform {
}

/*
 * NEW
 */
export type TSReplacerAllAsync = (match: RegExpMatchArray) => Promise<string>;
export type TSReplaceFilter = (value: string, match: RegExpMatchArray) => Promise<string>;
export type TSHook = (fullOrDef: string, transformer: ISTRHookableTransform) => Promise<string>;

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
