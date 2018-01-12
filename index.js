
const files = require( './src/files' )
const translates = require( './src/translates')
const config = require( './src/conf' )
const watcher = require( './src/watcher' )



function start( configOrPathTo ) {
  build( configOrPathTo )

  watcher.start()
}





function build( configOrPathTo ) {
  console.time( 'BUILD' )
  config.read( configOrPathTo )
  files.prepare()
  translates.prepare()
  files.compileAll()
  files.writeFiles()
  console.timeEnd( 'BUILD' )
}


// start( './demo/config' )
build( './nt/config' )


module.exports = {
  start,
  build
}