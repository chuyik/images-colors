const assert = require('power-assert')
const path = require('path')
const { getColorsFromUrl, getColorsFromFile } = require('../')

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

describe('getColorsFromUrl()', () => {
  it('should return colors with valid jpeg url', async () => {
    let colors = await getColorsFromUrl('http://img14.360buyimg.com/ling/jfs/t24427/125/1920729049/470270/aea93b19/5b6d344fNa41f872a.jpg')
    assertColorArray(colors)
  })

  it('should return colors with valid png url', async () => {
    let colors = await getColorsFromUrl('https://img10.360buyimg.com/ling/jfs/t7531/212/3466530816/129631/7d546a64/59bfb3ddNefe4a128.png')
    assertColorArray(colors)
  })

  it('should return colors with unknown extension url', async () => {
    await assertThrowsAsync(() =>
      getColorsFromUrl('http://img10.360buyimg.com/ling/jfs/t7531/212/3466530816/129631/7d546a64/59bfb3ddNefe4a128.png.webp')
      , /unknown extension type/
    )
  })

  it('should return colors with non-existed url', async () => {
    await assertThrowsAsync(() =>
      getColorsFromUrl('http://img14.360buyimg.com/ling/jfs/1.jpg'), /404/
    )
  })

  it('should return colors with non-accessible url', async () => {
    await assertThrowsAsync(() =>
      getColorsFromUrl('http://facebook.com/1.png'), /ETIMEDOUT/
    )
  })
})

describe('getColorsFromFile()', () => {
  it('should return colors with valid jpeg file', async () => {
    let colors = await getColorsFromFile(path.join(__dirname, 'pic.jpg'))
    assertColorArray(colors)
  })

  it('should return colors with non-existed file', async () => {
    await assertThrowsAsync(() =>
      getColorsFromFile('./abc.jpg'), /ENOENT/
    )
  })
})
