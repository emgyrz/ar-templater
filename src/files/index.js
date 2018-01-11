const fs = require( 'fs' )
const path = require( 'path' )
const glob = require( 'glob' )
const conf = require( '../conf' )
const utils = require( '../utils')
const TplFile = require( './file' )
const templates = require( '../templates' )
const translates = require( '../translates' )

const files = []


function prepare() {
  const src = conf.get( 'templatesSrc' )
  const tplFiles = glob.sync( src )

  if ( tplFiles.length === 0 ) {
    utils.err( 'no files to watch in ' + src )
  }

  files.push( ...tplFiles.map( filePath => new TplFile( filePath ) ) )
}




function compileAll() {
  files.forEach( file => file.compile() )
}


function concatContents() {

  const result = {}

  translates.langCodes.forEach( langCode => {

    result[ langCode ] = templates.concat( files.map( file => {
      return {
        key: file.variableName,
        value: file.getTpl( langCode )
      }
    } ) )

  } )

  return result

}






function writeFiles() {
  const concated = concatContents()
  const { name: nameModifier } = conf.get( 'output' )
  const dest = conf.get( 'dest' )

  translates.langCodes.forEach( langCode => {
    const name = nameModifier( langCode ) + '.js'
    fs.writeFileSync( path.join( dest, name ), concated[ langCode ] )
  } )

}






module.exports = {
  prepare,
  compileAll,
  writeFiles
}