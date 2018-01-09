
const template = require( 'lodash.template' )

const through = require( 'through2' ).obj


module.exports = function( opts = {} ) {

  return through( ( file, enc, cb ) => {
    cb( null, file )
  } )
}