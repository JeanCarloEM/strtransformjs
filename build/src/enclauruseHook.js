import { strCommons } from "./strCommons";
export class enclauruseHook {
    constructor() {
        this.hr = null;
        this.hook = () => {
            if (!this.hr) {
                this.hr = (strCommons.makeRegexIn(this.regex, true, false, false, false));
            }
            ;
            return this.hr;
        };
    }
}
//# sourceMappingURL=enclauruseHook.js.map