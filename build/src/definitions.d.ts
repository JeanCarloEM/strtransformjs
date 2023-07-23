export type TSSource = Object;
export type TstringTransformation = (regex: RegExp, src: TSSource, defkey: string, ukn: TSReplacerAllAsync, filterValue: TSReplaceFilter) => Promise<string>;
export type TstringTransform = (src: TSSource, defkey: string, ukn: TSReplacerAllAsync, filterValue: TSReplaceFilter) => Promise<string>;
export type TSFilterValue = (value: any, match: string, ...args: any[]) => Promise<string>;
export type TSPromiseMatch = (match: string, ...args: any[]) => Promise<string>;
export type TSReplaceAsync = (searchValue: string | RegExp, replacer: string | TSPromiseMatch) => Promise<string>;
export interface ISHookTO {
    hook: RegExp;
    run: TSReplacerAllAsync;
}
export type TSDinamicRegexGetter = () => RegExp | null;
export interface ISTRHookableTransform {
    addHook: (hook: ISHookTO) => boolean;
    hookLen: () => number;
    run: (str: string) => Promise<string>;
    getHooks: (key: number | boolean) => ISHookTO | readonly ISHookTO[];
}
export type TSReplacerAllAsync = (match: RegExpMatchArray, from: string) => Promise<string>;
export type TSReplaceFilter = (value: string, match: RegExpMatchArray) => Promise<string>;
export type TSReplaceAllAsync = (searchValue: RegExp, replacer: TSReplacerAllAsync) => Promise<string>;
declare global {
    export interface String {
        tranform: TstringTransform;
        replaceAsync: TSReplaceAsync;
        replaceAllAsync: TSReplaceAllAsync;
    }
}
export declare enum PromiseExecutionMode {
    All = 0,
    ForEach = 1
}
