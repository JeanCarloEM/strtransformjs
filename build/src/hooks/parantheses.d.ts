import { ISHookTO } from "../definitions";
export declare class paranthesesHook implements ISHookTO {
    hook: RegExp;
    run: (match: RegExpMatchArray, from: string) => Promise<string>;
}
