/// <reference types="vite/client" />

declare module "*.gltf" {
  const val: string;
  export default val;
}

declare module "*.glb" {
  const val: string;
  export default val;
}

declare module "*.hdr" {
  const val: string;
  export default val;
}

declare module "qr.js" {
  const func: (
    source: string,
    opts: { errorCorrectLevel: number }
  ) => { modules: boolean[][] };
  export default func;
}
