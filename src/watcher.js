const watch = require( 'node-watch' )
const _ = require( 'lodash' )
const files = require( './files' )
const utils = require( './utils' )
const bus = require( './bus' )


const NAME = utils.getName()


class PublicWatcher {

  constructor() {
    this.stop = _.debounce(() => {
      this._stop()
    }, 10 )
  }


  start() {
    this._watcher = watch( files.getPathes(), { recursive: false } )
    this._addListeners()
    this._log( 'started' )
    bus.emit( 'start' )
  }



  _addListeners() {

    const { _watcher: w } = this

    w.on( 'change', ( evt, filePath ) => {
      if ( evt === 'update' ) {
        files.updateOne( filePath )
        bus.emit( 'file:change', { filePath } )
      } else if ( evt === 'remove' ) {
        files.removeOne( filePath )
        bus.emit( 'file:remove', { filePath } )
      } else {
        console.log( filePath, evt )
      }
    } )


    w.on( 'error', err => {
      this._log( 'exited with error' )
      w.close()
      throw err
    } )


    const stop = this.stop.bind( this )

    process.on( 'SIGINT', stop )
    process.on( 'SIGTERM', stop )
    process.on( 'exit', stop )

  }


  on( ...args ) {
    bus.on( ...args )
  }



  _stop() {
    const { _watcher: w } = this
    if ( !w ) {
      return this._log( 'error when stopping. watcher is not initialized' )
    }
    this._watcher.close()
    bus.emit( 'stop' )
    process.exit()
  }


  _log( str ) {
    console.log( `[${NAME}][watcher] ${str}` )
  }

}



function createWatcher() {
  return new PublicWatcher()
}



module.exports = {
  createWatcher
}
