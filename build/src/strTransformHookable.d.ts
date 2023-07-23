import { TSReplaceFilter, ISHookTO, TSReplacerAllAsync, ISTRHookableTransform } from "./definitions.js";
import { strEmbryonicTransform as strFetusTransform } from "./strEmbryonicTransform.js";
export declare class strTransformHookable extends strFetusTransform implements ISTRHookableTransform {
    private _hooks;
    private hook_index;
    constructor(_hooks: ISHookTO[], defReplace?: string, ukn?: null | TSReplacerAllAsync, filter?: null | TSReplaceFilter);
    hookLen(): number;
    addHook(hook: ISHookTO): boolean;
    run: (str: string) => Promise<string>;
    getHooks(key?: number | boolean): ISHookTO | readonly ISHookTO[];
    protected eachHooks(str: string): Promise<string>;
    private getRegex;
    protected processMatch: (match: RegExpMatchArray, from: string) => Promise<string>;
}
