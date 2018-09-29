import bridge from 'dsbridge'

class Bridge {
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
}

export default Bridge
