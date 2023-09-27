import * as core from "../../src/strTransformCore.js";
console.log('Iniciando testes...');
(new core.strTransformeCore()
    .run(document.querySelector("#parser").innerHTML)
    .then((r) => {
    console.log(r);
    document.querySelector("#parser").innerHTML = r;
})
    .catch((r) => console.error(r)));
//# sourceMappingURL=t.js.map