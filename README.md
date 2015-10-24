# base-methods [![NPM version](https://badge.fury.io/js/base-methods.svg)](http://badge.fury.io/js/base-methods)

> Starter for creating a node.js application with a handful of common methods, like `set`, `get`, and `del`.

Great way to start building a highly modular, unit testable and [pluggable](#plugins) node.js application!

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i base-methods --save
```

## Usage

```js
var Base = require('base-methods');
```

**inherit**

```js
function Foo() {
  Base.call(this);
}
Base.extend(Foo);
```

**instantiate**

```js
var base = new Base();
base.set('foo', 'bar');
console.log(base.foo);
//=> 'bar'
```

**Inherit or instantiate with a namespace**

A `.create()` method is exposed on the exported function to allow you to create a custom namespace for setting/getting on the instance.

```js
var Base = require('base-methods').create('cache');
var base = new Base();
base.set('foo', 'bar');
console.log(base.cache.foo);
//=> 'bar'
```

## API

### [Base](index.js#L21)

Create an instance of `Base` with `options`.

**Params**

* `options` **{Object}**

**Example**

```js
var app = new Base();
app.set('foo', 'bar');
console.log(app.get('foo'));
//=> 'bar'
```

### [.use](index.js#L66)

Define a plugin function to be called immediately upon init. Plugins are chainable and the only parameter exposed to the plugin is the application instance.

**Params**

* `fn` **{Function}**: plugin function to call
* `returns` **{Object}**: Returns the item instance for chaining.

**Example**

```js
var app = new Base()
  .use(foo)
  .use(bar)
  .use(baz)
```

### [.set](index.js#L96)

Assign `value` to `key`. Also emits `set` with the key and value.

**Params**

* `key` **{String}**
* `value` **{any}**
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
app.on('set', function(key, val) {
  // do something when `set` is emitted
});

app.set(key, value);

// also takes an object or array
app.set({name: 'Halle'});
app.set([{foo: 'bar'}, {baz: 'quux'}]);
console.log(app);
//=> {name: 'Halle', foo: 'bar', baz: 'quux'}
```

### [.get](index.js#L122)

Return the stored value of `key`. Dot notation may be used to get [nested property values][get-value].

**Params**

* `key` **{any}**
* `returns` **{any}**

**Example**

```js
app.set('foo', 'bar');
app.get('foo');
//=> "bar"
```

### [.has](index.js#L147)

Return true if app has a stored value for `key`, false only if `typeof` value is `undefined`.

**Params**

* `key` **{any}**
* `returns` **{any}**

**Example**

```js
app.set('foo', 'bar');
app.has('foo');
//=> true
```

### [.del](index.js#L174)

Delete `key` from the instance. Also emits `del` with the key of the deleted item.

**Params**

* `key` **{String}**
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
app.del(); // delete all
// or
app.del('foo');
// or
app.del(['foo', 'bar']);
```

### [.define](index.js#L200)

Define a non-enumerable property on the instance.

**Params**

* `key` **{String}**
* `value` **{any}**
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
// arbitrary `render` function using lodash `template`
define('render', function(str, locals) {
  return _.template(str)(locals);
});
```

### [.visit](index.js#L216)

Visit `method` over the items in the given object, or map
visit over the objects in an array.

**Params**

* `method` **{String}**
* `val` **{Object|Array}**
* `returns` **{Object}**: Returns the instance for chaining.

### [.mixin](index.js#L234)

Mix property `key` onto the Base prototype. If base-methods
is inherited using `Base.extend` this method will be overridden
by a new `mixin` method that will only add properties to the
prototype of the inheriting application.

**Params**

* `key` **{String}**
* `val` **{Object|Array}**
* `returns` **{Object}**: Returns the instance for chaining.

### [.extend](index.js#L248)

Static method for inheriting both the prototype and
static methods of the `Base` class. See [class-utils][]
for more details.

### [.inherit](index.js#L258)

Similar to `util.inherit`, but copies all static properties,
prototype properties, and descriptors from `Provider` to `Receiver`.
[class-utils][] for more details.

## Plugins

If none of the following plugins meet your needs, feel free to use them as examples for creating your own!

* [base-data](https://www.npmjs.com/package/base-data): adds a `data` method to base-methods. | [homepage](https://github.com/jonschlinkert/base-data)
* [base-options](https://www.npmjs.com/package/base-options): Adds a few options methods to base-methods, like `option`, `enable` and `disable`. See the readme… [more](https://www.npmjs.com/package/base-options) | [homepage](https://github.com/jonschlinkert/base-options)
* [base-plugins](https://www.npmjs.com/package/base-plugins): Upgrade's plugin support in base-methods to allow plugins to be called any time after init. | [homepage](https://github.com/jonschlinkert/base-plugins)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/base-methods/issues/new).

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on October 24, 2015._

[class-utils]: https://github.com/jonschlinkert/class-utils
[collection-visit]: https://github.com/jonschlinkert/collection-visit
[component-emitter]: https://github.com/component/emitter
[define-property]: https://github.com/jonschlinkert/define-property
[get-value]: https://github.com/jonschlinkert/get-value
[lazy-cache]: https://github.com/jonschlinkert/lazy-cache
[set-value]: https://github.com/jonschlinkert/set-value
[unset-value]: https://github.com/jonschlinkert/unset-value