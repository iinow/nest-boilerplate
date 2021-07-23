import { generateKeyPair } from 'crypto'
import { writeFileSync } from 'fs'
import { join } from 'path'

import { StringEncryptor } from '../src/common/string.encryptor'

function generate() {
  generateKeyPair(
    'rsa',
    {
      modulusLength: 1024,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'HAHAHA',
      },
    },
    (err, publicKey, privateKey) => {
      writeFileSync(join(__dirname, './public.pem'), publicKey)
      writeFileSync(join(__dirname, './private.pem'), privateKey)
    }
  )
}

const str = 'HAHA'

const encStr = StringEncryptor.getInstance().encrypt(str)
console.log(encStr)

const decStr = StringEncryptor.getInstance().decrypt(encStr)
console.log(decStr.toString())
