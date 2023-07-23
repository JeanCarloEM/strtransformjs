import { TSReplaceFilter, TSReplacerAllAsync, TSSource } from "./definitions";
import { strTransformHookable } from "./strTransformHookable.js";
export declare class strTransformeCore extends strTransformHookable {
    private src;
    constructor(src?: TSSource, defReplace?: string, ukn?: null | TSReplacerAllAsync, filter?: null | TSReplaceFilter);
}
