import { ISHookTO } from "../definitions";
export declare class ifstatement implements ISHookTO {
    hook: RegExp;
    run: (match: RegExpMatchArray, from: string) => Promise<string>;
}
