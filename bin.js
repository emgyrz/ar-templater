#! /usr/bin/env node

const templater = require( './index.js' )

const argv = process.argv

const avaliableCommands = {
  help: argv.includes( 'help' ),
  start: argv.includes( 'start' ),
  build: argv.includes( 'build' )
}


const commands = Object.keys( avaliableCommands ).filter( key => avaliableCommands[ key ] )

if ( commands.length > 1 ) {
  log( 'ERR: too much commands\nSee help' )
  return
} else if ( commands.length === 0 ) {
  log( 'ERR: do you specify command?!\nSee help' )
  return
}

const command = commands[ 0 ]

if ( command === 'help' ) {
  showHelp()
  return
}

const cfg = findCfg()
if ( cfg === null ) return



switch ( command ) {
  case 'start':
    templater.start( cfg )
    break
  case 'build':
    templater.build( cfg )
    break
}



function findCfg() {
  let pathToConfig = ''

  const fullRegexp = /^\-\-config=/
  const minRegexp = /^\-c$/
  const full = argv.find( arg => fullRegexp.test( arg ) )
  if ( full ) {
    pathToConfig = full.replace( fullRegexp, '' )
  } else {
    const minIndex = argv.findIndex( arg => minRegexp.test( arg ) )
    if ( minIndex !== -1 ) {
      pathToConfig = argv[ minIndex + 1]
    }
  }

  if ( !pathToConfig ) {
    log( 'ERR: you must specify path to configuration file\nSee help' )
    return null
  } else {
    return pathToConfig
  }

}


function log( str ) {
  console.log( str )
}

function showHelp() {
  log( 'AR-templater\n' )

  log( 'Usage: ar-templater [COMMAND] [ARGS] \n' )

  log( 'Valid values for COMMAND:' )
  log( '  build  -  compiles tempates' )
  log( '  start  -  compiles tempates, then starts watcher for incremental builds' )
  log( '  help   -  show this help' )

  log( '\nValid values for ARGS:' )
  log( '  -c, --config=PATH   -  path to configuration file' )
  log( '\nSee more at https://github.com/emgyrz/ar-templater' )
}



