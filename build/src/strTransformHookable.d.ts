import { ISTRHookableTransform, TSReplaceFilter, TSHookTO, TSReplacerAllAsync, TSHook, TSSource } from "./definitions";
import { strFetusTransformer as strFetusTransform } from "./strFetusTransform";
export declare abstract class strTransformHookable extends strFetusTransform implements ISTRHookableTransform {
    protected str: string;
    protected src?: Object | undefined;
    readonly defkey?: string | undefined;
    private readonly ukn?;
    private static _hooks;
    private hook_index;
    constructor(str: string, regex: RegExp, src?: Object | undefined, defkey?: string | undefined, ukn?: TSReplacerAllAsync | undefined, filter?: TSReplaceFilter);
    getSrc(): TSSource;
    static hookLen(): number;
    static addHook(hook: TSHookTO): boolean;
    protected static getHooks(): readonly TSHook[];
    protected eachHooks(fullOrDef: string): Promise<string>;
    protected processMatch(match: RegExpMatchArray): Promise<string>;
}
