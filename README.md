# AR-templater

[![NPM](https://nodei.co/npm/ar-templater.png)](https://nodei.co/npm/ar-templater/)
<br/>
<br/>

AR-templater internationalize your HTML files and compile its to tempate functions if it's needed


<br/>

## Installation
As usual via `npm`

<br/>




## Usage

If you use the config file it must be a CommonJS module
<br/>


### Node API

```js
const templater = require( 'ar-templater' )

const arg = './path/to/config/file'
// or
const arg = { langDir: './langs', ... } // configuration object

// to compile all templates
templater.build( arg[, callback ] )

```
or
```js
const templater = require( 'ar-templater' )

const arg = './path/to/config/file'
// or
const arg = { langDir: './langs', ... } // configuration object

// to create watcher for incrementals build. at start it will execute `build` function
const watcher = templater.createWatcher( arg )

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
// watcher also has a `stop` method
// watcher.stop()


```
<br/>


### CLI
```bash
./node_modules/.bin/ar-templater [COMMAND] [ARGS]
```
...or if you install it globally:
```bash
ar-templater [COMMAND] [ARGS]
```
For more information see `ar-templater help`

<br/>


## Configuration options reference

**NOTE** that options `langDir`, `templatesSrc` and `dest` are **required**

| Option         | Type | Description | Default |
|----------------|------|---------|---------|
| **langDir** | `string` | Specifies the path to find the language definitions | `undefined` |
| **templatesSrc** | `string` | Pattern for matching to file paths like Unix shell style. See [node-glob](https://github.com/isaacs/node-glob) | `undefined` |
| **dest** | `string` | The path (output directory) to write files to.  If the directory doesn't exist it will be created | `undefined` |
| templatesInterpolate | `regexp` | The regular expression used for matching the variables. See more at [lodash docs](https://lodash.com/docs#template) | `/<%=([\s\S]+?)%>/g` |
| translatesInterpolate | `regexp` | The regular expression used for matching the language tags | `/\$\{\{([\s\S]+?)\}\}\$/g` |
| minify | `boolean` | Minify HTML code and JS template functions | `false` |
| compareCtime | `boolean` |  | `false` |
| htmlminifyOptions | `{ [ string ]: any }` | html-minifier options. See more [here](https://github.com/kangax/html-minifier#options-quick-reference) | `{}` |
| langFallback | `string` | If some translations of the phrases don't exist it will be used translations from this language | `'en'` |
| customLangFallbacks | `{ [ string ]: string }` | Custom languages fallbacks, for example if this option was setted to `{ be: 'ru' }`, words that is not finded in `be` language will be taken from `ru`  | `{}` |
| varNameModificator | `( filePath: string ) => string` | Modifies the property name of file content in generated result | `filePath => filePath` |
| output | `object` | Option to specify output files format and name | `{}` |
| output.type | `string` | The format of the generated files. One of the following `[ 'amd', 'commonjs', 'esm' ]` | `'amd'` |
| output.name | `( langCode: string ) => string` | Function that modifies file name to write to. By default it returns just a language code. The extension (.js) is added automatically | `langCode => langCode` |
| langsFilter | `object` | Filters languages to compile. Helpful for development| `{}` |
| langsFilter.excludes | `Array<string>` | Excludes languages. this parameter has a higher priority than `includes` | `[]` |
| langsFilter.includes | `Array<string>` | Includes languages | `[]` |  |


<br/>




## Reasons for creating
Due to some circumstances in our project we used `gulp` and a few plugins to it (let their names remain a secret) to build the templates. With the increase of the code base the compilation of only the templates became slower and slower. And breaking dependencies made more and more discontent while I upgraded packages. In the end I had to write something else. The problem with the dependencies naturally was resolved. And the acceleration of the compilation speed has been a pleasant surprise. Naked stats:

In the project:
- 167 template files
- ~5500 lines of code in this files
- 17 languages

The compilation speed before:
- on init - ~37 seconds
- incremental - ~1.2 seconds

The compilation speed during using this package:
- on init - ~0.7sec ( ~4 sec with `minify` option)
- incremental - 0.2 seconds

<br/>


## Example

##### languge definitions
```js
// ./langs/en/main.js
module.exports = {
  nameDescription: 'This is the item name',
  hello: 'Hello!'
}

// ./langs/de/main.js
module.exports = {
  nameDescription: 'Dies ist der name',
  hello: 'Hallo!'
}

// ./langs/ru/main.js
module.exports = {
  nameDescription: 'Это имя элемента',
  hello: 'Привет!'
}


```

##### input
```xml
<!-- ./tpls/tpl.html -->
<li>
  <span title="${{ main.nameDescription }}$"><%= name %></span>
  <span><%= price %></span>
</li>

<!-- ./tpls/plain.html -->
<h1>${{ main.hello }}$</h1>

```



##### config
```js
module.exports = {
  langDir: './langs',
  templatesSrc: './tpls/**/*.html'
  dest: './dest',
  minify: false,
  output: {
    type: 'esm',
    name: langCode => `my-template-${langCode}`
  }

}

```




##### output
```js
// ./dest/my-template-en.js
export default {
  "tpls/tpl.html": function(obj){
    var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
    with(obj||{}){
    __p+='<li>   <span title=\"This is the item name\">'+
    ((__t=( name ))==null?'':__t)+
    '</span>   <span>'+
    ((__t=( price ))==null?'':__t)+
    '</span> </li>';
    }
    return __p;
  },

  "tpls/plain.html": '<h1>Hello!</h1>'
}


// ./dest/my-template-de.js
export default {
  "tpls/tpl.html": function(obj){
    var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
    with(obj||{}){
    __p+='<li>   <span title=\"Dies ist der name\">'+
    ((__t=( name ))==null?'':__t)+
    '</span>   <span>'+
    ((__t=( price ))==null?'':__t)+
    '</span> </li>';
    }
    return __p;
  },

  "tpls/plain.html": '<h1>Hallo!</h1>'
}



// ./dest/my-template-ru.js
export default {
  "tpls/tpl.html": function(obj){
    var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
    with(obj||{}){
    __p+='<li>   <span title=\"Это имя элемента\">'+
    ((__t=( name ))==null?'':__t)+
    '</span>   <span>'+
    ((__t=( price ))==null?'':__t)+
    '</span> </li>';
    }
    return __p;
  },

  "tpls/plain.html": '<h1>Привет!</h1>'
}



```




## Demo

```
npm run test
```

Demo is located at `./demo` directory




