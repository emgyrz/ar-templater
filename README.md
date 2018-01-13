#AR-templater

AR-templater internationalize your HTML files and compile its to tempate functions if it's need ( with `lodash.template` )


### Installation
As usual via `npm`
```js
npm i ar-templater // -g -D
```

### Usage


### Configuration options reference

Most of the options are disabled by default.

| Option         | Type | Description | Default |
|----------------|------|---------|---------|
| langDir | string | Specifies the path to find definitions | `undefined` |
| templatesSrc | string | Patter for matching file paths against Unix shell style | `undefined` |
| dest | string | The path (output folder) to write files to.  If directory doesn't exist it will be created | `undefined` |
| templatesInterpolate | regexp | The regular expression used for matching the varible tags. See more at [lodash docs](https://lodash.com/docs#template) | `/<%=([\s\S]+?)%>/g` |
| translatesInterpolate | regexp | The regular expression used for matching the language tags | `/\$\{\{([\s\S]+?)\}\}\$/g` |
| minify | boolean | Minify HTML code and JS tempalte functions | `false` |
| compareCtime | boolean |  |  |
| htmlminifyOptions | { [ string ]: any } | html-minifier options. See more [here](https://github.com/kangax/html-minifier#options-quick-reference) | `{}` |
| langFallback | string | If translate for language is not exist it will be uses translate from this language | `'en'` |
| customLangFallbacks | { [ string ]: string } | Custom languages fallbacks, for example if option was setted to `{ be: 'ru' }`, words that not finded in `be` language wiil be taken from `ru`  | `{}` |
| varNameModificator | ( filePath: string ) => string |  |  |
| output | object |  |  | 
| output.type | string |  |  |
| output.name | ( langCode: string ) => string |  |  | |





