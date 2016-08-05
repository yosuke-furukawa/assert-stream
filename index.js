'use strict';

const Writable = require('stream').Writable;

class AssertStream extends Writable {
  constructor(options) {
    super(options);
    const assert = (options && options.assert) || require('assert');
    this.result = '';
    this.on('finish', () => {
      switch (typeof this.expect) {
        case 'string':
        case 'number':
          assert(this.expect === this.result);
          break;
        case 'object':
          assert.deepEqual(this.expect, JSON.parse(this.result));
          break;
      }
    });
  }

  expect(obj) {
    this.expect = obj;
  }

  _write(chunk, encoding, callback) {
    this.result += chunk;
    callback();
  }
}

module.exports = AssertStream;

