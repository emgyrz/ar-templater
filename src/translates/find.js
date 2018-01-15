const path = require( 'path' )
const glob = require( 'glob' )
const conf = require( '../conf' )
const utils = require( '../utils' )


const fileExtRegexp = /\.js(on)?$/

module.exports = function() {

  const translates = {}
  const langCodes = []

  const langDir = conf.get( 'langDir' )

  const langDirPath = path.normalize( path.format( { dir: langDir } ) )

  const dirs = glob.sync( langDirPath + '*/' )

  if ( dirs.length === 0 ) {
    utils.err( { msg: 'cannot find translates in ' + langDir } )
  }

  dirs.forEach( oneLangDirPath => {
    const langCode = path.basename( oneLangDirPath )

    translates[ langCode ] = {}
    langCodes.push( langCode )

    glob.sync( oneLangDirPath + '*' )
      .filter( fPath => fileExtRegexp.test( fPath ) )
      .forEach( fPath => {
        const fileName = path.basename( fPath ).replace( fileExtRegexp, '' )
        translates[ langCode ][ fileName ] = require( path.join( process.cwd(), fPath ) )
      } )

  } )


  return { translates, langCodes }

}
