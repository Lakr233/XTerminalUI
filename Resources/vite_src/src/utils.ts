export function base64ToUint8Array(s) {
  return new Uint8Array(atob(s).split('').map(charCodeAt))
}

function charCodeAt(c) {
  return c.charCodeAt(0)
}
