
import { TSHookTO, TSReplacerAllAsync, TSReplacer, TSSource } from "./definitions";
import { strFetusTransformer as strFetusTransform } from "./strFetusTransform";


/*
 *
 */
String.prototype.tranform = function (
  regex: RegExp,
  src: TSSource,
  defkey: string,
  ukn: TSReplacerAllAsync,
  filterValue: TSReplacer
): Promise<string> {
  return (new strTransformHookable(this + "", src, defkey, ukn, filterValue)).run();
}


/*
 *
 */

class strTransformHookable extends strFetusTransform {
  private static _hooks: TSReplacer[];

  constructor(
    protected str: string,
    protected src?: TSSource,
    private readonly defkey?: string,
    private readonly ukn?: TSReplacerAllAsync,
    filter?: TSReplacer
  ) {
    super(str, /((\$\{)((?:[^\{\}\$\\]|\\.)*)\}|(\{\{\{)((?:[^\{\}\$\\]|\\.)*)\}\}\}|(\{\{)((?:[^\{\}\$\\]|\\.)*)\}\})/gi, filter);
  }

  public static hookLen(): number {
    return this._hooks.length;
  }

  public static addHook(hook: TSHookTO): boolean {
    /*
     * runtime check type
     *
     * typescript doesn't provide any way to validate
     * types at runtime, so we use pure javascript
     *
     * REASON: the function is publicly available for
     * any javascript to execute it
     */
    if (
      (typeof hook !== "object") ||

      (!hook.hasOwnProperty('hook')) ||
      (!(hook.hook instanceof RegExp)) ||

      (!hook.hasOwnProperty('caller')) ||
      (typeof hook.caller !== 'function')
    ) {
      return false;
    }

    this._hooks.push(hook.caller);
    return true;
  }

  protected static getHooks(): readonly TSReplacer[] {
    return this._hooks;
  }

  protected processMatch(match: RegExpMatchArray): Promise<string> {
    return new Promise<string>((R0, R_0) => {
      /*
      if (!this.hookLen()) {
        return (match.length > 3)
          ? R0(match[3])
          : (
            this.defkey
              ? R0(this.defkey)
              : (
                (match.length > 0)
                  ? R0(match[0])
                  : R_0("strTransformHookable::processMatch: match with unknow default value.")
              )
          );
      }*/
    });
  }
}