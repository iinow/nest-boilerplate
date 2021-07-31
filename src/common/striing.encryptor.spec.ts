import { createPrivateKey, createPublicKey } from 'crypto'

import { StringEncryptor } from './string.encryptor'

describe('Syslog', () => {
  let stringEncryptor: StringEncryptor

  beforeEach(async () => {
    stringEncryptor = StringEncryptor.getInstance()
  })

  it('should be defined', () => {
    expect(stringEncryptor).toBeDefined()
  })

  it('should be defined encrypt message', () => {
    const message = 'Hello world'

    expect(stringEncryptor.encrypt(message)).toBeDefined()
  })

  it('decrypt message then equal message before encrypt', () => {
    const message = 'Hello world'
    const encryptMessage = stringEncryptor.encrypt(message)

    expect(stringEncryptor.decrypt(encryptMessage)).toStrictEqual(message)
  })

  it('propertyDecrypt', () => {
    const message = 'Hello world'
    const encryptMessage = `ENC(${stringEncryptor.encrypt(message)})`

    expect(stringEncryptor.propertyDecrypt(encryptMessage)).toStrictEqual(
      message
    )
  })
})
