const _ = require( 'lodash' )
const utils = require( '../utils' )

const requiredOpts = [ 'langDir', 'templatesSrc', 'dest' ]


const defForString = name => ( {
  msg: name + ' must be a valid string',
  func: _.isString
} )

const defForRegexp = name => ( {
  msg: name + ' must be a valid regular expression',
  func: _.isRegExp
} )


const validators = {
  langDir: defForString( 'langDir' ),
  templatesSrc: defForString( 'templatesSrc' ),
  dest: defForString( 'dest' ),
  templatesInterpolate: defForRegexp( 'templatesInterpolate' ),
  translatesInterpolate: defForRegexp( 'translatesInterpolate' )
}


module.exports = function( opts ) {
  const keys = Object.keys( opts )
  requiredOpts.forEach( optKey => {
    if ( !keys.includes( optKey ) ) {
      utils.err( { msg: `"${optKey}" must be specified in config` } )
    }
  } )

  keys.forEach( key => {
    const val = opts[ key ]
    const validator = validators[ key ]

    if ( !validator.func( val ) ) {
      utils.err( { msg: validator.msg } )
    }
  } )

  return opts
}
