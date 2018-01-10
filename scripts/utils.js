let minify = false

function isStr( any ) {
  return typeof any === 'string'
}

function isObj( any ) {
  return Object.prototype.toString.call( any ) === '[object Object]'
}

function isBool( any ) {
  return typeof any === 'boolean'
}


module.exports = {
  isStr,
  isObj,
  isBool,

  get needMinify() {
    return minify
  },

  set needMinify( bool ) {
    if ( isBool( bool ) ) {
      minify = bool
    }
  }

}