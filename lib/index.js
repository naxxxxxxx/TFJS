'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
require('core-js/modules/es6.number.constructor');
require('core-js/modules/es6.number.is-integer');
var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
require('core-js/modules/es7.array.includes');
require('core-js/modules/es6.string.includes');
require('core-js/modules/es6.object.assign');
require('core-js/modules/es7.object.values');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.object.keys');
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
require('regenerator-runtime/runtime');
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var bridge = _interopDefault(require('dsbridge'));
require('core-js/modules/es6.function.name');
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));

/**
 * [isNumber verify param is a Number]
 * @param  {[type]}  obj [value]
 * @return {Boolean}     [boolean]
 */
var isNumber = function isNumber(obj) {
  return obj === +obj;
};
/**
 * [isNumber verify param is a Number]
 * @param  {[type]}  obj [value]
 * @return {Boolean}     [boolean]
 */

var isInt = function isInt(obj) {
  return isNumber(obj) && Number.isInteger(obj);
};
/**
 * [isString verify param is a String]
 * @param  {[type]}  obj [value]
 * @return {Boolean}     [boolean]
 */

var isString = function isString(obj) {
  return obj === "".concat(obj);
};
/**
 * [isBoolean verify param is a Boolean]
 * @param  {[type]}  obj [value]
 * @return {Boolean}     [boolean]
 */

var isBoolean = function isBoolean(obj) {
  return obj === !!obj;
};
/**
 * [isArray verify param input is an Array]
 * @param  {[type]}  obj [value]
 * @return {Boolean}     [boolean]
 */

var isArray = function isArray(obj) {
  return Array.isArray(obj);
};
/**
 * [isObject verify param is an Object]
 * @param  {[type]}  obj [value]
 * @return {Boolean}     [boolean]
 */

var isObject = function isObject(obj) {
  return obj !== null && !Array.isArray(obj) && _typeof(obj) === 'object';
};
/**
 * [isFunction verify param is a Function]
 * @param  {[type]}  obj [value]
 * @return {Boolean}     [description]
 */

var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};
/**
 * check Object isNull
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */

var isNull = function isNull(obj) {
  return obj === null;
};
/**
 * check object is undefined
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */

var isUndefined = function isUndefined(obj) {
  return obj === undefined;
};

var validators = /*#__PURE__*/Object.freeze({
  isNumber: isNumber,
  isInt: isInt,
  isString: isString,
  isBoolean: isBoolean,
  isArray: isArray,
  isObject: isObject,
  isFunction: isFunction,
  isNull: isNull,
  isUndefined: isUndefined
});

function objToArray(obj) {
  var keys = Object.keys(obj);
  var values = Object.values(obj);
  var newArray = keys.map(function (k, index) {
    var Obj = {};
    Obj[k] = values[index];
    return Obj;
  });
  return newArray;
}

function injectValidator(func) {
  if (_typeof(func) === 'object' && func !== undefined) {
    var valName = Object.keys(func)[0];
    var valFunc = Object.values(func)[0];
    return Object.assign(valFunc, {
      validator: valName,
      test: function test(obj) {
        return valFunc(obj);
      }
    });
  } else return false;
}

function extractValidator(vals) {
  var newValidator = [];
  var newArr = objToArray(vals);
  newArr.forEach(function (v, index) {
    var newV = injectValidator(v);
    var validatorString = newV.validator;
    newValidator[validatorString] = newV;
    newValidator[index] = newV;
  });
  return newValidator;
}

var valArray = extractValidator(validators);
var isNumber$1 = valArray.isNumber,
    isInt$1 = valArray.isInt,
    isString$1 = valArray.isString,
    isBoolean$1 = valArray.isBoolean,
    isArray$1 = valArray.isArray,
    isObject$1 = valArray.isObject,
    isFunction$1 = valArray.isFunction,
    isNull$1 = valArray.isNull,
    isUndefined$1 = valArray.isUndefined;
/**
 * [Validator description]
 * @param       {[type]} stringToTest    [description]
 * @param       {[type]} validatorString [description]
 * @constructor
 */

function Validator(stringToTest, validatorString) {
  if (typeof validatorString === 'string' && valArray["is".concat(validatorString)] !== undefined) {
    return valArray["is".concat(validatorString)].test(stringToTest);
  } else if (typeof validatorString === 'function') {
    return validatorString(stringToTest);
  } else {
    throw new Error("validator not found :".concat(validatorString));
  }
}

function tester(value, callback) {
  try {
    var validateResult = valArray.map(function (func) {
      return func.test(value) ? func.validator.substring(2) : false;
    }).filter(function (d) {
      return d !== false;
    });
    return callback === undefined ? validateResult : callback(validateResult);
  } catch (e) {
    return callback === undefined ? e : callback(e);
  }
}

Object.assign(Validator, {
  test: tester
});
var validator = Validator;
/**
 * make sure each of the keys in requiredArgs is present in args
 * @param  {[type]} args         [description]
 * @param  {[type]} requiredArgs [description]
 * @param  {[type]} optionalArgs [description]
 * @return {[type]}              [description]
 */

function validateArgs(args, requiredArgs, optionalArgs) {
  for (var key in requiredArgs) {
    if (args[key] !== undefined) {
      for (var i = 0; i < requiredArgs[key].length; i += 1) {
        if (typeof requiredArgs[key][i] !== 'function') throw new Error('Validator is not a function');

        if (!requiredArgs[key][i](args[key])) {
          throw new Error("Validation failed for ".concat(key, ",should be ").concat(requiredArgs[key][i].validator));
        }
      }
    } else throw new Error("Key not found: ".concat(key));
  }

  for (var _key in optionalArgs) {
    if (args[_key]) {
      for (var _i = 0; _i < optionalArgs[_key].length; _i += 1) {
        if (typeof optionalArgs[_key][_i] !== 'function') throw new Error('Validator is not a function');

        if (!optionalArgs[_key][_i](args[_key])) {
          throw new Error("Validation failed for ".concat(_key, ",should be ").concat(optionalArgs[_key][_i].validator));
        }
      }
    }
  }

  return true;
}

function validateTypes(arg, validatorArray) {
  var valLength = validatorArray.length;

  if (valLength === 0 || !isArray$1(validatorArray)) {
    throw new Error('Must include some validators');
  }

  var valsKey = validator.test(arg);
  var getValidators = [];
  var finalReduceArray = validatorArray.map(function (v) {
    getValidators.push(v.validator);
    return valsKey.includes(v.validator.substring(2)) ? 1 : 0;
  });
  var finalReduce = finalReduceArray.reduce(function (acc, cur) {
    return acc + cur;
  });

  if (finalReduce === 0) {
    throw new TypeError("One of [".concat(getValidators.concat(), "] has to pass, but we have your arg to be [").concat(_toConsumableArray(valsKey), "]"));
  }

  return true;
}

var toString = function toString(string) {
  validateTypes(string, [isNumber$1, isInt$1, isString$1, isBoolean$1, isArray$1, isObject$1, isFunction$1, isNull$1, isUndefined$1]);

  try {
    if (isArray$1(string) || isObject$1(string)) {
      return JSON.stringify(string);
    }

    return String(string);
  } catch (e) {
    throw new Error(e);
  }
};
var toNumber = function toNumber(string) {
  validateTypes(string, [isNumber$1, isInt$1, isString$1, isBoolean$1, isNull$1, isUndefined$1]);

  try {
    return Number(string);
  } catch (e) {
    throw new Error(e);
  }
};

var Bridge = function Bridge() {
  _classCallCheck(this, Bridge);

  _defineProperty(this, "send",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(name, params) {
      var result;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return bridge.call(name, params);

            case 2:
              result = _context.sent;
              return _context.abrupt("return", result);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "sendAsync", function (name, params, callback) {
    bridge.call(name, params, callback);
  });

  _defineProperty(this, "register", function (name, callback) {
    bridge.register(name, callback);
  });
};

var validatorArray = {
  isNumber: [isNumber$1],
  isInt: [isInt$1],
  isString: [isString$1],
  isBoolean: [isBoolean$1],
  isArray: [isArray$1],
  isObject: [isObject$1],
  isFunction: [isFunction$1],
  isNull: [isNull$1],
  isUndefined: [isUndefined$1]
};
var transformerArray = {
  toNumber: toNumber,
  toString: toString
};

var Method = function Method(options) {
  var _this = this;

  _classCallCheck(this, Method);

  _defineProperty(this, "generateValidateObjects", function () {
    var validatorObject = _this.params;
    var requiredArgs = {};
    var optionalArgs = {};

    for (var index in validatorObject) {
      if (index !== undefined) {
        var newObjectKey = index;
        var newObjectValid = validatorObject[index][0];
        var isRequired = validatorObject[index][1];

        if (isRequired === 'required') {
          requiredArgs[newObjectKey] = validatorArray[newObjectValid];
        } else {
          optionalArgs[newObjectKey] = validatorArray[newObjectValid];
        }
      }
    }

    return {
      requiredArgs: requiredArgs,
      optionalArgs: optionalArgs
    };
  });

  _defineProperty(this, "validateArgs", function (args, requiredArgs, optionalArgs) {
    var reArgs = requiredArgs === undefined ? {} : requiredArgs;
    var opArgs = optionalArgs === undefined ? {} : optionalArgs;

    if (args && _this.params !== {}) {
      return validateArgs(args, reArgs, opArgs);
    }

    return true;
  });

  _defineProperty(this, "extractParams", function (args) {
    var paramsObject = isObject$1(args) ? args : {};
    var result;
    var keyArrayLength = Object.keys(paramsObject).length;
    if (keyArrayLength === 0) result = [];

    if (keyArrayLength === 1 && !_this.isSendJson) {
      var resultKey = Object.keys(paramsObject)[0];
      result = [_this.transformedBeforeSend(paramsObject[resultKey], resultKey)];
    } else if (keyArrayLength > 0 && _this.isSendJson) {
      var newObject = {};
      Object.keys(paramsObject).map(function (k) {
        newObject[k] = _this.transformedBeforeSend(paramsObject[k], k);
        return false;
      });
      result = [newObject];
    }

    return result;
  });

  _defineProperty(this, "transformedBeforeSend", function (value, key) {
    var transformMethod = _this.transformer[key];

    if (transformMethod !== undefined) {
      return transformerArray[transformMethod](value);
    } else return value;
  });

  _defineProperty(this, "assignToObject", function (object) {
    var newObject = {};
    newObject[_this.name] = _this.methodBuilder();
    return Object.assign(object, newObject);
  });

  _defineProperty(this, "methodBuilder", function () {
    if (_this.bridge !== null && _this.from === 'js') {
      return function (args, callback) {
        var _this$generateValidat = _this.generateValidateObjects(),
            requiredArgs = _this$generateValidat.requiredArgs,
            optionalArgs = _this$generateValidat.optionalArgs;

        _this.validateArgs(args, requiredArgs, optionalArgs);

        var params = _this.extractParams(args);

        var newCallback = isFunction$1(args) ? args : callback;

        if (newCallback) {
          return _this.bridge.sendAsync(_this.call, params, newCallback);
        }

        return _this.bridge.send(_this.call, params);
      };
    }

    if (_this.bridge !== null && _this.from !== 'js') {
      return function (callback) {
        if (callback) {
          return _this.bridge.register(_this.call, callback);
        }

        return _this.bridge.register(_this.call);
      };
    }
  });

  var name = options.name,
      call = options.call,
      _params = options.params,
      transformer = options.transformer,
      isSendJson = options.isSendJson,
      from = options.from;
  this.name = name;
  this.call = call;
  this.params = _params;
  this.bridge = new Bridge();
  this.from = from || 'js';
  this.transformer = transformer || {};
  this.isSendJson = isSendJson || false;
};

var callObjects = [
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
}];

var registerObjects = [
/**
 * [name description]
 * @type {String}
 */
{
  name: 'testJS',
  call: 'TESTJS',
  from: 'Android'
}];

var mapCallsToMethods = function mapCallsToMethods(main) {
  callObjects.map(function (data) {
    var zilMethod = new Method(data);
    zilMethod.assignToObject(main);
    return false;
  });
};

var mapRegsToMethods = function mapRegsToMethods(main) {
  registerObjects.map(function (data) {
    var zilMethod = new Method(data);
    zilMethod.assignToObject(main);
    return false;
  });
};

var TF =
/*#__PURE__*/
function () {
  function TF() {
    _classCallCheck(this, TF);

    mapCallsToMethods(this);
    mapRegsToMethods(this);
  }

  _createClass(TF, [{
    key: "extends",
    value: function _extends(data) {
      return new Method(data).assignToObject(this);
    }
  }]);

  return TF;
}();

if (typeof window !== 'undefined' && typeof window.TF === 'undefined') {
  window.TF = TF;
}

module.exports = TF;
