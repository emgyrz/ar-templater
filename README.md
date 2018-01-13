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

If you use config file it must be a CommonJS module

### Node API

```js
const templater = require( 'ar-templater' )

const arg = './path/to/config/file'
// or 
const arg = { langDir: './langs', ... } // configuration object


templater.build( arg ) // to compile all templates
// or
templater.start( arg ) // to start watcher for incrementals build. at start it will execute `build` function




```

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
| varNameModificator | `( filePath: string ) => string` | Modify the property name of file content into generated result | `filePath => filePath` |
| output | `object` | Option to specify output files format and name | `{}` | 
| output.type | `string` | The format of the generated files. One of the following `[ 'amd', 'commonjs', 'esm' ]` | `'amd'` |
| output.name | `( langCode: string ) => string` | Function that modify file name to write to. By default returns just a language code. The extension (.js) is added automatically | `langCode => langCode` | |

<br/>




## Reasons for creating
Due to some circumstances in our project to build the templates we used `gulp` and a few plugins to it (which names remain secret). With the increase of the code base the compilation only templates become slower and slower and breaking dependencies when upgrading packages delivered more and more discontent. In the end I had to write something. The problem with the dependencies, of course, resolved. But the acceleration of the compilation speed was a pleasant surprise. Naked stats:

In the project:
- 167 template files
- ~5500 lines of code in this files

The compilation speed before:
- on init - ~37 seconds
- incremental - ~1.2 seconds

The compilation speed when using this package:
- on init - ~4 seconds
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

Demo locates at `./demo` directory




