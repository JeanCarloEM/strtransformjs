export class mainHook {
    constructor() {
        this.hook = /((\$\{)((?:[^\{\}\$\\]|\\.)*)\}|(\{\{\{)((?:[^\{\}\$\\]|\\.)*)\}\}\}|(\{\{)((?:[^\{\}\$\\]|\\.)*)\}\})/gi;
        this.run = (match, from) => {
            return new Promise((R0, R_0) => {
                const s = '__a\\{b\\}\{c\}\\\\{d\\\\}__';
                console.warn(s);
                R0(s);
            });
        };
    }
}
//# sourceMappingURL=main.js.map