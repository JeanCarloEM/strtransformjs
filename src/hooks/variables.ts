import { ISHookTO } from "../definitions"
import { enclauruseHook } from "../enclauruseHook"

/**
 * https://github.com/Nixinova/Wikity/blob/main/src/parse.ts
 */
export class variablesHook extends enclauruseHook implements ISHookTO {
  public regex: RegExp = /(\{?\{\{\s*(?<t1>[\w]+)\s*\}\}\}?|\$\{\s*(?<t2>[\w]+)\s*\})/gi;
  public _indollar: boolean = true;
  public _incurly: boolean = true;
  public _incurly3: boolean = false;
  public _insquare: boolean = false;

  public run = (match: RegExpMatchArray, from: string): Promise<string> => {
    return new Promise<string>((R0, R_0) => {
      const s = 'TEMPLATE__a\\{b\\}\{c\}\\\\{d\\\\}__';
      console.warn(s);
      R0(s);
    });
  }
}