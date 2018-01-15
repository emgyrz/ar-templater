const fs = require( 'fs' )
const path = require( 'path' )
const glob = require( 'glob' )
const conf = require( '../conf' )
const utils = require( '../utils' )
const TplFile = require( './file' )
const templates = require( '../templates' )
const translates = require( '../translates' )


const files = []


function prepare() {
  const src = conf.get( 'templatesSrc' )
  const tplFiles = glob.sync( src )

  if ( tplFiles.length === 0 ) {
    utils.err( { msg: 'no files to watch in ' + src } )
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

  utils.mkdirSync( dest )

  translates.langCodes.forEach( langCode => {
    const name = nameModifier( langCode ) + '.js'
    fs.writeFileSync( path.join( dest, name ), concated[ langCode ] )
  } )

}



function getPathes() {
  return files.map( file => file.filePath )
}



function findByPath( filePath ) {
  return files.find( file => file.filePath.includes( filePath ) )
}




function updateOne( filePath ) {
  // console.time( 'UPDATE' )
  if ( conf.get( 'compareCtime' ) ) {
    compileAll()
  } else {
    const file = findByPath( filePath )
    if ( !file ) return
    file.compile( { force: true } )
  }

  writeFiles()

  // console.timeEnd( 'UPDATE' )
}





function removeOne( filePath ) {
  const file = findByPath( filePath )
  if ( !file ) return
  const ind = files.indexOf( file )
  if ( ind !== -1 ) {
    files.splice( ind, 1 )
  }
}






module.exports = {
  prepare,
  compileAll,
  writeFiles,
  getPathes,
  updateOne,
  removeOne,
}
