const { get: getVal, isString: isStr } = require( 'lodash' )
const conf = require( '../conf' )
const find = require( './find' )
const utils = require( '../utils' )


const store = {
  translates: {},
  langCodes: [],
  customFallbacks: {},
  fallback: ''
}




function setFallbacks() {

  const fb = conf.get( 'langFallback' )
  const custom = conf.get( 'customLangFallbacks' )

  if ( !store.langCodes.includes( fb ) ) {
    utils.err( { msg: 'has no translates for default fallback' } )
  }

  store.fallback = fb

  Object.keys( custom ).forEach( langCode => {
    const customFallback = custom[ langCode ]
    if ( !store.langCodes.includes( customFallback ) ) {
      const toUp = str => str.toUpperCase()
      console.warn( `WARN! fallback translates ${toUp( customFallback )} for language ${toUp( langCode )} is not exist. will use ${toUp( fallbacks.default )}` )
    } else {
      store.customFallbacks[ langCode ] = customFallback
    }
  } )

}




function prepare() {
  const trs = find()
  store.translates = trs.translates
  store.langCodes = trs.langCodes
  setFallbacks()
}







function getFbCodeFor( langCode ) {
  const customFb = store.customFallbacks[ langCode ]
  return isStr( customFb ) ? customFb : store.fallback
}



function getTrs( langCode, key ) {

  const get = lang => getVal( store.translates, lang + '.' + key )

  let trs = get( langCode )
  if ( !isStr( trs ) ) {
    trs = get( getFbCodeFor( langCode ) )
  }

  if ( !isStr( trs ) ) {
    utils.err( { msg: 'translate not found: ' + key } )
  }

  return trs
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
  store.langCodes.forEach( code => {
    res[ code ] = translateOne( code, fileStr )
  } )
  return res
}




module.exports = {
  prepare,
  translate,
  get langCodes() {
    return store.langCodes.slice( 0 )
  }
}
