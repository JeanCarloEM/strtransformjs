import { ISHookTO } from "../definitions";
export declare class mainTranform implements ISHookTO {
    hook: RegExp;
    run: (match: RegExpMatchArray, from: string) => Promise<string>;
}
