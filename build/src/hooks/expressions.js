import { enclauruseHook } from "../enclauruseHook";
export class expressionsHook extends enclauruseHook {
    constructor() {
        super(...arguments);
        this.regex = /([^\:\!\#\{\}\]\[]+)/gi;
        this._indollar = true;
        this._incurly = true;
        this._incurly3 = false;
        this._insquare = false;
        this.run = (match, from) => {
            return new Promise((R0, R_0) => {
                let exp = match[1]
                    .replace(/\s(and)\s/gi, "&&")
                    .replace(/\s(or)\s/gi, "&&")
                    .replace(/\s*(div)\s*/gi, "/")
                    .replace(/\s(mod)\s/gi, "%")
                    .replace(/\s*(\^)\s*/gi, "**");
                R0(exp);
            });
        };
    }
}
//# sourceMappingURL=expressions.js.map