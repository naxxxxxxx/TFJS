import bridge from 'dsbridge'

export const { hasNativeMethod } = bridge
export class Bridge {
  send = async (name, params) => {
    const result = await bridge.call(name, params)
    return result
  }

  sendAsync = (name, params, callback) => {
    bridge.call(name, params, callback)
  }

  register = (name, callback) => {
    bridge.register(name, callback)
  }

  registerAsync = (name, callback) => {
    bridge.registerAsyn(name, callback)
  }
}
