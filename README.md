# TFJS

Git clone

```bash
yarn install && yarn dist
```

In browser

```javascript
const tf = new TF()
```

## Method definition

### calls

Call has to be injected to library. see `src/functions/calls`.

Here is the structure:

```javascript
{
  name: 'test',// name that js use, like: TF.test
  call: 'TEST',// name that call to Android, which android HAD WRITTEN to it's code
  params: { // params sent to bridge
    param1: ['isString', 'required'], // paramName:[Validator<string>,isRequried<'reqruied'|'optional'>]
    param2: ['isString', 'required'],
    param3: ['isString', 'optional'],
    param4: ['isNumber', 'optional']
  },
  transformer: { // transform param before send to bridge
    param4: 'toNumber' // paramName:Validator<string>
  },
  isSendJson: true // set it true, if you don't send json but single argument
}
```

when you use, you just:

```javascript
tf.test({ param1: '1', param2: '2', param3: '3', param4: 4 }, callback)
```

### registers

Javascript side register a function to let Android to call

Here is the structure:

```javascript
{
  name: 'test',// name that for js only
  call: 'TESTJS',// registered name that Android call to JS
  params: { // params sent to bridge
    param1: ['isString', 'required'], // paramName:[Validator<string>,isRequried<'reqruied'|'optional'>]
    param2: ['isString', 'required'],
    param3: ['isString', 'optional'],
    param4: ['isNumber', 'optional']
  },
  transformer: { // transform param before send to bridge
    param4: 'toNumber' // paramName:Validator<string>
  },
  isSendJson: true // set it true, if you don't send json but single argument
}
```

## extends Method

### TF.extends

```javascript
const tf = new TF()

const methodObject = {
  name: 'test2', // name that js use, like: TF.test
  call: 'TEST2', // name that call to Android, which android HAD WRITTEN to it's code
  params: {
    // params sent to bridge
    param1: ['isString', 'required'], // paramName:[Validator<string>,isRequried<'reqruied'|'optional'>]
    param2: ['isString', 'required'],
    param3: ['isString', 'optional'],
    param4: ['isNumber', 'optional']
  },
  transformer: {
    // transform param before send to bridge
    param4: 'toNumber' // paramName:Validator<string>
  },
  isSendJson: true // set it true, if you don't send json but single argument
}

tf.extends(methodObject)
```
