import {
  createPrivateKey,
  createPublicKey,
  KeyObject,
  privateDecrypt,
  publicEncrypt,
} from 'crypto'
import { readFileSync } from 'fs'
import { join } from 'path'

export class StringEncryptor {
  private static instance: StringEncryptor
  private privateKey: KeyObject
  private publicKey: KeyObject
  private regex = /^ENC\((.*)\)$/g

  private constructor() {
    const path = (_: unknown, pathStr: string) =>
      process.env['NODE_ENV'] ? `../../../${pathStr}` : `../../${pathStr}`

    const privateKeyString = readFileSync(
      join(__dirname, path`${'keys/private.pem'}`)
    ).toString()

    const publicKeyString = readFileSync(
      join(__dirname, path`${'keys/public.pem'}`)
    ).toString()

    const passphrase = readFileSync(
      join(__dirname, path`${'keys/passphrase.txt'}`)
    ).toString()

    this.privateKey = createPrivateKey({
      key: privateKeyString,
      format: 'pem',
      passphrase: passphrase,
    })

    this.publicKey = createPublicKey(publicKeyString)
  }

  public static getInstance() {
    return this.instance || (this.instance = new this())
  }

  encrypt(message: string): string {
    return publicEncrypt(this.publicKey, Buffer.from(message)).toString(
      'base64'
    )
  }

  decrypt(encryptedMessage: string): string {
    return privateDecrypt(
      this.privateKey,
      Buffer.from(encryptedMessage, 'base64')
    ).toString()
  }

  propertyDecrypt(encryptedMessage: string): string {
    const res = this.regex.exec(encryptedMessage)
    if (!res) {
      return encryptedMessage
    }
    return this.decrypt(res[1])
  }
}
