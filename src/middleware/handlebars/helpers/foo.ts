const getName = (text: string) => {
  return Promise.resolve(`hello ${text}`)
}

export default {
  a: () => 'AA',
  getName,
}
