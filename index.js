const files = require( './src/files' )
const translates = require( './src/translates' )
const config = require( './src/conf' )
const watcher = require( './src/watcher' )



function start( configOrPathTo ) {
  build( configOrPathTo )

  watcher.start()
}





function build( configOrPathTo ) {
  config.read( configOrPathTo )
  files.prepare()
  translates.prepare()
  files.compileAll()
  files.writeFiles()
}



module.exports = {
  start,
  build
}