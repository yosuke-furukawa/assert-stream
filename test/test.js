const test = require('eater/runner').test;
const fs = require('fs');
const mustCall = require('must-call');
const AssertStream = require('../');

test('assert-stream foo.json', () => {
  const readStream = fs.createReadStream('./test/foo.json');
  const assertStream = new AssertStream();
  assertStream.expect({
    foo: 'bar'
  });
  readStream.pipe(assertStream);
});

test('assert-stream foo.json use regexp', () => {
  const readStream = fs.createReadStream('./test/foo.json');
  const assertStream = new AssertStream();
  assertStream.expect({
    foo: /bar/
  });
  readStream.pipe(assertStream);
});

test('assert-stream bar.json', () => {
  const readStream = fs.createReadStream('./test/bar.json');
  const assertStream = new AssertStream();
  assertStream.expect({
    "aaa": {
      "bbb": "ccc",
      "ddd": ["ccc"]
    }
  });
  readStream.pipe(assertStream);
});

test('assert-stream bar.json use regexp', () => {
  const readStream = fs.createReadStream('./test/bar.json');
  const assertStream = new AssertStream();
  assertStream.expect({
    "aaa": {
      "bbb": /ccc/,
      "ddd": [/ccc/]
    }
  });
  readStream.pipe(assertStream);
});

test('fail: assert-stream bar.json use regexp', () => {
  const readStream = fs.createReadStream('./test/bar.json');
  const assertStream = new AssertStream();
  assertStream.expect({
    "aaa": {
      "bbb": /aaa/,
      "ddd": [/ccc/]
    }
  });
  readStream.pipe(assertStream).on('error', mustCall((e) => {
    //noop
  }));
});

test('assert-stream string', () => {
  const readStream = fs.createReadStream('./test/string');
  const assertStream = new AssertStream();
  assertStream.expect("hogehoge\n");
  readStream.pipe(assertStream);
});

test('assert-stream number', () => {
  const readStream = fs.createReadStream('./test/number');
  const assertStream = new AssertStream();
  assertStream.expect(12345);
  readStream.pipe(assertStream);
});

test('assert-stream string regexp', () => {
  const readStream = fs.createReadStream('./test/string');
  const assertStream = new AssertStream();
  assertStream.expect(/hogehoge/);
  readStream.pipe(assertStream);
});

test('assert-stream number regexp', () => {
  const readStream = fs.createReadStream('./test/number');
  const assertStream = new AssertStream();
  assertStream.expect(/\d+/);
  readStream.pipe(assertStream);
});
