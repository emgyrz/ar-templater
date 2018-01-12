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
  translatesInterpolate: defForRegexp( 'translatesInterpolate' ),
  minify: {
    msg: 'option minify is not a boolean',
    func: _.isBoolean
  },
  compareCtime: {
    msg: 'compareCtime minify is not a boolean',
    func: _.isBoolean
  },
  htmlminifyOptions: {
    msg: 'htmlminifyOptions is not valid',
    func( val ) {
      return _.isNil( val ) || _.isPlainObject( val )
    }
  },
  langFallback: defForString( 'langFallback' ),
  customLangFallbacks: {
    msg: 'customLangFallbacks is invalid',
    func( val ) {
      // TODO add normal validation
      return _.isPlainObject( val )
    }
  },
  varNameModificator: {
    msg: 'varNameModificator must be a function and return a string',
    func: _.isFunction
  },
  output: {
    msg: '',
    func( val ) {
      if ( _.isNil( val ) ) return true
      if ( !_.isPlainObject( val ) ) {
        this.msg = 'output must be an object'
        return false
      }

      const avaliableTypes = [ 'amd', 'commonjs', 'esm' ]

      if ( val.hasOwnProperty( 'type' ) ) {
        if ( !_.isString( val.type ) || !avaliableTypes.includes( val.type ) ) {
          this.msg = `output.type must be a string and one of [ ${avaliableTypes.join(', ')} ]`
          return false
        }
      }

      if ( val.hasOwnProperty( 'name' )  ) {
        if ( !_.isFunction( val.name ) ) {
          this.msg = `output.name must be a string and return string`
          return false
        }
      }

      return true
    }
  }
}


module.exports = function( opts ) {
  const keys = Object.keys( opts )
  requiredOpts.forEach( optKey => {
    if ( !keys.includes( optKey ) ) {
      utils.err( { msg: `Config error: "${optKey}" must be specified in config` } )
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
