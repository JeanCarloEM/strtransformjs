import { TSReplacerAllAsync, ISHookTO } from "./definitions";
export declare abstract class enclauruseHook implements ISHookTO {
    abstract run: TSReplacerAllAsync;
    abstract regex: RegExp;
    abstract _indollar: boolean;
    abstract _incurly: boolean;
    abstract _incurly3: boolean;
    abstract _insquare: boolean;
    private hr;
    hook: () => RegExp;
}
