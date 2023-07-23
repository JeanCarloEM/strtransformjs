import { TSReplacerAllAsync, PromiseExecutionMode, TSPromiseMatch } from "./definitions.js";
export declare abstract class strCommons {
    static replaceAsync: (input: string, regex: string | RegExp, replacer: string | TSPromiseMatch) => Promise<string>;
    static replaceAllAsync: (str: string, pattern: RegExp, replacer: TSReplacerAllAsync, mode?: PromiseExecutionMode) => Promise<string>;
}
