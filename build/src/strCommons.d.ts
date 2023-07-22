import { PromiseExecutionMode, TSPromiseMatch } from "./definitions.js";
export declare abstract class strCommons {
    static replaceAsync: (input: string, regex: string | RegExp, replacer: string | TSPromiseMatch) => Promise<string>;
    static replaceAllAsync: (input: string, regex: RegExp, replacement: (match: RegExpMatchArray) => Promise<string>, mode?: PromiseExecutionMode) => Promise<string>;
}
