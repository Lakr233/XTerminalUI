import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import { changeDarkTheme } from './chanage-theme'
import { UTF8Decoder } from './utf8-decoder'

function initialTerminal() {
  const $container = document.getElementById('terminal')
  const term = new Terminal({
    allowTransparency: true,
    theme: {
      background: 'transparent',
    },
    rendererType: 'dom',
  })
  const fitAddon = new FitAddon()
  term.loadAddon(fitAddon)
  term.open($container)
  fitAddon.fit()

  new ResizeObserver(() => {
    fitAddon.fit()
  }).observe($container)

  term.focus()
  term.onTitleChange((title) => {
    const message = { magic: 'title', msg: title }

    window.webkit?.messageHandlers.callbackHandler.postMessage(message)
  })
  term.onData((data) => {
    const message = { magic: 'data', msg: data }
    console.log(data)

    window.webkit?.messageHandlers.callbackHandler.postMessage(message)
  })

  // hack

  const w = term.write
  term.write = function () {
    const [data, cb] = Array.prototype.slice.call(arguments)
    console.log('data: ', term.decodeUTF8(data))

    w.call(this, term.decodeUTF8(data), cb)
  }

  return term
}

Terminal.prototype.writeUTF8 = function (this: Terminal, str: string) {
  this.write(str)
}

Terminal.prototype.decodeUTF8 = (text: string) => {
  return new UTF8Decoder().decode(text)
}

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
