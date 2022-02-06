export class UTF8Decoder {
  private bytesLeft: number
  private codePoint: number
  private lowerBound: number
  constructor() {
    this.bytesLeft = 0
    this.codePoint = 0
    this.lowerBound = 0

    this.decode = this.decode.bind(this)
  }
  decode(str: string) {
    var ret = ''
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i)
      if (this.bytesLeft == 0) {
        if (c <= 0x7f) {
          ret += str.charAt(i)
        } else if (0xc0 <= c && c <= 0xdf) {
          this.codePoint = c - 0xc0
          this.bytesLeft = 1
          this.lowerBound = 0x80
        } else if (0xe0 <= c && c <= 0xef) {
          this.codePoint = c - 0xe0
          this.bytesLeft = 2
          this.lowerBound = 0x800
        } else if (0xf0 <= c && c <= 0xf7) {
          this.codePoint = c - 0xf0
          this.bytesLeft = 3
          this.lowerBound = 0x10000
        } else if (0xf8 <= c && c <= 0xfb) {
          this.codePoint = c - 0xf8
          this.bytesLeft = 4
          this.lowerBound = 0x200000
        } else if (0xfc <= c && c <= 0xfd) {
          this.codePoint = c - 0xfc
          this.bytesLeft = 5
          this.lowerBound = 0x4000000
        } else {
          ret += '\ufffd'
        }
      } else {
        if (0x80 <= c && c <= 0xbf) {
          this.bytesLeft--
          this.codePoint = (this.codePoint << 6) + (c - 0x80)
          if (this.bytesLeft == 0) {
            var codePoint = this.codePoint
            if (
              codePoint < this.lowerBound ||
              (0xd800 <= codePoint && codePoint <= 0xdfff) ||
              codePoint > 0x10ffff
            ) {
              ret += '\ufffd'
            } else {
              if (codePoint < 0x10000) {
                ret += String.fromCharCode(codePoint)
              } else {
                codePoint -= 0x10000
                ret += String.fromCharCode(
                  0xd800 + ((codePoint >>> 10) & 0x3ff),
                  0xdc00 + (codePoint & 0x3ff),
                )
              }
            }
          }
        } else {
          ret += '\ufffd'
          this.bytesLeft = 0
          i--
        }
      }
    }
    return ret
  }
}
