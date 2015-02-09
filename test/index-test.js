/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq: true,*/
"use strict";

var parts = require('../lib');

module.exports.SimplePattern = function (test) {
    var mods = parts(__dirname).require('./**/*-routes.js');
    test.ok(mods.a);
    test.ok(mods.b);
    test.done();
};

module.exports.RequireWithMapper = function (test) {
    var p = parts(__dirname);
    var mods = p.require('./**/*-routes.js', p.mapper(function (obj) {
        obj.name = obj.name.toUpperCase();
        return obj;
    }));

    test.ok(mods.A);
    test.ok(mods.B);
    test.done();
};
