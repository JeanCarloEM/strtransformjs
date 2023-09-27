import { strTransformHookable } from "./strTransformHookable.js";
import { functionHook } from "./hooks/functions.js";
import { variablesHook } from "./hooks/variables.js";
import { expressionsHook } from "./hooks/expressions.js";
export class strTransformeCore extends strTransformHookable {
    constructor(src = {}, defReplace = "", ukn = null, filter = null) {
        super([
            new variablesHook(),
            new functionHook(),
            new expressionsHook()
        ], defReplace, ukn, filter);
        this.src = src;
    }
}
//# sourceMappingURL=strTransformCore.js.map