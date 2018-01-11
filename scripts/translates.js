const path = require( 'path' )
const glob = require( 'glob' )
const plugErr = require( './err' )
const { isStr, isObj } = require( './utils' )
const getVal = require( 'lodash.get' )



let finded = false
const translates = {}
const langCodes = []


const fallbacks = {
  default: 'en',
  custom: {}
}


function getFbCodeFor( langCode ) {
  const customFb = fallbacks.custom[ langCode]
  return isStr( customFb ) ? customFb : fallbacks.default
}



function getTrs( langCode, key ) {

  const get = lang => getVal( translates, lang + '.' + key )

  let trs = get( langCode )
  if ( !isStr( trs ) ) {
    trs = get( getFbCodeFor( langCode ) )
  }

  if ( !isStr( trs ) ) {
    throw new Error( 'translate not found: ' + key )
  }
  return trs
}









function setFallbacks( { defaultFB, custom } = {}, cb ) {

  if ( isStr( defaultFB ) ) {
    if ( !langCodes.includes( defaultFB ) ) {
      return cb( plugErr( 'has no translates for default fallback' ) )
    }
    fallbacks.default = defaultFB
  }

  if ( !isObj( custom ) ) return cb()

  Object.keys( custom ).forEach( langCode => {
    const customFallback = custom[ langCode ]
    if ( !langCodes.includes( customFallback ) ) {
      const toUp = str => str.toUpperCase()
      console.warn( `WARN! fallback translates ${toUp( customFallback )} for language ${toUp( langCode )} is not exist. will use ${toUp( fallbacks.default )}` )
    } else {
      fallbacks[ langCode ] = customFallback
    }
  } )

  cb()

}






function translateOne( langCode, fileStr ) {

  let res = ''

  let fromInd = 0
  let indOfStart = fileStr.indexOf( '${{', fromInd )

  if ( indOfStart === -1 ) {
    res = fileStr
  }

  while ( indOfStart !== -1 ) {
    res += fileStr.substring( fromInd, indOfStart )
    const toInd = fileStr.indexOf( '}}$', indOfStart )
    const key = fileStr.substring( indOfStart + 3, toInd ).trim()
    res += getTrs( langCode, key )
    indOfStart = fileStr.indexOf( '${{', toInd )
    fromInd = toInd + 3
    if ( indOfStart === -1 ) {
      res += fileStr.substring( toInd + 3 )
    }
  }

  return res

}



function translate( fileStr ) {
  const res = {}
  langCodes.forEach( code => {
    res[ code ] = translateOne( code, fileStr )
  } )
  return res
}






module.exports = {
  translate,
  langCodes,
  findTranslates,
  setFallbacks
}