import { ISHookTO } from "../definitions.js"
import { enclauruseHook } from "../enclauruseHook.js"
/**
 * https://github.com/EricSmekens/jsep
 * https://github.com/Nixinova/Wikity/blob/main/src/parse.ts
 */
export class expressionsHook extends enclauruseHook implements ISHookTO {
  public regex: RegExp = /([^\:\!\#\{\}\]\[\s]+[^\:\!\#\{\}\]\[]*)/gi;
  public _indollar: boolean = true;
  public _incurly: boolean = true;
  public _incurly3: boolean = false;
  public _insquare: boolean = false;

  public run = (match: RegExpMatchArray, from: string): Promise<string> => {
    return new Promise<string>((R0, R_0) => {

      let exp = match[3]
        /* convert "and" and "or" notation */
        .replace(/\s(and)\s/gi, "&&")
        .replace(/\s(or)\s/gi, "&&")

        /* convert "div" and "mod" notation */
        .replace(/\s*(div)\s*/gi, "/")
        .replace(/\s(mod)\s/gi, "%")

        /* convert "^" to "**" notation */
        .replace(/\s*(\^)\s*/gi, "**");

      console.warn(match);

      R0(exp);
    });
  }
}