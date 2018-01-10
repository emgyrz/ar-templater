const uglifyjs = require( 'uglify-js' )
const template = require( 'lodash.template' )
const { needMinify } = require( './utils' )

const lineBreaks = /\n|\r/g


function isTplToCompile( fileStr ) {
  let indOfInterpolation = -1
  indOfInterpolation = fileStr.indexOf( '<%' )
  return indOfInterpolation !== -1 && fileStr.indexOf('%>', indOfInterpolation ) !== -1
}


function clearLineBreaks( fileStr ) {
  return fileStr.replace( lineBreaks, '')
}



function compile( fileStr ) {

  if ( !isTplToCompile( fileStr ) ) {
    return clearLineBreaks( fileStr )
  }

  let tpl = template( fileStr ).source

  if ( needMinify ) {
    tpl = uglifyjs.minify( '_=' + tpl, {} ).code.slice( 2 )
  } else {
    tpl = clearLineBreaks( tpl )
  }

  return tpl
}



module.exports = {
  compile
}
