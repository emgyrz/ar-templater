module.exports = {
  langDir: './demo/lang',
  templatesSrc: './demo/tpls/**/*.html',
  dest: './demo/dest',
  minify: false,
  varNameModificator: filePath => {
    return filePath
      .replace( /.html$/, '' )
      .replace( /.*tpls\//, '' )
  },
  output: {
    type: 'amd',
    name: langCode => `tpl-${langCode}`
  },
}