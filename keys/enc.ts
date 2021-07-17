import { StringEncryptor } from '../src/common/string.encryptor'

// generateKeyPair(
//   'rsa',
//   {
//     modulusLength: 512,
//     publicKeyEncoding: {
//       type: 'spki',
//       format: 'pem',
//     },
//     privateKeyEncoding: {
//       type: 'pkcs8',
//       format: 'pem',
//       cipher: 'aes-256-cbc',
//       passphrase: 'HAHAHA',
//     },
//   },
//   (err, publicKey, privateKey) => {
//     console.log(err, publicKey, privateKey)
//   }
// )

const str = 'HAHA'

const encStr = StringEncryptor.getInstance().encrypt(str)
console.log(encStr)

const decStr = StringEncryptor.getInstance().decrypt(encStr)
console.log(decStr.toString())
