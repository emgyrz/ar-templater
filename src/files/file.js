const fs = require( 'fs' )
const { isNumber, isString, clone } = require( 'lodash' )
const htmlminifier = require('html-minifier')
const translates = require( '../translates' )
const templates = require( '../templates' )

const conf = require( '../conf' )


class TplFile {

  constructor( filePath ) {
    this.filePath = filePath
    this.variableName = this.getVarName()
    this.contents = null
    this.ctime = null
    this.needMinify = conf.get( 'minify' )
    this.translates = {}
    this.tpls = {}
    this.htmlminifyOptions = clone( conf.get( 'htmlminifyOptions' ) )
  }


  getVarName() {
    const modifyFunc = conf.get( 'varNameModificator' )
    return modifyFunc( this.filePath )
  }



  getCtime() {
    const stat = fs.statSync( this.filePath )
    return stat.ctimeMs
  }



  getTrs( langCode ) {
    return this.translates[ langCode ]
  }


  getTpl( langCode ) {
    return this.tpls[ langCode ]
  }


  read() {
    // need error handler
    this.contents = fs.readFileSync( this.filePath ).toString()
    return this
  }



  changed() {
    if ( !isNumber( this.ctime ) ) return {
      isChanged: true,
      currentCtime: null
    }

    const currentCtime = this.getCtime()
    const isChanged = currentCtime > this.ctime

    return {
      isChanged,
      currentCtime
    }

  }



  htmlminify() {
    return htmlminifier.minify( this.contents, this.htmlminifyOptions )
  }


  translate() {
    this.translates = translates.translate( this.contents )
  }



  compileTpls() {
    translates.langCodes.forEach( langCode => {
      this.tpls[ langCode ] = templates.compile( this.getTrs( langCode ), {
        isPlainTpl: this.isPlainTpl,
        needMinify: this.needMinify
      } )
    } )
  }



  compile( { force } = {} ) {





    const defCompile = () => {

      // console.log('COMPILING', this.filePath)
      if ( this.needMinify ) {
        this.contents = this.htmlminify()
      }

      this.translate()

      this.isPlainTpl = templates.isPlainTpl( this.contents )

      this.compileTpls()
    }

    if ( force === true ) {
      this.read()
      defCompile()
      return
    }

    const changed = this.changed()

    if ( !changed.isChanged ) return

    this.ctime = changed.currentCtime === null ? this.getCtime() : changed.currentCtime

    if ( changed.isChanged || !isString( this.contents ) ) {
      this.read()
    }

    defCompile()

  }


}




module.exports = TplFile

