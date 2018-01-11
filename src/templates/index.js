const uglifyjs = require( 'uglify-js' )
const template = require( 'lodash/template' )
const conf = require( '../conf' )
const concat = require( './concat' )

const lineBreaks = /\n|\r/g


function isPlainTpl( fileStr ) {
  const regexp = conf.get( 'templatesInterpolate' )
  return fileStr.match( regexp ) === null
}


function clearLineBreaks( fileStr ) {
  return fileStr.replace( lineBreaks, '')
}



function compile( fileStr, { isPlainTpl, needMinify } ) {

  if ( isPlainTpl ) {
    return '"' + clearLineBreaks( fileStr ) + '"'
  }

  let tpl = template( fileStr ).source

  if ( needMinify ) {
    tpl = uglifyjs.minify( '_=' + tpl, {} ).code.slice( 2 ).replace( /;$/, '' )
  } else {
    tpl = clearLineBreaks( tpl )
  }

  return tpl
}



module.exports = {
  compile,
  isPlainTpl,
  concat
}
