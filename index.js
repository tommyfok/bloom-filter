function str2num(str) {
  let s = str + ''
  s = s[0]
  if (!s) throw 'empty string is not allowed'
  return s.charCodeAt(0)
}

function MultiBloomFilter(length = 3) {
  if (isNaN(length)) throw 'length must be a number'
  if (length < 1) throw 'length must be greater than 1'
  this.filters = []
  for (let i = 0; i < length; i++) {
    this.filters[i] = new BloomFilter()
  }
}

MultiBloomFilter.prototype.add = function (key) {
  var key = key + ''
  this.filters.forEach((bf, i) => {
    let s = key[i]
    bf.add(s ? str2num(s) : 0)
  })
}

MultiBloomFilter.prototype.isMember = function (key) {
  var key = key + ''
  return this.filters.every((bf, i) => {
    let s = key[i]
    return bf.isMember(s ? str2num(s) : 0)
  })
}

function BloomFilter(max = Math.pow(2, 16) - 1) {
  this.max = max
  this.filterNumber = 0
}

BloomFilter.prototype.add = function (num) {
  if (num < 0 || num > this.max) {
    throw 'char out of range'
  }
  this.filterNumber = this.filterNumber | num
}

BloomFilter.prototype.isMember = function (num) {
  return (this.filterNumber & num) === num
}

module.exports = MultiBloomFilter
