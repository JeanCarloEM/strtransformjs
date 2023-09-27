var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { PromiseExecutionMode } from "./definitions.js";
export class strCommons {
}
_a = strCommons;
strCommons.makeRegexIn = (input, dollar, curly, curly3, square) => {
    let x = input.source.replace(/^\//, '').replace(/\/\w*$/, '');
    let r = dollar ? `\${\\s*${x}\\s*}` : "";
    r += (r.length ? "|" : "") + (square ? `\[\[\\s*${x}\\s*\]\]` : "");
    r += (r.length ? "|" : "") + (curly ? `\{\{\\s*${x}\\s*\}\}` : "");
    r += (r.length ? "|" : "") + (curly3 ? `\{\{\{\\s*${x}\\s*\}\}\}` : "");
    return new RegExp(`\(${x}\)`);
};
strCommons.replaceAsync = (input, regex, replacer) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = [];
    input.replace(regex, function (match, ...args) {
        promises.push((typeof replacer === 'function') ? replacer(match, ...args) : replacer);
    });
    const data = yield Promise.all(promises);
    return input.replace(regex, r => data.shift());
});
strCommons.replaceAllAsync = (str, pattern, replacer, mode = PromiseExecutionMode.All) => __awaiter(void 0, void 0, void 0, function* () {
    const addGlobal = !pattern.flags.includes("g");
    let flags = pattern.flags;
    if (addGlobal)
        flags += "g";
    let regex = new RegExp(pattern.source, flags);
    const matches = [...str.matchAll(regex)];
    if (matches.length == 0)
        return str;
    let replacements = [];
    if (mode == PromiseExecutionMode.All) {
        replacements = yield Promise.all(matches.map(match => replacer(match, str)));
    }
    else if (mode == PromiseExecutionMode.ForEach) {
        replacements = new Array();
        for (let m of matches) {
            let r = yield replacer(m, str);
            replacements.push(r);
        }
    }
    let src = pattern.source.replace(/(?<!\\)\((?!\?:)(\?\<[\w]+\>)?/g, "(?:");
    let splitter = new RegExp(src, flags);
    const parts = str.split(splitter);
    let result = parts[0];
    for (let i = 0; i < replacements.length; i++) {
        result += replacements[i] + parts[i + 1];
    }
    return result;
});
//# sourceMappingURL=strCommons.js.map