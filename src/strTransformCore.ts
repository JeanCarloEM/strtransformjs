
import { TSReplaceFilter, TSReplacerAllAsync, ISTRHookableTransform, ISHookTO, TSSource } from "./definitions";
import { strTransformHookable } from "./strTransformHookable.js";
import { functionHook } from "./hooks/functions.js";
import { variablesHook } from "./hooks/variables.js";
import { expressionsHook } from "./hooks/expressions.js";


/*
 *
 */
/*
String.prototype.tranform = function (
  src: TSSource,
  defkey: string,
  ukn: TSReplacerAllAsync,
  filterValue: TSReplaceFilter
): Promise<string> {
  return (new strTransformeCore(this + "", src, defkey, ukn, filterValue)).run();
}
*/

/*
 *
 */

export class strTransformeCore extends strTransformHookable {
  /**
   *
   * @param src         - an object containing the variables applicable
   *                      to the transformation
   * @param defReplace  - the pattern string (text) to be removed
   *                      if the processor and ukn() do not resolve
   * @param ukn         - function called to resolve when the processor
   *                      returns null (this is a dynamic default)
   * @param filter      - function that filters the transformed text
   *
   */
  constructor(
    private src: TSSource = {},
    defReplace: string = "",
    ukn: null | TSReplacerAllAsync = null,
    filter: null | TSReplaceFilter = null
  ) {
    super(
      [
        new variablesHook(),
        new functionHook(),
        new expressionsHook()
      ],
      defReplace,
      ukn,
      filter
    );
  }
}