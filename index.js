const getColors = require('./lib/get-colors')
const getPixels = require('./lib/get-pixels')

async function getColorsFromUrl (url) {
  let { data } = await getPixels(url)
  return getColorsFromPixels(data)
}

async function getColorsFromFile (file) {
  let { data } = await getPixels(file)
  return getColorsFromPixels(data)
}

async function getColorsFromPixels (pixels) {
  return getColors(pixels)
}

module.exports = {
  getColorsFromUrl,
  getColorsFromFile,
  getColorsFromPixels,
}
