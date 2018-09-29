export default [
  /**
   * createTransaction
   * @params {txHash:Hash}
   */
  {
    name: 'test',
    call: 'TEST',
    params: {
      param1: ['isString', 'required'],
      param2: ['isString', 'required'],
      // FIXME: core must be able to parse amount as string; it currently does
      // not. the issue is being tracked here: https://github.com/Zilliqa/Zilliqa/issues/524
      param3: ['isString', 'optional'],
      param4: ['isNumber', 'optional']
    },
    transformer: {
      param4: 'toNumber'
    },
    isSendJson: true
  }
]
