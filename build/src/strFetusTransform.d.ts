import { TSReplacer } from "./definitions";
import { strCommons } from "./strCommons";
export declare abstract class strFetusTransformer extends strCommons {
    protected str: string;
    readonly regex: RegExp;
    protected readonly filter?: TSReplacer | undefined;
    private limiteRunLoop_counter;
    readonly limiteRunLoop: number;
    constructor(str: string, regex: RegExp, filter?: TSReplacer | undefined);
    run(): Promise<string>;
    protected abstract processMatch(match: RegExpMatchArray): Promise<string>;
    private recursiveTransform;
    private transform;
}
