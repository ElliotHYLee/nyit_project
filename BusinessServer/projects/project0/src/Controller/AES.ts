const crypto = require("crypto")
const encryptionType = "aes-256-cbc"
const encryptionEncoding = "base64"
const bufferEncryption = "utf-8"
class AesEncryption {
  AesKey: string
  AesIV: string
  constructor() {
    this.AesKey = "my 32 length key................"
    this.AesIV = "0123456789abcdef"
  }

  encrypt(plainText: string): string {
    const key = Buffer.from(this.AesKey, bufferEncryption)
    const iv = Buffer.from(this.AesIV, bufferEncryption)
    const cipher = crypto.createCipheriv(encryptionType, key, iv)
    let encrypted = cipher.update(plainText, bufferEncryption, encryptionEncoding)
    encrypted += cipher.final(encryptionEncoding)
    return encrypted
  }

  decrypt(base64String: string): any {
    const buff = Buffer.from(base64String, encryptionEncoding)
    const key = Buffer.from(this.AesKey, bufferEncryption)
    const iv = Buffer.from(this.AesIV, bufferEncryption)
    const decipher = crypto.createDecipheriv(encryptionType, key, iv)
    const deciphered = decipher.update(buff) + decipher.final()
    console.log(deciphered)

    return deciphered
  }
}

export default new AesEncryption()
