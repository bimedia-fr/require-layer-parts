/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq: true,*/
var assert = require('assert');
var parts = require('../lib');


var mods = parts(__dirname).require('./**/*-routes.js');
console.log(mods);
assert.ok(mods.a);
assert.ok(mods.b);
