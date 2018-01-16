const fs = require( 'fs' )
const path = require( 'path' )
const { name: NAME } = require( '../package.json' )


function err( { msg } ) {
  throw new Error( msg )
}



function mkdirSync( dir ) {

  if ( fs.existsSync( dir ) ) {
    return
  }

  try {
    fs.mkdirSync( dir )
  } catch ( err ) {
    if ( err.code == 'ENOENT' ) {
      mkdirSync( path.dirname( dir ) )
      mkdirSync( dir )
    } else {
      throw err
    }
  }
}





function getName() {
  return NAME
}




module.exports = {
  err,
  mkdirSync,
  getName
}