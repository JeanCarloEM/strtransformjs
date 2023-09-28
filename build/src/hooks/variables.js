import { enclauruseHook } from "../enclauruseHook.js";
export class variablesHook extends enclauruseHook {
    constructor() {
        super(...arguments);
        this.regex = /([a-z][\w]+)/ig;
        this._indollar = true;
        this._incurly = true;
        this._incurly3 = false;
        this._insquare = false;
        this.run = (match, from) => {
            return new Promise((R0, R_0) => {
                const s = ' variables__' + (match[2] ? match[2] : match[3]);
                R0(s);
            });
        };
    }
}
//# sourceMappingURL=variables.js.map