var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { strEmbryonicTransform as strFetusTransform } from "./strEmbryonicTransform.js";
export class strTransformHookable extends strFetusTransform {
    constructor(_hooks, defReplace = "", ukn = null, filter = null) {
        super(null, defReplace, ukn, filter);
        this._hooks = _hooks;
        this.hook_index = 0;
        this.run = (str) => __awaiter(this, void 0, void 0, function* () {
            this.hook_index = -1;
            return this.eachHooks(str);
        });
        this.processMatch = (match, from) => {
            return new Promise((R0, R_0) => {
                return this.getHooks(this.hook_index)
                    .run(match, from)
                    .then((r) => R0(r));
            });
        };
        this.regex = this.getRegex;
    }
    hookLen() {
        return this.getHooks().length;
    }
    addHook(hook) {
        if ((typeof hook !== "object") ||
            (!hook.hasOwnProperty('hook')) ||
            (!(hook.hook instanceof RegExp)) ||
            (!hook.hasOwnProperty('caller')) ||
            (typeof hook.run !== 'function')) {
            return false;
        }
        this._hooks.push(hook);
        return true;
    }
    getHooks(key = false) {
        if (key === false) {
            return this._hooks;
        }
        if (this.hook_index >= this.hookLen()) {
            throw `${this.constructor.name}: hook_index (${this.hook_index}) is >= to hooLen in (${this.hookLen()}) in "getHooks"`;
        }
        return this._hooks[this.hook_index];
    }
    eachHooks(str) {
        const _super = Object.create(null, {
            run: { get: () => super.run }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((R0, R_0) => {
                return (() => __awaiter(this, void 0, void 0, function* () {
                    this.hook_index++;
                    if (this.hook_index >= this.hookLen()) {
                        let hasMatch = false;
                        for (let k of this.getHooks()) {
                            if (k.hook.test(str)) {
                                hasMatch = true;
                                break;
                            }
                        }
                        this.hook_index = (hasMatch) ? 0 : this.hook_index;
                    }
                    if (this.hook_index >= this.hookLen()) {
                        return R0(str);
                    }
                    let r = yield _super.run.call(this, str);
                    if (this.hook_index < (this.hookLen() - 1)) {
                        r = yield this.eachHooks(r);
                    }
                    R0(r);
                }))();
            });
        });
    }
    getRegex() {
        if (this.hookLen() == 0) {
            return null;
        }
        if (this.hook_index >= this.hookLen()) {
            throw `${this.constructor.name}: hook_index (${this.hook_index}) is >= to hooLen in (${this.hookLen()}) in "getRegex"`;
        }
        return this._hooks[this.hook_index].hook;
    }
}
//# sourceMappingURL=strTransformHookable.js.map