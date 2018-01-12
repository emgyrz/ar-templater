const fs = require( 'fs' )

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
      myMkdirSync( path.dirname( dir ) )
      myMkdirSync( dir )
    }
  }
}


module.exports = {
  err,
  mkdirSync
}