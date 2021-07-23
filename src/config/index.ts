import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'

import { StringEncryptor } from '~/common/string.encryptor'

const YAML_CONFIG_FILENAME = `${process.env.NODE_ENV}.yml`

function iterator(obj: any) {
  if (typeof obj === 'string') {
    return StringEncryptor.getInstance().propertyDecrypt(obj)
  }

  Object.keys(obj).forEach((key) => {
    obj[key] = iterator(obj[key])
  })

  return obj
}

export default () => {
  const config = yaml.load(
    readFileSync(join(__dirname, `../../env/${YAML_CONFIG_FILENAME}`), 'utf8')
  ) as unknown

  const values = iterator(config)

  return values
}
