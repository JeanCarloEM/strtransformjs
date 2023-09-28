import { ISHookTO } from "../definitions.js"
import { enclauruseHook } from "../enclauruseHook.js"

/**
 * https://github.com/Nixinova/Wikity/blob/main/src/parse.ts
 */
export class variablesHook extends enclauruseHook implements ISHookTO {
  public regex: RegExp = /([a-z][\w]+)/ig;
  public _indollar: boolean = true;
  public _incurly: boolean = true;
  public _incurly3: boolean = false;
  public _insquare: boolean = false;

  public run = (match: RegExpMatchArray, from: string): Promise<string> => {
    return new Promise<string>((R0, R_0) => {
      const s = ' variables__' + (match[2]?match[2]:match[3]);
      //console.warn(match);
      R0(s);
    });
  }
}