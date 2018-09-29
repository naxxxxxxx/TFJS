import bridge from 'dsbridge'

export const { hasNativeMethod } = bridge
export class Bridge {
  send = (name, params) => {
    return bridge.call(name, params)
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
