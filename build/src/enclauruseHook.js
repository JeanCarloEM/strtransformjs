import { strCommons } from "./strCommons.js";
export class enclauruseHook {
    constructor() {
        this.hr = null;
        this.hook = () => {
            if (!this.hr) {
                this.hr = (strCommons.makeRegexIn(this.regex, this._indollar, this._incurly, this._incurly3, this._insquare));
            }
            ;
            return this.hr;
        };
    }
}
//# sourceMappingURL=enclauruseHook.js.map