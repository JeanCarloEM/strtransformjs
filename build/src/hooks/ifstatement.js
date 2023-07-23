export class ifstatementHook {
    constructor() {
        this.hook = /(?<if>[^\:\?\{\}\(\)\$]*)\?(?<true>((?:[^\:\?\{\}\(\)\$]|\\.)*))\:(?<false>((?:[^\:\?\{\}\(\)\$]|\\.)*))/gi;
        this.run = (match, from) => {
            return new Promise((R0, R_0) => {
                R0("__b__");
            });
        };
    }
}
//# sourceMappingURL=ifstatement.js.map