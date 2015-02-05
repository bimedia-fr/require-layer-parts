/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq: true,*/

"use strict";

var glob = require('glob');
var path = require('path');

function buildNameMapper(pattern) {
    // /\/(\w+)Repo\.js$/
    var namep = pattern.split('/').pop().replace('*', '(\\w+)');
    var regexp = new RegExp(namep);

    return function namemapper(file) {
        return file.match(regexp)[1];
    };
}

module.exports = function (options) {

    if (typeof options === 'string') {
        options = {cwd: options};
    }

    var opts = options  || {};

    opts.cwd = opts.cwd ||  process.cwd();

    function defaultReducer(map) {
        return function (prev, curr) {
            curr = map ? map(curr) : curr;
            var name = curr.name;
            if (opts.failDups && prev[name]) {
                throw new Error(name + "Already defined (" + curr.file + ")");
            }
            prev[name] = curr.mod;
            return prev;
        };
    }

    function _require(pattern, reducer) {
        var nameMapper = opts.nameMapper || buildNameMapper(pattern);

        return glob.sync(pattern, opts).map(function (file) {
            var resolved = path.resolve(opts.cwd, file.replace('.js', ''));
            return {
                file: file,
                name: nameMapper(file),
                mod: require(resolved)
            };
        }).reduce(reducer || defaultReducer(), {});
    }

    return {
        require: _require,
        mapper : defaultReducer
    };
};
