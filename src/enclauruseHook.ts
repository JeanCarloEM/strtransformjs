import { TSReplacerAllAsync, ISHookTO } from "./definitions"
import { strCommons } from "./strCommons"


/**
 * https://github.com/Nixinova/Wikity/blob/main/src/parse.ts
 * https://www.mediawiki.org/wiki/Help:Magic_words/pt-br#Fun%C3%A7%C3%B5es_do_analisador_sint%C3%A1tico
 *
 * scaping (\s*(?:[\w]|\\.)
 */
export abstract class enclauruseHook implements ISHookTO {
  abstract run: TSReplacerAllAsync;
  abstract regex: RegExp;
  abstract _indollar: boolean;
  abstract _incurly: boolean;
  abstract _incurly3: boolean;
  abstract _insquare: boolean;

  /**
   *  padrão: {{#funcName:arg0|arg1...|argN}}
   */
  private hr: null | RegExp = null;

  public hook = (): RegExp => {
    if (!this.hr) {
      this.hr = (strCommons.makeRegexIn(
        this.regex,
        true, false, false, false))
    };

    return this.hr as RegExp;
  };
}