const { defaults: extendDefaults, isPlainObject } = require( 'lodash' )


const defaults = {
  templatesInterpolate: /<%=([\s\S]+?)%>/g,
  translatesInterpolate: /\$\{\{([\s\S]+?)\}\}\$/g,
  minify: false,
  htmlminifyOptions: {
    collapseWhitespace: true,
    removeComments: true
  },
  langFallback: 'en',
  customLangFallbacks: {},
  varNameModificator: varName => varName,
  output: {
    type: 'amd',
    name: langCode => langCode
  },
  compareCtime: false
}






function extend( obj ) {

  obj.output = !isPlainObject( obj.output ) ? defaults.output : obj.output

  const out = obj.output

  if ( !out.hasOwnProperty( 'type' ) ) {
    out.type = defaults.output.type
  }

  if ( !out.hasOwnProperty( 'name' ) ) {
    out.name = defaults.output.name
  }

  return extendDefaults( obj, defaults )
}





module.exports = {
  extend
}