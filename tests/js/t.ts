import * as core from "../../src/strTransformCore.js";

console.log('Iniciando testes...');

(new core.strTransformeCore()
  .run((<HTMLElement>document.querySelector("#parser")).innerHTML)
  .then((r) => {
    console.log(r);
    (<HTMLElement>document.querySelector("#parser")).innerHTML = r;
  })
  .catch((r) => console.error(r)));