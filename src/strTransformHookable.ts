
import { TSReplaceFilter, ISHookTO, TSReplacerAllAsync, ISTRHookableTransform } from "./definitions";
import { strEmbryonicTransform as strFetusTransform } from "./strEmbryonicTransform";


/*
 *
 */

export class strTransformHookable extends strFetusTransform implements ISTRHookableTransform {
  private hook_index: number = 0;

  /*
   *
   */
  constructor(
    private _hooks: ISHookTO[],
    defReplace: string = "",
    ukn: null | TSReplacerAllAsync = null,
    filter: null | TSReplaceFilter = null
  ) {
    super(null, defReplace, ukn, filter);
    this.regex = this.getRegex;
  }

  /*
   *
   */
  public hookLen = (): number => {
    return (<ISHookTO[]>this.getHooks()).length;
  }

  /*
   *
   */
  public addHook = (hook: ISHookTO): boolean => {
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
      (typeof hook.run !== 'function')
    ) {
      return false;
    }

    this._hooks.push(hook);
    return true;
  }

  /*
   *
   */
  public run = async (str: string): Promise<string> => {
    this.hook_index = -1;
    return this.eachHooks(str);
  }

  /*
   *
   */
  public getHooks = (key: number | boolean = false): ISHookTO | readonly ISHookTO[] => {
    if (key === false) {
      return this._hooks;
    }

    if (this.hook_index >= this.hookLen()) {
      throw `${this.constructor.name}: hook_index is greater than hooLen in "getHooks"`;
    }

    return this._hooks[this.hook_index];
  }

  /*
   *
   */
  protected async eachHooks(str: string): Promise<string> {
    return new Promise<string>((R0, R_0) => {
      return (async () => {
        this.hook_index++;

        let r = await super.run(str);

        /* restart the index while there is some matching hook */

        if (this.hook_index >= this.hookLen()) {
          let hasMatch: boolean = false;

          for (let k of (<ISHookTO[]>this.getHooks())) {
            if (k.hook.test(r)) {
              hasMatch = true;
              break;
            }
          }

          this.hook_index = (hasMatch) ? 0 : this.hook_index;
        }

        if (this.hook_index < this.hookLen()) {
          return await this.eachHooks(r);
        }

        R0(r);
      })();
    });
  }

  /*
   *
   */
  private getRegex(): RegExp | null {
    if (this.hookLen() == 0) {
      return null;
    }

    if (this.hook_index >= this.hookLen()) {
      throw `${this.constructor.name}: hook_index is greater than hooLen in ${arguments.callee.name}`;
    }

    return this._hooks[this.hook_index].hook;
  }

  /*
   * OVERWRITED function
   */
  protected processMatch = (match: RegExpMatchArray, from: string): Promise<string> => {
    return new Promise<string>((R0, R_0) => {
      return (<ISHookTO>this.getHooks(this.hook_index))
        .run(match, from)
        .then((r) => R0(r));
    });
  }
}





