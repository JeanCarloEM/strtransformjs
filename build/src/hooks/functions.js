import { enclauruseHook } from "../enclauruseHook";
export class functionHook extends enclauruseHook {
    constructor() {
        super(...arguments);
        this.regex = /\{?\{\{\s*#?(?<func>[\w]+)\s*\:(?<args>(\s*[^\s\|\{\}\[\]\$\\]+(\s+[^\s\|\{\}\[\]\$\\]+)*)(\s*\|\s*[^\s\|\{\}\[\]\$\\]+(\s+[^\s\|\{\}\[\]\$\\]+)*)*)\s*\}\}\}?/gi;
        this._indollar = true;
        this._incurly = true;
        this._incurly3 = false;
        this._insquare = false;
        this.run = (match, from) => {
            return new Promise((R0, R_0) => {
                const s = '__a\\{b\\}\{c\}\\\\{d\\\\}__';
                console.warn(s);
                R0(s);
            });
        };
    }
}
//# sourceMappingURL=functions.js.map