
const _ = require( 'lodash' )

module.exports = {
  templatesInterpolate: /<%=([\s\S]+?)%>/g,
  translatesInterpolate: /\$\{\{([\s\S]+?)\}\}\$/g
}