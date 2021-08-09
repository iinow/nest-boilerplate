export enum ProviderType {
  KAKAO = 'KA',
  GOOGLE = 'GO',
}

export function getEnumName<E>(enumClass: E, key: keyof E): string {
  const map = new Map<any, any>()

  Object.keys(enumClass).forEach((enumKey) => {
    map.set(enumClass[enumKey], enumKey)
  })

  return map.get(enumClass[key])
}
