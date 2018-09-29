import Method from './utils/methods'
import callObjects from './functions/calls'
import registerObjects from './functions/registers'
import { hasNativeMethod } from './bridge'
import * as vals from './utils/generator'

const mapCallsToMethods = (main) => {
  callObjects.map((data) => {
    const method = new Method(data)
    method.assignToObject(main)
    return false
  })
}

const mapRegsToMethods = (main) => {
  registerObjects.map((data) => {
    const reg = new Method(data)
    reg.assignToObject(main)
    return false
  })
}
class TF {
  constructor() {
    this.validator = vals.validator
    this.util = vals
    this.call = {}
    this.reg = {}
    mapCallsToMethods(this.call)
    mapRegsToMethods(this.reg)
  }

  hasNativeMethod = (name, mode) => {
    // mode:["all"|"syn"|"asyn" ]
    if (!vals.isString(name)) {
      throw new TypeError('NativeMethod Name has to be "String"')
    }
    return hasNativeMethod(name, mode)
  }

  extends(data) {
    if (!vals.isObject(data)) {
      throw new TypeError('Extend Method has to be Object')
    }
    if (data.from) {
      return new Method(data).assignToObject(this.reg)
    }
    return new Method(data).assignToObject(this.call)
  }
}

export default TF
