let parts = require('../lib');
let assert = require('assert');


describe('require-layer-parts', () => {
    describe('single pattern', () => {
        it('should require both files', (done) => {
            var mods = parts(__dirname).require('./**/*-routes.js');
            assert.ok(mods.a);
            assert.ok(mods.b);
            done();
        });
    });

    describe('require with mapper', () => {
        it('should require both files and map result', (done) => {
            let p = parts(__dirname);
            var mods = p.require('./**/*-routes.js', p.mapper(function (obj) {
                obj.name = obj.name.toUpperCase();
                return obj;
            }));
        
            assert.ok(mods.A);
            assert.ok(mods.B);
            done();
        });
    });

    describe('require with init', () => {
        it('should require files and call init function', (done) => {
            var p = parts(__dirname);
            var mods = p.requireInit('./**/*-routes.js', function (obj) {
                return obj.url;
            });
        
            assert.equal(mods.a, 'a/a-routes');
            assert.equal(mods.b, 'b/b-routes');
            done();
        });
    })
});

// module.exports.RequireWithMapper = function (test) {
// };


// module.exports.RequireInit = function (test) {
// };
