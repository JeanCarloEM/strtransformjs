import { ISHookTO } from "../definitions.js"
import { enclauruseHook } from "../enclauruseHook.js"


/**
 * https://github.com/Nixinova/Wikity/blob/main/src/parse.ts
 * https://www.mediawiki.org/wiki/Help:Magic_words/pt-br#Fun%C3%A7%C3%B5es_do_analisador_sint%C3%A1tico
 *
 * scaping (\s*(?:[\w]|\\.)
 */
export class functionHook extends enclauruseHook implements ISHookTO {
  public regex: RegExp = /#?([\w]+)\s*\:((\s*[^\s\|\{\}\[\]\$\\]+(\s+[^\s\|\{\}\[\]\$\\]+)*)(\s*\|\s*[^\s\|\{\}\[\]\$\\]+(\s+[^\s\|\{\}\[\]\$\\]+)*)*)/gi;
  public _indollar: boolean = true;
  public _incurly: boolean = true;
  public _incurly3: boolean = false;
  public _insquare: boolean = false;

  public run = (match: RegExpMatchArray, from: string): Promise<string> => {
    return new Promise<string>((R0, R_0) => {
      const s = 'functions__a\\{b\\}\{c\}\\\\{d\\\\}__';
      console.warn(s);
      R0(s);
    });
  }
}