const { assertThrowsAsync, assertColorArray } = require('./_helper')
const { getColorsFromUrl } = require('../')

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
