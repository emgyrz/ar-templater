# AR-templater

AR-templater internationalize your HTML files and compile its to tempate functions if it's need ( with `lodash.template` )


### Installation
As usual via `npm`
```js
npm i ar-templater // -g or -D
```

### Usage


### Configuration options reference

**NOTE** that options `langDir`, `templatesSrc` and `dest` are **required**

| Option         | Type | Description | Default |
|----------------|------|---------|---------|
| **langDir** | string | Specifies the path to find the language definitions | `undefined` |
| **templatesSrc** | string | Pattern for matching to file paths like Unix shell style | `undefined` |
| **dest** | string | The path (output directory) to write files to.  If the directory doesn't exist it will be created | `undefined` |
| templatesInterpolate | regexp | The regular expression used for matching the variables. See more at [lodash docs](https://lodash.com/docs#template) | `/<%=([\s\S]+?)%>/g` |
| translatesInterpolate | regexp | The regular expression used for matching the language tags | `/\$\{\{([\s\S]+?)\}\}\$/g` |
| minify | boolean | Minify HTML code and JS template functions | `false` |
| compareCtime | boolean |  |  |
| htmlminifyOptions | { [ string ]: any } | html-minifier options. See more [here](https://github.com/kangax/html-minifier#options-quick-reference) | `{}` |
| langFallback | string | If some translations of the phrases don't exist it will be used translations from this language | `'en'` |
| customLangFallbacks | { [ string ]: string } | Custom languages fallbacks, for example if this option was setted to `{ be: 'ru' }`, words that is not finded in `be` language will be taken from `ru`  | `{}` |
| varNameModificator | ( filePath: string ) => string | Modify the property name of file content into generated result | `filePath => filePath` |
| output | object | Option to specify output files format and name | {} | 
| output.type | string | The format of the generated files. One of the following `[ 'amd', 'commonjs', 'esm' ]` | `'amd'` |
| output.name | ( langCode: string ) => string | Function that modify file name to write to. By default returns just a language code. The extension (.js) is added automatically | `langCode => langCode` | |





