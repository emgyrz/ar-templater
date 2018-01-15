const watch = require( 'node-watch' )
const files = require( './files' )
const utils = require( './utils' )
const bus = require( './bus' )


const NAME = utils.getName()



class PublicWatcher {

  constructor( watcher ) {
    this._watcher = watcher
    this._addListeners()

    this._log( 'started' )
  }



  _addListeners() {

    const { _watcher: w } = this

    w.on( 'change', ( evt, filePath ) => {
      if ( evt === 'update' ) {
        files.updateOne( filePath )
        bus.emit( 'file:change', { event: evt, filePath } )
      } else if ( evt === 'remove' ) {
        files.removeOne( filePath )
        bus.emit( 'file:remove', { event: evt, filePath } )
      } else {
        console.log( filePath, evt )
      }
    } )


    const stop = () => {
      this._log( 'close' )
      w.close()
    }


    w.on( 'error', err => {
      this._log( 'exited with error' )
      w.close()
      throw err
    } )

    process.on( 'SIGINT', stop )
    process.on( 'SIGTERM', stop )
    process.on( 'exit', stop )

  }


  on( ...args ) {
    bus.on( ...args )
  }



  stop() {
    this._watcher.close()
  }


  _log( str ) {
    console.log( `[${NAME}][watcher] ${str}` )
  }

}






function start() {

  const watcher = watch( files.getPathes(), { recursive: false } )

  return new PublicWatcher( watcher )
}






module.exports = {
  start
}