import { strFetusTransformer as strFetusTransform } from "./strFetusTransform";
String.prototype.tranform = function (regex, src, defkey, ukn, filterValue) {
    return (new strTransformHookable(this + "", src, defkey, ukn, filterValue)).run();
};
class strTransformHookable extends strFetusTransform {
    constructor(str, src, defkey, ukn, filter) {
        super(str, /((\$\{)((?:[^\{\}\$\\]|\\.)*)\}|(\{\{\{)((?:[^\{\}\$\\]|\\.)*)\}\}\}|(\{\{)((?:[^\{\}\$\\]|\\.)*)\}\})/gi, filter);
        this.str = str;
        this.src = src;
        this.defkey = defkey;
        this.ukn = ukn;
    }
    static hookLen() {
        return this._hooks.length;
    }
    static addHook(hook) {
        if ((typeof hook !== "object") ||
            (!hook.hasOwnProperty('hook')) ||
            (!(hook.hook instanceof RegExp)) ||
            (!hook.hasOwnProperty('caller')) ||
            (typeof hook.caller !== 'function')) {
            return false;
        }
        this._hooks.push(hook.caller);
        return true;
    }
    static getHooks() {
        return this._hooks;
    }
    processMatch(match) {
        return new Promise((R0, R_0) => {
        });
    }
}
//# sourceMappingURL=strTransformHookable.js.map