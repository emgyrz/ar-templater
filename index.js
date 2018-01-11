
const files = require( './src/files' )
const translates = require( './src/translates')
const config = require( './src/conf' )



function start( configOrPathTo ) {
  config.read( configOrPathTo )

}





function build( configOrPathTo ) {
  config.read( configOrPathTo )

}


start( './demo/config' )


module.exports = {
  start,
  build
}