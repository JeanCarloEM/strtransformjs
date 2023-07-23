import { strEmbryonicTransform, TSReplacerAllAsync, PromiseExecutionMode, TSPromiseMatch } from "./definitions.js";

export abstract class strCommons {
  public static replaceAsync = async (
    input: string, regex: string | RegExp,
    replacer: string | TSPromiseMatch
  ): Promise<string> => {
    const promises: (string | Promise<string>)[] = [];
    input.replace(regex, function (match: string, ...args: any[]): any {
      promises.push((typeof replacer === 'function') ? replacer(match, ...args) : replacer);
    });
    const data = await Promise.all(promises);
    return input.replace(regex, r => <string>data.shift());
  }

  /*
   * https://keestalkstech.com/2023/04/building-a-replace-all-async-in-typescript/
   */
  public static replaceAllAsync = async (
    str: string,
    pattern: RegExp,
    replacer: TSReplacerAllAsync,
    mode: PromiseExecutionMode = PromiseExecutionMode.All
  ): Promise<string> => {
    // replace all implies global, so append if it is missing
    const addGlobal = !pattern.flags.includes("g")
    let flags = pattern.flags
    if (addGlobal) flags += "g"

    // get matches
    let regex = new RegExp(pattern.source, flags)
    const matches = [...str.matchAll(regex)];

    if (matches.length == 0) return str

    // construct all replacements
    let replacements: string[] = [];

    if (mode == PromiseExecutionMode.All) {
      replacements = await Promise.all(matches.map(match => replacer(match, str)))
    } else if (mode == PromiseExecutionMode.ForEach) {
      replacements = new Array<string>()
      for (let m of matches) {
        let r = await replacer(m, str)
        replacements.push(r)
      }
    }

    // change capturing groups into non-capturing groups for split
    // (because capturing groups are added to the parts array
    let src = pattern.source.replace(/(?<!\\)\((?!\?:)/g, "(?:")
    let splitter = new RegExp(src, flags)

    const parts = str.split(splitter)

    // stitch everything back together
    let result = parts[0]
    for (let i = 0; i < replacements.length; i++) {
      result += replacements[i] + parts[i + 1]
    }

    return result;
  }
}