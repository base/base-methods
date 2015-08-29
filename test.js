'use strict';

var assert = require('assert');
var should = require('should');
var Base = require('./');

describe('Base', function () {
  describe('constructor', function () {
    it('should extend the instance when an object is passed:', function () {
      var base = new Base({foo: 'bar'});
      assert(base.foo === 'bar');
    });

    it('should extend the instance when an array of objects is passed:', function () {
      var base = new Base([{foo: 'bar'}, {baz: 'qux'}]);
      assert(base.foo === 'bar');
      assert(base.baz === 'qux');
    });
  });

  describe('static methods', function () {
    it('should expose `.extend` method', function () {
      assert(typeof Base.extend === 'function');
    });

    it('should extend the given Ctor with static methods:', function () {
      function Ctor() {
        Base.call(this);
      }
      Base.extend(Ctor);
      assert(typeof Ctor.extend === 'function');

      function foo() {}
      Ctor.extend(foo);
      assert(typeof foo.extend === 'function');
    });
  });

  describe('prototype methods', function () {
    it('should expose `prototype.set` method', function () {
      assert(typeof Base.prototype.set === 'function');
    });

    it('should expose `prototype.get` method', function () {
      assert(typeof Base.prototype.get === 'function');
    });

    it('should expose `prototype.del` method', function () {
      assert(typeof Base.prototype.del === 'function');
    });

    it('should expose `prototype.visit` method', function () {
      assert(typeof Base.prototype.visit === 'function');
    });

    it('should expose `prototype.define` method', function () {
      assert(typeof Base.prototype.define === 'function');
    });

    it('should add prototype methods to the given Ctor:', function () {
      function Ctor() {
        Base.call(this);
      }
      Base.extend(Ctor);
      assert(typeof Ctor.prototype.set === 'function');
      assert(typeof Ctor.prototype.get === 'function');
      assert(typeof Ctor.prototype.del === 'function');
      assert(typeof Ctor.prototype.visit === 'function');
      assert(typeof Ctor.prototype.define === 'function');

      function foo() {}
      Ctor.extend(foo);
      assert(typeof foo.prototype.set === 'function');
    });
  });
});

/* deps: mocha */
