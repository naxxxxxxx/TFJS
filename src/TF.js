import Method from './utils/methods'
import callObjects from './functions/calls'
import registerObjects from './functions/registers'

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
  }

  extends(data) {
    return new Method(data).assignToObject(this)
  }
}

export default TF
