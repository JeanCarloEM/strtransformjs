import { ISHookTO } from "../definitions.js"
import { enclauruseHook } from "../enclauruseHook.js"

export class ifstatementHook extends enclauruseHook implements ISHookTO {
  public regex: RegExp = /(?<if>[^\:\?\{\}\(\)\$]*)\?(?<true>((?:[^\:\?\{\}\(\)\$]|\\.)*))\:(?<false>((?:[^\:\?\{\}\(\)\$]|\\.)*))/gi;
  public _indollar: boolean = true;
  public _incurly: boolean = true;
  public _incurly3: boolean = false;
  public _insquare: boolean = false;

  public run = (match: RegExpMatchArray, from: string): Promise<string> => {
    return new Promise<string>((R0, R_0) => {
      R0("__b__");
    });
  }
}