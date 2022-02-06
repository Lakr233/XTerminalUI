import { Terminal } from 'xterm'
import { Solarized_Light, Tomorrow_Night } from 'xterm-theme/'

export function changeDarkTheme(term: Terminal, dark: boolean) {
  if (dark) {
    term.options.theme = { ...Tomorrow_Night, background: 'transparent' }
  } else {
    term.options.theme = { ...Solarized_Light, background: 'transparent' }
  }
}
