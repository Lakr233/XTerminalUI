import { Terminal } from 'xterm'
import { MaterialDark, Material } from 'xterm-theme/'

export function changeDarkTheme(term: Terminal, dark: boolean) {
  if (dark) {
    term.options.theme = { ...MaterialDark, background: 'transparent' }
  } else {
    term.options.theme = { ...Material, background: 'transparent' }
  }
}
