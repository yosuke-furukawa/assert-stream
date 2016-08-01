const test = require('eater/runner').test;
const fs = require('fs');
const AssertStream = require('../');

test('assert-stream', () => {
  const readStream = fs.createReadStream('./test/foo.json');
  const assertStream = new AssertStream();
  assertStream.expect({
    foo: 'bar'
  });
  readStream.pipe(assertStream);
});
