import { TSReplacerAllAsync, ISHookTO } from "./definitions.js"
import { strCommons } from "./strCommons.js"


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

  /**
   * Encloses a regex in multiple formats, such as ${} {{}} or [[]]
   * sample: input /[\w]+/i return /(\$\{[\w]+\}|\{\{[\w]+\}\})/ with dollar and curly
   *
   * @returns Regexp
   */
  public hook = (): RegExp => {
    if (!this.hr) {
      this.hr = (strCommons.makeRegexIn(
        this.regex,
        this._indollar, this._incurly, this._incurly3, this._insquare))
    };

    return this.hr as RegExp;
  };
}