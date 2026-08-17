/// <reference types="vite/client" />

declare module '*.yaml' {
  const content: any;
  export default content;
}

interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
