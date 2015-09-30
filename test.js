'use strict';

require('mocha');
require('should');
var assert = require('assert');
var Base = require('./');
var base;

describe('constructor', function () {
  it('should return an instance of Base:', function () {
    var base = new Base();
    assert(base instanceof Base);
  });

  it('should return an instance of Base without new:', function () {
    var base = Base();
    assert(base instanceof Base);
  });

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

describe('extend prototype methods', function () {
  it('should extend the prototype of the given Ctor:', function () {
    function Ctor() {
      Base.call(this);
    }
    Base.extend(Ctor);
    assert(typeof Ctor.extend === 'function');

    var ctor = new Ctor();
    assert(typeof ctor.set === 'function');
    assert(typeof ctor.get === 'function');
  });

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

describe('static methods', function () {
  beforeEach(function () {
    base = new Base();
  });

  describe('extend', function () {
    it('should set the extend method on the given object:', function () {
      function Ctor() {}
      Base.extend(Ctor);
      assert(typeof Ctor.extend === 'function');
    });
  });
});

describe('prototype methods', function () {
  beforeEach(function () {
    base = new Base();
  });

  describe('set', function () {
    it('should set a key-value pair on the instance:', function () {
      base.set('foo', 'bar');
      assert(base.foo === 'bar');
    });

    it('should set an object on the instance:', function () {
      base.set({a: 'b'});
      assert(base.a === 'b');
    });
  });

  describe('get', function () {
    it('should get a property from the instance:', function () {
      base.set({a: 'b'});
      assert(base.get('a') === 'b');
    });
  });

  describe('get', function () {
    it('should visit an object with the given method:', function () {
      base.visit('set', {a: 'b', c: 'd'});
      assert(base.get('a') === 'b');
      assert(base.get('c') === 'd');
    });
    it('should visit an array with the given method:', function () {
      base.visit('set', [{a: 'b', c: 'd'}]);
      assert(base.get('a') === 'b');
      assert(base.get('c') === 'd');
    });
  });

  describe('del', function () {
    it('should remove a property:', function () {
      base.set({a: 'b'});
      assert(base.a === 'b');
      base.del('a');
      assert(typeof base.a === 'undefined');
    });

    it('should remove an array of properties:', function () {
      base.set({a: 'a'});
      base.set({b: 'b'});
      assert(base.a === 'a');
      assert(base.b === 'b');
      base.del(['a', 'b']);
      assert(typeof base.a === 'undefined');
      assert(typeof base.b === 'undefined');
    });
  });
});


describe('namespaces', function () {
  describe('constructor', function () {
    it('should expose `create`', function () {
      assert(typeof Base.create === 'function');
    });

    it('should extend the given Ctor with static methods:', function () {
      var Foo = Base.create('cache');
      function Ctor() {
        Foo.call(this);
      }
      Foo.extend(Ctor);
      assert(typeof Ctor.extend === 'function');

      function foo() {}
      Ctor.extend(foo);
      assert(typeof foo.extend === 'function');
    });
  });

  describe('prototype methods', function () {
    beforeEach(function () {
      var Custom = Base.create('cache');
      base = new Custom();
    });

    describe('set', function () {
      it('should set a key-value pair on the instance:', function () {
        base.set('foo', 'bar');
        assert(base.cache.foo === 'bar');
      });

      it('should set an object on the instance:', function () {
        base.set({a: 'b'});
        assert(base.cache.a === 'b');
      });
    });

    describe('get', function () {
      it('should get a property from the instance:', function () {
        base.set({a: 'b'});
        assert(base.get('a') === 'b');
      });
    });

    describe('get', function () {
      it('should visit an object with the given method:', function () {
        base.visit('set', {a: 'b', c: 'd'});
        assert(base.get('a') === 'b');
        assert(base.get('c') === 'd');
      });
      it('should visit an array with the given method:', function () {
        base.visit('set', [{a: 'b', c: 'd'}]);
        assert(base.get('a') === 'b');
        assert(base.get('c') === 'd');
      });
    });

    describe('del', function () {
      it('should remove a property:', function () {
        base.set({a: 'b'});
        assert(base.cache.a === 'b');
        base.del('a');
        assert(typeof base.cache.a === 'undefined');
      });

      it('should remove an array of properties:', function () {
        base.set({a: 'a'});
        base.set({b: 'b'});
        assert(base.cache.a === 'a');
        assert(base.cache.b === 'b');
        base.del(['a', 'b']);
        assert(typeof base.cache.a === 'undefined');
        assert(typeof base.cache.b === 'undefined');
      });
    });
  });
});

describe('events', function () {
  it('should emit and listen for events:', function (done) {
    var base = new Base();
    base.on('foo', function (val) {
      assert(val === 'bar');
      done();
    })
    base.emit('foo', 'bar');
  });
});
