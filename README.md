# assert-stream

AssertStream is an assertion utility for Stream.

# install

```
$ npm install assert-stream --save-dev
```

# usage

```javascript
const AssertStream = require('assert-stream');
const test = require('eater/runner').test;
const fs = require('fs');

test('assert-stream', () => {
  // foo.json has
  // { "foo": "bar" }
  const readStream = fs.createReadStream('./test/foo.json');
  const assertStream = new AssertStream();
  assertStream.expect({
    foo: 'bar'
  });
  readStream.pipe(assertStream);
});
```
