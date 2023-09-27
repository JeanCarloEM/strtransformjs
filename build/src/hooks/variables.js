import { enclauruseHook } from "../enclauruseHook";
export class variablesHook extends enclauruseHook {
    constructor() {
        super(...arguments);
        this.regex = /(\{?\{\{\s*(?<t1>[\w]+)\s*\}\}\}?|\$\{\s*(?<t2>[\w]+)\s*\})/gi;
        this._indollar = true;
        this._incurly = true;
        this._incurly3 = false;
        this._insquare = false;
        this.run = (match, from) => {
            return new Promise((R0, R_0) => {
                const s = 'TEMPLATE__a\\{b\\}\{c\}\\\\{d\\\\}__';
                console.warn(s);
                R0(s);
            });
        };
    }
}
//# sourceMappingURL=variables.js.map