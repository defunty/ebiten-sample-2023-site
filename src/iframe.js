// import hoge from './test.js'
import game from './yourgame.wasm'
console.log(game);

// Polyfill
if (!WebAssembly.instantiateStreaming) {
  WebAssembly.instantiateStreaming = async (resp, importObject) => {
      const source = await (await resp).arrayBuffer();
      return await WebAssembly.instantiate(source, importObject);
  };
}

const go = new Go();

// 本番用。parcelのlocalサーバーだとMIME/typeのエラーが出る
// WebAssembly.instantiateStreaming(fetch("yourgame.wasm"), go.importObject).then(result => {
//     go.run(result.instance);
// });

WebAssembly.instantiateStreaming(fetch(game), go.importObject).then(result => {
    go.run(result.instance);
});
