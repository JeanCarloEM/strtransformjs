import { ISHookTO } from "../definitions";
export declare class mainHook implements ISHookTO {
    hook: RegExp;
    run: (match: RegExpMatchArray, from: string) => Promise<string>;
}
