import { TSDinamicRegexGetter, TSReplacerAllAsync, TSReplaceFilter } from "./definitions.js";
import { strCommons } from "./strCommons.js";
export declare abstract class strEmbryonicTransform extends strCommons {
    protected regex: null | RegExp | TSDinamicRegexGetter;
    readonly defReplace: string;
    protected readonly ukn: null | TSReplacerAllAsync;
    protected readonly filter: null | TSReplaceFilter;
    private limiteRunLoop_counter;
    readonly limiteRunLoop: number;
    constructor(regex?: null | RegExp | TSDinamicRegexGetter, defReplace?: string, ukn?: null | TSReplacerAllAsync, filter?: null | TSReplaceFilter);
    run(str: string): Promise<string>;
    protected abstract processMatch: TSReplacerAllAsync;
    private recursiveTransform;
    private processAndApplyFilter;
}
