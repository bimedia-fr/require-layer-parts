/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq: true,*/

"use strict";

var glob = require('glob');
var path = require('path');

function identity(o) {
    return o;
}

function buildNameMapper(pattern) {
    // /\/(\w+)Repo\.js$/
    var namep = pattern.split('/').pop().replace('*', '(\\w+)');
    var regexp = new RegExp(namep);

    return function namemapper(file) {
        return file.match(regexp)[1];
    };
}

module.exports = function (options) {

    var opts = options  || {};
    //opts.cwd = opts.cwd ||  __dirname;

    function _require(pattern, mapper) {
        var _map = mapper || identity;
        var nameMapper = opts.nameMapper || buildNameMapper(pattern);

        return glob.sync(pattern, opts).map(function (file) {
            var resolved = path.resolve(process.cwd(), file.replace('.js', ''));
            console.log(resolved);
            return {
                file: file,
                mod: _map(require(resolved))
            };
        }).reduce(function (prev, curr) {
            var name = nameMapper(curr.file);
            if (opts.failDups && prev[name]) {
                throw new Error(name + "Already defined (" + curr.file + ")");
            }
            prev[name] = curr.mod;
            return prev;
        }, {});
    }

    return {
        require: _require
    };
};
