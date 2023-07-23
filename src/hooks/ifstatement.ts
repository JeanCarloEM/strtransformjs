import { ISTRHookableTransform, ISHookTO } from "../definitions"

export class ifstatement implements ISHookTO {
  public hook: RegExp = /(?<if>[^\:\?\{\}\(\)\$]*)\?(?<true>((?:[^\:\?\{\}\(\)\$]|\\.)*))\:(?<false>((?:[^\:\?\{\}\(\)\$]|\\.)*))/gi;

  public run = (match: RegExpMatchArray, from: string): Promise<string> => {
    return new Promise<string>((R0, R_0) => {
      R0("a");
    });
  }
}