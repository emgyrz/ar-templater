
const template = require( 'lodash.template' )
const translates = require( './script/translates' )
const err = require( './scripts/err' )

const through = require( 'through2' ).obj

const cache = {}


module.exports = function( opts = {} ) {

  console.log( 'func' )

  translates.findTranslates( opts.langDir )

  return through( function( file, enc, cb ) {
    cb( null, file )
  } )

}
