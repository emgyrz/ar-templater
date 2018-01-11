module.exports = {
  langDir: './demo/lang',
  templatesSrc: './demo/tpls/**/*.html',
  dest: '.tmp',
  minify: true,
  varNameModificator: filePath => {
    return filePath
      .replace( /.html$/, '' )
      .replace( /.*tpls\//, '' )
  },
  output: {
    type: 'commonjs'
  },
}