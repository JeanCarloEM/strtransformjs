import { ISHookTO } from "../definitions"
import { enclauruseHook } from "../enclauruseHook"
/**
 * https://github.com/Nixinova/Wikity/blob/main/src/parse.ts
 */
export class expressionsHook extends enclauruseHook implements ISHookTO {
  public regex: RegExp = /([^\:\!\#\{\}\]\[]+)/gi;
  public _indollar: boolean = true;
  public _incurly: boolean = true;
  public _incurly3: boolean = false;
  public _insquare: boolean = false;

  public run = (match: RegExpMatchArray, from: string): Promise<string> => {
    return new Promise<string>((R0, R_0) => {

      let exp = match[1]
        /* convert "and" and "or" notation */
        .replace(/\s(and)\s/gi, "&&")
        .replace(/\s(or)\s/gi, "&&")

        /* convert "div" and "mod" notation */
        .replace(/\s*(div)\s*/gi, "/")
        .replace(/\s(mod)\s/gi, "%")

        /* convert "^" to "**" notation */
        .replace(/\s*(\^)\s*/gi, "**");

      R0(exp);
    });
  }
}