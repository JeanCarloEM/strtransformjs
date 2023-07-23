import { ISTRHookableTransform, ISHookTO } from "../definitions"

export class main implements ISHookTO {
  public hook: RegExp = /\(((?:[^\{\}\(\)\$\\]|\\.)*)\)/gi;

  public run = (match: RegExpMatchArray, from: string): Promise<string> => {
    return new Promise<string>((R0, R_0) => {
      R0("a");
    });
  }
}