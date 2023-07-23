import { strTransformHookable } from "./strTransformHookable.js";
import { mainHook } from "./hooks/main.js";
import { ifstatementHook } from "./hooks/ifstatement.js";
import { paranthesesHook } from "./hooks/parantheses.js";
export class strTransformeCore extends strTransformHookable {
    constructor(src = {}, defReplace = "", ukn = null, filter = null) {
        super([
            new mainHook(),
            new ifstatementHook(),
            new paranthesesHook()
        ], defReplace, ukn, filter);
        this.src = src;
    }
}
//# sourceMappingURL=strTransformCore.js.map