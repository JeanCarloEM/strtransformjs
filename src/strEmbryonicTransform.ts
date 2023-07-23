import { PromiseExecutionMode, TSDinamicRegexGetter, TSReplacerAllAsync, TSPromiseMatch, TSReplaceFilter } from "./definitions.js";
import { strCommons } from "./strCommons.js";


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
    return this.recursiveTransform(str).then((r) => {
      return r;
    });
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
      (async () => {
        if (!this.regex) {
          throw `${this.constructor.name}: No reported expression in "recursiveTransform"`
        }

        const regex = (typeof this.regex === 'function')
          ? this.regex()
          : this.regex;

        if (!regex) {
          throw `${this.constructor.name}: Null expression returned in getter "recursiveTransform"`
        }

        /* FINISH RECURSIVE HERE */
        if (!regex.test(str)) {
          return R0(str);
        }

        /* Continue Recursive */
        if (++this.limiteRunLoop_counter > this.limiteRunLoop) {
          throw `${this.constructor.name}: Over processing in "recursiveTransform"`
        }

        str = await strCommons.replaceAllAsync(
          str,
          regex,
          /* .replaceAll Async loses the "this" reference
           * of this class, so its method needs to be wrapped.
           */
          (match: RegExpMatchArray, from: string = ""): Promise<string> => {
            return this.processAndApplyFilter(match, from);
          },
          PromiseExecutionMode.All
        )

        /* recursive call */
        str = await this.recursiveTransform(str);

        R0(str);
      })();
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
        .then((r) => {
          return r
            .replace(/\\\$/g, '$')
            .replace(/\\\|/g, '|')
            .replace(/\\\?/g, '?')
            .replace(/\\\{/g, '{')
            .replace(/\\\}/g, '}')
            .replace(/\\\(/g, '(')
            .replace(/\\\)/g, ')')
            .replace(/\\\[/g, '[')
            .replace(/\\\]/g, ']')
            .replace(/\\\</g, '<')
            .replace(/\\\>/g, '>');
        })
        .then((r) => {
          console.log(r);
          return r;
        })
        .then((r) => R1(r))
        .catch(r => R_1(r));
    });
  }
}