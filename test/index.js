'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var pickValues = require('../');

lab.experiment('pick-values', function(){

  var obj = {
    test1: true,
    test2: 1234,
    hello: 'world'
  };

  lab.test('picks all values from an object', function(done){
    var result = pickValues(obj, ['test1', 'test2', 'hello']);
    code.expect(result).to.deep.equal([true, 1234, 'world']);
    done();
  });

  lab.test('only picks specified values', function(done){
    var result = pickValues(obj, ['test1', 'hello']);
    code.expect(result).to.deep.equal([true, 'world']);
    done();
  });

  lab.test('maintains order of keys', function(done){
    var result = pickValues(obj, ['hello', 'test2']);
    code.expect(result).to.deep.equal(['world', 1234]);
    done();
  });

  lab.test('can pick the same key more than once', function(done){
    var result = pickValues(obj, ['hello', 'hello']);
    code.expect(result).to.deep.equal(['world', 'world']);
    done();
  });

  lab.test('supports a single key (no array)', function(done){
    var result = pickValues(obj, 'hello');
    code.expect(result).to.deep.equal(['world']);
    done();
  });
});
