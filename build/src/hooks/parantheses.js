export class paranthesesHook {
    constructor() {
        this.hook = /\(((?:[^\{\}\(\)\$\\]|\\.)*)\)/gi;
        this.run = (match, from) => {
            return new Promise((R0, R_0) => {
                R0("__c__");
            });
        };
    }
}
//# sourceMappingURL=parantheses.js.map