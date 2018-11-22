const path = require('path')
const { assertThrowsAsync, assertColorArray } = require('./_helper')
const { getColorsFromFile } = require('../')

describe('getColorsFromFile()', () => {
  it('should return colors with valid jpeg file', async () => {
    let colors = await getColorsFromFile(path.join(__dirname, 'pic.JPG'))
    assertColorArray(colors)
  })

  it('should return colors with non-existed file', async () => {
    await assertThrowsAsync(() =>
      getColorsFromFile('./abc.jpg'), /ENOENT/
    )
  })
})
