
const PluginError = require( 'plugin-error' )
const PLUGIN_NAME = require( '../package.json' ).name


module.exports = function( ...args ) {
  return new PluginError( PLUGIN_NAME, ...args )
}

