const conf = require( '../conf' )



const sides = {
  amd: [ 'define({', '})' ],
  commonjs: [ 'module.exports={', '}' ],
  esm: [ 'export default {', '}' ]
}



module.exports = function( contents ) {

  const { type } = conf.get( 'output' )

  let res = []

  contents.forEach( cont => {
    let { key, value } = cont
    res.push( `"${key}":${value}` )
  } )

  const [ start, end ] = sides[ type ]

  return start + res.join( ',' ) + end
}