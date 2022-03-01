declare global {
  interface Window {
    webkit?: Record<string, any>
    fit: () => void
    [key: string]: any
  }
}

declare module 'xterm' {
  export interface Terminal {
    writeBase64(str: string): void
  }
}

export {}
