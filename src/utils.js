const fs = require( 'fs' )
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