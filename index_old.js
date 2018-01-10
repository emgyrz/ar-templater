
const translates = require( './scripts/translates' )
const templates = require( './scripts/templates' )
const utils = require( './scripts/utils' )
// const plugErr = require( './scripts/err' )
const htmlminify = require( './scripts/htmlminify' )
const files = require( './scripts/files' )

// const through = require( 'through2' ).obj


function main( opts = {} ) {
  utils.needMinify = opts.minify

  let stream

  translates.findTranslates( opts.langDir, err => {
    if ( err ) {
      throw err
    }

    translates.setFallbacks( {
      defaultFB: opts.fallback,
      custom: opts.customFallbacks
    }, err => {
      if ( err ) {
        throw err
      }


      var t = htmlminify( file.toString() )
      let x = translates.translate( t )
      console.log("x", x);
      x = templates.compile( x.en )

      console.log("x", x);



      // stream = through( function( file, enc, cb ) {
      //   cb( null, file )
      // } )

    } )

  } )

  return stream

}


main( {
  langDir: './test/lang',
  // fallbackLang: 'en', *
  // customFallbacks: { ua: 'kz' },
  minify: true
} )


module.exports = main