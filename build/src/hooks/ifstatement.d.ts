import { ISHookTO } from "../definitions";
export declare class ifstatementHook implements ISHookTO {
    hook: RegExp;
    run: (match: RegExpMatchArray, from: string) => Promise<string>;
}
