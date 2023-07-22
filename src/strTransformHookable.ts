
import { ISTRHookableTransform, TSReplaceFilter, TSHookTO, TSReplacerAllAsync, TSHook, TSSource } from "./definitions";
import { strFetusTransformer as strFetusTransform } from "./strFetusTransform";


/*
 *
 */

export abstract class strTransformHookable extends strFetusTransform implements ISTRHookableTransform {
  private static _hooks: TSHook[];
  private hook_index: number = 0;

  constructor(
    protected str: string,
    regex: RegExp,
    protected src?: TSSource,
    public readonly defkey?: string,
    private readonly ukn?: TSReplacerAllAsync,
    filter?: TSReplaceFilter
  ) {
    super(str,regex, filter);
  }

  public getSrc(): TSSource {
    return Object.assign({}, this.src);
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

  protected static getHooks(): readonly TSHook[] {
    return this._hooks;
  }

  protected eachHooks(fullOrDef: string): Promise<string> {
    const static_ = (this.constructor as typeof strTransformHookable);

    return new Promise<string>((R0, R_0) => {
      if (this.hook_index < static_.hookLen()) {
        return static_.getHooks()[this.hook_index++](fullOrDef, <ISTRHookableTransform>this)
          .then((r) => this.eachHooks(r).then((r2) => R0(r2)));
      }

      return R0(fullOrDef);
    });
  }

  protected processMatch(match: RegExpMatchArray): Promise<string> {
    this.hook_index = 0;

    return new Promise<string>((R0, R_0) => {
      ((defRes: (k: number) => string) => {
        if (!(this.constructor as typeof strTransformHookable).hookLen()) {
          R0(defRes(3));
        }

        this.eachHooks(defRes(3));
      })((k: number): string => {
        const r: boolean | string = (match.length > k)
          ? match[k]
          : (
            this.defkey
              ? this.defkey
              : (
                (match.length > 0)
                  ? match[0]
                  : false
              )
          );

        if (r === false) {
          return `strTransformHookable::processMatch: match with unknow default value and invalid match parameter.`;
        }

        return r;
      });
    });
  }
}





