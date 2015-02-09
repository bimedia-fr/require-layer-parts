# require-layer-parts
Node module to require multiples files based on a pattern.

This module helps to require multiples files at once based on a naming convention.

## installation 
```bash
npm install require-layer-parts
```


## Usage

Example

Given the following files :
```
routes/
 |-- a-routes.js
 |-- b-routes.js
 |-- c-routes.js
 `-- some-ugly-helper.js
index.js
```

Now require every files that matches `-routes.js` to build your routes layer.

```js
var parts = require('require-layer-parts')();

parts.require('./**/*-routes.js');

//--> {a:[Function], b:[Function], c:[Function]}
```

## API

### parts

Create an object than can require files with a glob pattern. 


```js
var parts = require('require-layer-parts')(__dirname);

parts.require('./**/*-routes.js');

//--> {a:[Function], b:[Function], c:[Function]}
```

#### Options
* `cwd` : (string) glob search base path default is `process.cwd()`
* `failDups` : (boolean) fail if an export is already defined.
* `nameMapper` : function to create an export name from the required filename.

### require

Search for files matching a pattern and require it.


```js
var parts = require('require-layer-parts')(__dirname);

parts.require('./**/*-routes.js');

//--> {a:[Function], b:[Function], c:[Function]}
```

#### parameters
* `string` glob search pattern
* `reducer` : optional reduce function to be applied on each element.


### mapper

Builds a reducer that apply a mapper on each require.

```js
var parts = require('require-layer-parts')(__dirname);

parts.require('./**/*-routes.js', parts.mapper(function (obj) { return obj.name}));

//--> {a:'a', b:'b', c:'c'}
```

#### parameters
* `function` : a function that take an object with following properties:
 * `file` : the absolute file name
 * `name` : the name of the property on the resulting object as evaluated by the default namemapper.
 * `mod` : the result of requiring the corresponding file.
 
 
### requireInit

Much like require but it enables to map required module.


```js
var parts = require('require-layer-parts')(__dirname);

parts.requireInit('./**/*-routes.js', function (mod) {
    return mod();
});

//--> {a:{}, b:{}, c:{}}
```
* `string` glob search pattern
* `mapper` : map function to be applied on each element module.
 
#### parameters
* `string` glob search pattern
* `reducer` : optional reduce function to be applied on each element.
 