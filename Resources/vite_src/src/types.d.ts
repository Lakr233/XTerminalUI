declare global {
  interface Window {
    webkit?: Record<string, any>
    fit: () => void
    [key: string]: any
  }
}

declare module 'xterm' {
  export interface Terminal {
    decodeUTF8(str: string): string
    encodeUTF8(str: string): string
    writeUTF8(str: string): void
  }
}

export {}
