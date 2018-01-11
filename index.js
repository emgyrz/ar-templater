
const files = require( './src/files' )
const translates = require( './src/translates')
const config = require( './src/conf' )



function start( configOrPathTo ) {
  config.read( configOrPathTo )
  files.prepare()
  translates.prepare()

  files.compileAll()

  files.writeFiles()

}





function build( configOrPathTo ) {
  config.read( configOrPathTo )
  files.prepare()
  translates.prepare()
  files.compileAll()
  files.writeFiles()
}


start( './demo/config' )


module.exports = {
  start,
  build
}