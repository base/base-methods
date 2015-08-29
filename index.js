'use strict';

var util = require('util');
var set = require('set-value');
var get = require('get-value');
var del = require('unset-value');
var define = require('define-property');

/**
 * Create an instance of `Base` with optional `options`.
 *
 * ```js
 * var app = new Base();
 * app.set('foo', 'bar');
 * console.log(app.get('foo'));
 * //=> 'bar'
 * ```
 *
 * @param {Object} `options`
 * @api public
 */

function Base(options) {
  if (!(this instanceof Base)) {
    return new Base(options);
  }
  if (typeof options === 'object') {
    this.visit('set', options);
  }
}

Base.prototype = {
  constructor: Base,

  /**
   * Assign `value` to `key`.
   *
   * ```js
   * app.set(key, value);
   *
   * // also takes an object or array
   * app.set({name: 'Halle'});
   * app.set([{foo: 'bar'}, {baz: 'quux'}]);
   * console.log(app);
   * //=> {name: 'Halle', foo: 'bar', baz: 'quux'}
   * ```
   *
   * @name .set
   * @param {String} `key`
   * @param {*} `value`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  set: function (key, value) {
    if (typeof key === 'object') {
      this.visit('set', key, value);
    } else {
      set(this, key, value);
    }
    return this;
  },

  /**
   * Return the stored value of `key`. Dot notation may be used
   * to get [nested property values][get-value].
   *
   * ```js
   * app.set('foo', 'bar');
   * app.get('foo');
   * // => "bar"
   * ```
   *
   * @name .get
   * @param {*} `key`
   * @param {Boolean} `escape`
   * @return {*}
   * @api public
   */

  get: function (key) {
    return get(this, key);
  },

  /**
   * Delete `key` from the instance.
   *
   * ```js
   * app.del(); // delete all
   * // or
   * app.del('foo');
   * // or
   * app.del(['foo', 'bar']);
   * ```
   * @name .del
   * @param {String} `key`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  del: function (key) {
    if (typeof key === 'object') {
      this.visit('del', key);
    } else {
      del(this, key);
    }
    return this;
  },

  /**
   * Define a non-enumerable property on the instance.
   *
   * ```js
   * // arbitrary `render` function using lodash `template`
   * define('render', function(str, locals) {
   *   return _.template(str)(locals);
   * });
   * ```
   * @name .define
   * @param {String} `key`
   * @param {any} `value`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  define: function (key, value) {
    define(this, key, value);
    return this;
  },

  /**
   * Visit `method` over the items in the given object, or map
   * visit over the objects in an array.
   *
   * @name .visit
   * @param {String} `method`
   * @param {Object|Array} `val`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  visit: function (method, val) {
    if (Array.isArray(val)) {
      return val.forEach(this.visit.bind(this, method));
    }
    for (var key in val) this[method](key, val[key]);
    return this;
  }
};

/**
 * Static method for inheriting both the prototype and
 * static methods of the `Base` class.
 *
 * ```js
 * function MyApp(options) {
 *   Base.call(this, options);
 * }
 * Base.extend(MyApp);
 *
 *
 * // Optionally pass another object to extend onto `MyApp`
 * function MyApp(options) {
 *   Base.call(this, options);
 *   Foo.call(this, options);
 * }
 * Base.extend(MyApp, Foo.prototype);
 * ```
 *
 * @param {Function} `Ctor` The constructor to extend.
 * @api public
 */

Base.extend = function (Ctor, proto) {
  util.inherits(Ctor, Base);
  for (var key in Base) {
    Ctor[key] = Base[key];
  }

  if (typeof proto === 'object') {
    var obj = Object.create(proto);

    for (var k in obj) {
      Ctor.prototype[k] = obj[k];
    }
  }
};

/**
 * Expose `Base`
 */

module.exports = Base;
