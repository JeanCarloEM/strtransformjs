import { enclauruseHook } from "../enclauruseHook.js";
export class ifstatementHook extends enclauruseHook {
    constructor() {
        super(...arguments);
        this.regex = /(?<if>[^\:\?\{\}\(\)\$]*)\?(?<true>((?:[^\:\?\{\}\(\)\$]|\\.)*))\:(?<false>((?:[^\:\?\{\}\(\)\$]|\\.)*))/gi;
        this._indollar = true;
        this._incurly = true;
        this._incurly3 = false;
        this._insquare = false;
        this.run = (match, from) => {
            return new Promise((R0, R_0) => {
                R0("__b__");
            });
        };
    }
}
//# sourceMappingURL=ifstatement.js.map