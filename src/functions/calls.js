export default [
  {
    name: 'test',
    call: 'TEST',
    params: {
      param1: ['isString', 'required'],
      param2: ['isString', 'required'],
      param3: ['isString', 'optional'],
      param4: ['isNumber', 'optional']
    },
    transformer: {
      param4: 'toNumber'
    },
    isSendJson: true
  }
]
