export class mainTranform {
    constructor() {
        this.hook = /((\$\{)((?:[^\{\}\$\\]|\\.)*)\}|(\{\{\{)((?:[^\{\}\$\\]|\\.)*)\}\}\}|(\{\{)((?:[^\{\}\$\\]|\\.)*)\}\})/gi;
        this.run = (match, from) => {
            return new Promise((R0, R_0) => {
                R0("a");
            });
        };
    }
}
//# sourceMappingURL=mainTranform.js.map