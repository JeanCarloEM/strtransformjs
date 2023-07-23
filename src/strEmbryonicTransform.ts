import { PromiseExecutionMode, TSDinamicRegexGetter, TSReplacerAllAsync, TSPromiseMatch, TSReplaceFilter } from "./definitions";
import { strCommons } from "./strCommons";


/**
 *
 */
String.prototype.replaceAllAsync = async function (
  searchValue: RegExp,
  replacer: TSReplacerAllAsync
): Promise<string> {
  return strEmbryonicTransform.replaceAllAsync("" + this, searchValue, replacer);
}


/**
 *
 */
String.prototype.replaceAsync = async function (
  searchValue: string | RegExp,
  replacer: string | TSPromiseMatch
): Promise<string> {
  return strEmbryonicTransform.replaceAsync("" + this, searchValue, replacer);
}


/**
 *
 */
export abstract class strEmbryonicTransform extends strCommons {
  private limiteRunLoop_counter: number = 0;
  public readonly limiteRunLoop: number = 1000;

  /**
   *
   * @param regex       - the pattern to match or a function that
   *                      returns a pattern
   * @param defReplace  - the pattern string (text) to be removed
   *                      if the processor and ukn() do not resolve
   * @param ukn         - function called to resolve when the processor
   *                      returns null (this is a dynamic default)
   * @param filter      - function that filters the transformed text
   */
  constructor(
    protected regex: null | RegExp | TSDinamicRegexGetter = null,
    public readonly defReplace: string = "",
    protected readonly ukn: null | TSReplacerAllAsync = null,
    protected readonly filter: null | TSReplaceFilter = null
  ) {
    super();
  }

  /**
   * Main function
   *
   * @param str -the string(text) to be transformed
   *
   * @returns the text fully transformed
   *
   */
  public async run(str: string): Promise<string> {
    return this.recursiveTransform(str);
  }

  /**
   * Function responsible for returning the transformed value
   *
   * @param match - the array returned by .replaceAllAsync()
   * @param from  - optional, the original string to which the regex was applied
   *
   * @returns the text transformed by the specific text processor
   */
  protected abstract processMatch: TSReplacerAllAsync;

  /**
   * Used to create a loop with .processAndApplyFilter() to ensure that all transformations are performed
   *
   * @internal
   *
   * @param str -the string(text) to be transformed
   *
   * @returns the text transformed, rectified, and filtered, through several passes
   */
  private async recursiveTransform(str: string): Promise<string> {
    return new Promise<string>((R0, R_0) => {
      if (!this.regex) {
        throw `${this.constructor.name}: No reported expression in ${arguments.callee.name}`
      }

      const regex = (typeof this.regex === 'function')
        ? this.regex()
        : this.regex;

      if (!regex) {
        throw `${this.constructor.name}> Null expression returned in getter ${arguments.callee.name}`
      }

      if (!str.match(regex)) {
        return R0(str);
      }

      if (++this.limiteRunLoop_counter > this.limiteRunLoop) {
        return R_0('Over processing.');
      }

      strCommons.replaceAllAsync(
        str,
        regex,
        this.processAndApplyFilter,
        PromiseExecutionMode.All
      );
    });
  }

  /**
   *
   * Used to create a loop with .recursiveTransform() to check
   * [1] resolution (and return default values
   *     ​​defined in this.ukn() and this.defReplace)
   * [2] apply filter
   *
   * @internal
   *
   * @param match - the array returned by .replaceAllAsync()
   * @param from  - optional, the original string to which the regex was applied
   *
   * @returns the text transformed, checked, and filtered
   */
  private async processAndApplyFilter(match: RegExpMatchArray, from: string = ""): Promise<string> {
    return new Promise<string>((R1, R_1) => {
      this.processMatch(match, from)
        /* if null: unknow resolve */
        .then((r) => {
          if ((r === null) && (typeof this.ukn === "function")) {
            return this.ukn(match, "");
          }
          return r;
        })
        /* if null persists after ukn() */
        .then((r) => {
          const DEF = this.defReplace.trim();

          if ((r === null) && (DEF.length > 0)) {
            return DEF;
          }
          return r;
        })
        /* filter any result */
        .then((r) => {
          if (this.filter) {
            return this.filter(r, match);
          }
          return r;
        })
        /* recursive call replace */
        .then((r) => {
          this.recursiveTransform(r)
            .then((rr) => R1(rr));
        })
        .catch(r => R_1(r));
    });
  }
}