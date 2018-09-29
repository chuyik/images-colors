const RgbQuant = require('rgbquant')

function getColors (pixels) {
  let quant = new RgbQuant({
    colors: 20,
  })
  quant.sample(pixels)
  let pal = quant.palette(true)

  let hist = {}
  let indices = []

  for (let i = 0, len = pal.length; i < len; i++) {
    hist[i] = 0
    indices.push(i)
  }

  let result = quant.reduce(pixels, 2)
  for (let i = 0, len = result.length; i < len; i++) {
    hist[result[i]] += 1
  }

  let total = 0
  for (let i = 0, len = pal.length; i < len; i++) {
    total += hist[i]
  }

  for (let i = 0, len = pal.length; i < len; i++) {
    hist[i] = (hist[i] * 100) / total
  }

  indices.sort(function (a, b) {
    return hist[a] < hist[b] ? 1 : hist[a] > hist[b] ? -1 : 0
  })
  return indices.map(index => {
    return {
      hex: rgbToHex(pal[index]),
      hist: hist[index],
    }
  })
}

function rgbToHex (rgb) {
  function toHex (c) {
    let hex = parseInt(c).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return '#' + toHex(rgb[0]) + toHex(rgb[1]) + toHex(rgb[2])
}

module.exports = getColors

