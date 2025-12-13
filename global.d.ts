// Global type declarations for static assets
// This allows importing MP4 files like: import video from './file.mp4'
declare module '*.mp4' {
  const src: string;
  export default src;
}

// Environment variables type declarations
interface ImportMetaEnv {
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}
