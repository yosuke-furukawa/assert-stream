'use strict';

const Writable = require('stream').Writable;

class AssertStream extends Writable {
  constructor(options) {
    super(options);
    const assert = (options && options.assert) || require('assert');
    this.result = '';
    this.on('finish', () => {
      try {
        switch (typeof this.expect) {
          case 'string':
          case 'number':
            break;
          case 'object':
            if (this.expect instanceof RegExp) {
              break;
            }
            this.result = JSON.parse(this.result);
            break;
        }
        const result = this.checkRegExp(this.expect, this.result, assert);
      } catch(e) {
        this.emit('error', e);
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

  checkRegExp(expect, actual, assert) {
    if (expect instanceof RegExp) {
      return assert(expect.test(actual));
    } else if (typeof expect === 'string') {
      return assert.equal(expect.trim(), actual.trim());
    } else if (typeof expect === 'number') {
      return assert.equal(expect, +actual);
    } else if (typeof expect !== 'object') {
      return assert.equal(expect, actual);
    }
    return Object.keys(expect).some((key) => this.checkRegExp(expect[key], actual[key], assert));
  }
}

module.exports = AssertStream;

