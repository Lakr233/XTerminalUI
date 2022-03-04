import { debounce } from 'lodash-es'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { base64ToUint8Array } from './utils'
export function initialTerminal() {
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

  new ResizeObserver(
    debounce(() => {
      fitAddon.fit()
      console.log('resize')
    }, 100),
  ).observe($container)

  term.focus()
  term.onTitleChange((title) => {
    const message = { magic: 'title', msg: title }

    window.webkit?.messageHandlers.callbackHandler.postMessage(message)
  })
  term.onData((data) => {
    const message = { magic: 'data', msg: data }

    window.webkit?.messageHandlers.callbackHandler.postMessage(message)
  })

  return term
}

Terminal.prototype.writeBase64 = function (this: Terminal, base64: string) {
  this.write(base64ToUint8Array(base64))
}
