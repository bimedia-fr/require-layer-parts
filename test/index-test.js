/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq: true,*/
"use strict";

var parts = require('../lib');

module.exports.testSimplePattern = function (test) {
    var mods = parts(__dirname).require('./**/*-routes.js');
    test.ok(mods.a);
    test.ok(mods.b);
    test.done();
};
