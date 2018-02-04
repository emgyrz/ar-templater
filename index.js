const files = require( './src/files' )
const translates = require( './src/translates' )
const config = require( './src/conf' )


function createWatcher( configOrPathTo ) {
  build( configOrPathTo )

  return require( './src/watcher' ).createWatcher()
}





function build( configOrPathTo, cb ) {
  config.read( configOrPathTo )
  files.prepare()
  translates.prepare()
  files.compileAll()
  files.writeFiles()

  if ( typeof cb === 'function' ) {
    cb()
  }

}



module.exports = {
  createWatcher,
  build
}