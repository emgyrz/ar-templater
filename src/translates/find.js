const path = require( 'path' )
const glob = require( 'glob' )
const { isArray } = require( 'lodash' )
const conf = require( '../conf' )
const utils = require( '../utils' )

const fileExtRegexp = /\.js(on)?$/



function filterLangs( dirsPaths ) {

  const { includes, excludes } = conf.get( 'langsFilter' )
  const has = arr => isArray( arr ) && arr.length !== 0
  const hasIncl = has( includes )
  const hasExcl = has( excludes )

  return dirsPaths.filter( langDirPath => {
      let needToCompile = true
      const langCode = path.basename( langDirPath )
      if ( hasIncl ) {
        needToCompile = includes.includes( langCode )
      }
      if ( hasExcl ) {
        needToCompile = !excludes.includes( langCode )
      }
      return needToCompile
    } )
}





function escapeQuotes( obj ) {
  const quotes = /\'/g

  Object.keys( obj ).forEach( key => {
    const val = obj[ key ]
    obj[ key ] = typeof val === 'string' ? val.replace( quotes, '&quot;' ) : escapeQuotes( val )
  } )

  return obj
}





module.exports = function() {

  const translates = {}
  const langCodes = []

  const langDir = conf.get( 'langDir' )

  const langDirPath = path.normalize( path.format( { dir: langDir } ) )


  const allDirs = glob.sync( langDirPath + '*/' )

  if ( allDirs.length === 0 ) {
    utils.err( { msg: 'cannot find translates in ' + langDir } )
  }

  const dirs = filterLangs( allDirs )

  dirs.forEach( oneLangDirPath => {
    const langCode = path.basename( oneLangDirPath )

    translates[ langCode ] = {}
    langCodes.push( langCode )

    glob.sync( oneLangDirPath + '*' )
      .filter( fPath => fileExtRegexp.test( fPath ) )
      .forEach( fPath => {
        const fileName = path.basename( fPath ).replace( fileExtRegexp, '' )
        translates[ langCode ][ fileName ] = escapeQuotes( require( path.join( process.cwd(), fPath ) ) )
      } )

  } )


  return { translates, langCodes }

}
