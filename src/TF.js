import Method from './utils/methods'
import callObjects from './functions/calls'
import registerObjects from './functions/registers'
import { hasNativeMethod } from './bridge'
import * as validator from './utils/generator'

const mapCallsToMethods = (main) => {
  callObjects.map((data) => {
    const zilMethod = new Method(data)
    zilMethod.assignToObject(main)
    return false
  })
}

const mapRegsToMethods = (main) => {
  registerObjects.map((data) => {
    const zilMethod = new Method(data)
    zilMethod.assignToObject(main)
    return false
  })
}
class TF {
  constructor() {
    mapCallsToMethods(this)
    mapRegsToMethods(this)
    this.validator = validator
  }

  hasNativeMethod = (name, mode) => {
    // mode:["all"|"syn"|"asyn" ]
    if (!validator.isString(name)) {
      throw new TypeError('NativeMethod Name has to be "String"')
    }
    return hasNativeMethod(name, mode)
  }

  extends(data) {
    if (!validator.isObject(data)) {
      throw new TypeError('Extend Method has to be Object')
    }
    return new Method(data).assignToObject(this)
  }
}

export default TF
