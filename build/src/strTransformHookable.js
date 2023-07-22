import { strFetusTransformer as strFetusTransform } from "./strFetusTransform";
export class strTransformHookable extends strFetusTransform {
    constructor(str, regex, src, defkey, ukn, filter) {
        super(str, regex, filter);
        this.str = str;
        this.src = src;
        this.defkey = defkey;
        this.ukn = ukn;
        this.hook_index = 0;
    }
    getSrc() {
        return Object.assign({}, this.src);
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
    eachHooks(fullOrDef) {
        const static_ = this.constructor;
        return new Promise((R0, R_0) => {
            if (this.hook_index < static_.hookLen()) {
                return static_.getHooks()[this.hook_index++](fullOrDef, this)
                    .then((r) => this.eachHooks(r).then((r2) => R0(r2)));
            }
            return R0(fullOrDef);
        });
    }
    processMatch(match) {
        this.hook_index = 0;
        return new Promise((R0, R_0) => {
            ((defRes) => {
                if (!this.constructor.hookLen()) {
                    R0(defRes(3));
                }
                this.eachHooks(defRes(3));
            })((k) => {
                const r = (match.length > k)
                    ? match[k]
                    : (this.defkey
                        ? this.defkey
                        : ((match.length > 0)
                            ? match[0]
                            : false));
                if (r === false) {
                    return `strTransformHookable::processMatch: match with unknow default value and invalid match parameter.`;
                }
                return r;
            });
        });
    }
}
//# sourceMappingURL=strTransformHookable.js.map