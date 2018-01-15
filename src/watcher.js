const files = require( './files' )
const watch = require( 'node-watch' )


function start() {

  const watcher = watch( files.getPathes(), { recursive: false } )

  watcher.on( 'change', ( evt, filePath ) => {
    if ( evt === 'update' ) {
      files.updateOne( filePath )
    } else if ( evt === 'remove' ) {
      files.removeOne( filePath )
    } else {
      console.log( filePath, evt )
    }
  } )


  watcher.on( 'error', err => {
    console.log( "err", err )
    watcher.close()
  } )

}



module.exports = {
  start
}