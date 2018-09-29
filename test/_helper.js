const assert = require('power-assert')

async function assertThrowsAsync(fn, regExp) {
  let f = () => {};
  try {
    await fn();
  } catch(e) {
    f = () => {throw e};
  } finally {
    assert.throws(f, regExp);
  }
}

function assertColorArray (colors) {
  assert(colors && colors.length > 1);
  assert(colors[0].hex.startsWith('#'));
  assert(Number.isFinite(colors[0].hist));
}

module.exports = {
  assertThrowsAsync,
  assertColorArray,
}