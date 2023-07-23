export class mainHook {
    constructor() {
        this.hook = /((\$\{)((?:[^\{\}\$\\]|\\.)*)\}|(\{\{\{)((?:[^\{\}\$\\]|\\.)*)\}\}\}|(\{\{)((?:[^\{\}\$\\]|\\.)*)\}\})/gi;
        this.run = (match, from) => {
            return new Promise((R0, R_0) => {
                R0('__a__');
            });
        };
    }
}
//# sourceMappingURL=main.js.map