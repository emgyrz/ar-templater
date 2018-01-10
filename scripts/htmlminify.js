
const htmlminify = require('html-minifier').minify;

const htmlMinOpts = {
  collapseWhitespace: true,
  removeComments: true
}

module.exports = function( str ) {
  return htmlminify( str, htmlMinOpts )
}

