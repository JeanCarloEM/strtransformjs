
import { TSReplaceFilter, ISHookTO, TSReplacerAllAsync, ISTRHookableTransform } from "./definitions";
import { strEmbryonicTransform as strFetusTransform } from "./strEmbryonicTransform";


/*
 *
 */

export class strTransformHookable extends strFetusTransform implements ISTRHookableTransform {
  private hook_index: number = 0;

  /**
   *
   * @param _hook       - a list of default hooks to transform text
   * @param defReplace  - the pattern string (text) to be removed
   *                      if the processor and ukn() do not resolve
   * @param ukn         - function called to resolve when the processor
   *                      returns null (this is a dynamic default)
   * @param filter      - function that filters the transformed text
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

  /**
   *
   * Get length of ISHookTO[]
   *
   * @returns the length of ISHookTO[]
   */
  public hookLen(): number {
    return (<ISHookTO[]>this.getHooks()).length;
  }

  /**
   * Add hook to transforme string(text)
   *
   * @param hook - the hook object to add
   *
   * @returns true if added and false otherwise
   */
  public addHook(hook: ISHookTO): boolean {
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

  /**
   * Main function
   *
   * @override
   *
   * @param str - the string(text) to be transformed
   * @returns the text fully transformed
   *
   */
  public run = async (str: string): Promise<string> => {
    this.hook_index = -1;
    return this.eachHooks(str);
  }

  /**
   *
   * Gets the registered hook(s).
   *
   * @param key - optional, specifies the hook index to be returned
   *
   * @returns If key is informed and it exists, it will
   *          return the gain, otherwise it will return
   *          the array of hooks
   */
  public getHooks(key: number | boolean = false): ISHookTO | readonly ISHookTO[] {
    if (key === false) {
      return this._hooks;
    }

    if (this.hook_index >= this.hookLen()) {
      throw `${this.constructor.name}: hook_index is greater than hooLen in "getHooks"`;
    }

    return this._hooks[this.hook_index];
  }

  /**
   * Loop recursively array of hooks and apply each to str
   *
   * @param str -the string(text) to be transformed
   * @returns the text fully transformed
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

  /**
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

  /**
   *
   * Function responsible for returning the transformed value
   *
   * @override
   * @internal
   *
   * @param match - the array returned by .replaceAllAsync()
   * @param from  - optional, the original string to which the regex was applied
   *
   * @returns the text transformed by the specific text processor
   *
   */
  protected processMatch = (match: RegExpMatchArray, from: string): Promise<string> => {
    return new Promise<string>((R0, R_0) => {
      return (<ISHookTO>this.getHooks(this.hook_index))
        .run(match, from)
        .then((r) => R0(r));
    });
  }
}





