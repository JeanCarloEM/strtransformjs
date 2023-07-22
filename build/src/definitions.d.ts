export type TSSource = Object;
export type TstringTransform = (regex: RegExp, src: TSSource, defkey: string, ukn: TSReplacerAllAsync, filterValue: TSReplacer) => Promise<string>;
export type TSFilterValue = (value: any, match: string, ...args: any[]) => Promise<string>;
export type TSPromiseMatch = (match: string, ...args: any[]) => Promise<string>;
export type TSReplaceAsync = (searchValue: string | RegExp, replacer: string | TSPromiseMatch) => Promise<string>;
export type TSHookTO = {
    hook: RegExp;
    caller: TSReplacer;
};
export type TSReplacerAllAsync = (match: RegExpMatchArray) => Promise<string>;
export type TSReplacer = (value: string, match: RegExpMatchArray) => Promise<string>;
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
