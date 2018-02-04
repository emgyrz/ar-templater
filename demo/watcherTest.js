const templater = require( '../' )

const watcher = templater.createWatcher( './demo/config' )

watcher.on( 'start', function() {
  console.log( 'start event triggered' )
} )

watcher.on( 'stop', function() {
  console.log( 'stop  event triggered' )
} )

watcher.on( 'file:change', function( { filePath } ) {
  console.log( 'file changed - ', filePath )
} )

watcher.on( 'file:remove', function( { filePath } ) {
  console.log( 'file removed - ', filePath )
} )

watcher.start()
