import { changeDarkTheme } from './chanage-theme'
import { initialTerminal } from './terminal'

import 'xterm/css/xterm.css'

function main() {
  const term = initialTerminal()
  window.fit = () => {}
  window.term = term
  window.terminal = term

  window.send = (text: string) => {
    const message = { magic: 'command', msg: text }

    window.webkit?.messageHandlers.callbackHandler.postMessage(message)
  }

  // set dark theme at startup
  changeDarkTheme(
    term,
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (ev) => {
      if (ev.matches) {
        changeDarkTheme(term, true)
      } else {
        changeDarkTheme(term, false)
      }
    })

  setTimeout(function () {
    const message = { magic: 'bell', msg: 'null' }

    window.webkit?.messageHandlers.callbackHandler.postMessage(message)
  }, 1000)
}

main()
