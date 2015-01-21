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
routes
 |-- a-routes.js
 |-- b-routes.js
 |-- c-routes.js
 `-- some-ugly-helper.js
index.js
```

Now require every files that matches `-routes.js` to build your routes layer.

```js
var parts = require('require-layer-parts');

parts('./**/*-routes.js')
//--> {a:[Function], b:[Function], c:[Function]}
```
