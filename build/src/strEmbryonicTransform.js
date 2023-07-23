var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { strCommons } from "./strCommons";
String.prototype.replaceAllAsync = function (searchValue, replacer) {
    return __awaiter(this, void 0, void 0, function* () {
        return strEmbryonicTransform.replaceAllAsync("" + this, searchValue, replacer);
    });
};
String.prototype.replaceAsync = function (searchValue, replacer) {
    return __awaiter(this, void 0, void 0, function* () {
        return strEmbryonicTransform.replaceAsync("" + this, searchValue, replacer);
    });
};
export class strEmbryonicTransform extends strCommons {
    constructor(regex = null, defReplace = "", ukn = null, filter = null) {
        super();
        this.regex = regex;
        this.defReplace = defReplace;
        this.ukn = ukn;
        this.filter = filter;
        this.limiteRunLoop_counter = 0;
        this.limiteRunLoop = 1000;
    }
    run(str) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recursiveTransform(str);
        });
    }
    recursiveTransform(str) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((R0, R_0) => {
                if (!this.regex) {
                    throw `${this.constructor.name}: No reported expression in ${arguments.callee.name}`;
                }
                const regex = (typeof this.regex === 'function')
                    ? this.regex()
                    : this.regex;
                if (!regex) {
                    throw `${this.constructor.name}> Null expression returned in getter ${arguments.callee.name}`;
                }
                if (!str.match(regex)) {
                    return R0(str);
                }
                if (++this.limiteRunLoop_counter > this.limiteRunLoop) {
                    return R_0('Over processing.');
                }
                str.replaceAllAsync(regex, this.processAndApplyFilter);
            });
        });
    }
    processAndApplyFilter(match, from = "") {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((R1, R_1) => {
                this.processMatch(match, from)
                    .then((r) => {
                    if ((r === null) && (typeof this.ukn === "function")) {
                        return this.ukn(match, "");
                    }
                    return r;
                })
                    .then((r) => {
                    const DEF = this.defReplace.trim();
                    if ((r === null) && (DEF.length > 0)) {
                        return DEF;
                    }
                    return r;
                })
                    .then((r) => {
                    if (this.filter) {
                        return this.filter(r, match);
                    }
                    return r;
                })
                    .then((r) => {
                    this.recursiveTransform(r)
                        .then((rr) => R1(rr));
                })
                    .catch(r => R_1(r));
            });
        });
    }
}
//# sourceMappingURL=strEmbryonicTransform.js.map