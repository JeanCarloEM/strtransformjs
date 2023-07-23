import { TSDinamicRegexGetter, TSReplacerAllAsync, TSPromiseMatch, TSReplaceFilter } from "./definitions";
import { strCommons } from "./strCommons";

/*
 *
 */
String.prototype.replaceAllAsync = async function (
  searchValue: RegExp,
  replacer: TSReplacerAllAsync
): Promise<string> {
  return strEmbryonicTransform.replaceAllAsync("" + this, searchValue, replacer);
}


/*
 *
 */
String.prototype.replaceAsync = async function (
  searchValue: string | RegExp,
  replacer: string | TSPromiseMatch
): Promise<string> {
  return strEmbryonicTransform.replaceAsync("" + this, searchValue, replacer);
}

/*
 *
 */
export abstract class strEmbryonicTransform extends strCommons {
  private limiteRunLoop_counter: number = 0;
  public readonly limiteRunLoop: number = 1000;

  constructor(
    protected regex: null | RegExp | TSDinamicRegexGetter = null,
    public readonly defReplace: string = "",
    protected readonly ukn: null | TSReplacerAllAsync = null,
    protected readonly filter: null | TSReplaceFilter = null
  ) {
    super();
  }

  public async run(str: string): Promise<string> {
    return this.recursiveTransform(str);
  }

  protected abstract processMatch: TSReplacerAllAsync;

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

      str.replaceAllAsync(
        regex,
        this.processAndApplyFilter
      );
    });
  }

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