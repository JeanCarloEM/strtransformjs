import { ISHookTO } from "../definitions";
export declare class main implements ISHookTO {
    hook: RegExp;
    run: (match: RegExpMatchArray, from: string) => Promise<string>;
}
