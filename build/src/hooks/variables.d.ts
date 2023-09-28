import { ISHookTO } from "../definitions.js";
import { enclauruseHook } from "../enclauruseHook.js";
export declare class variablesHook extends enclauruseHook implements ISHookTO {
    regex: RegExp;
    _indollar: boolean;
    _incurly: boolean;
    _incurly3: boolean;
    _insquare: boolean;
    run: (match: RegExpMatchArray, from: string) => Promise<string>;
}
