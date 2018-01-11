const path = require( 'path' )
const { isPlainObject: isObj, isString: isStr} = require( 'lodash' )
const validate = require( './validate' )
const utils = require( '../utils' )



function parse( objOrFilePath ) {
  let config
  if ( isObj( objOrFilePath ) ) {
    config = objOrFilePath
  } else if ( isStr( objOrFilePath ) ) {
    const configPath = path.isAbsolute( objOrFilePath ) ? objOrFilePath : path.join( process.cwd(), objOrFilePath )
    try {
      config = require( configPath )
    } catch( err ) {
      if ( err.code === 'MODULE_NOT_FOUND' ) {
        utils.err( { msg: `Couldn\'t find config in path ${configPath}` } )
      } else {
        throw err
      }
    }
  }

  if ( !isObj( config ) ) {
    utils.err( { msg: `Couldn\'t parse config` } )
  } else {
    return config
  }
}








function setDefaults( obj ) {
  return obj
}




function read( objOrFilePath ) {
  const config = setDefaults( validate( parse( objOrFilePath ) ) )

}


module.exports = {
  read
}



