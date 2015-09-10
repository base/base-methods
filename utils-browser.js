
var utils = module.exports;
utils.set = require('set-value');
utils.get = require('get-value');
utils.del = require('unset-value');
utils.visit = require('collection-visit');
utils.define = require('define-property');

/**
 * Returns true if an array have the given element
 * @return {Boolean}
 */

utils.has = function has(keys, key) {
  return keys.indexOf(key) > -1;
};

/**
 * Return true if the given value is an object.
 * @return {Boolean}
 */

utils.isObject = function isObject(val) {
  return val && (typeof val === 'function' || typeof val === 'object')
    && !Array.isArray(val);
};

utils.getDescriptor = function getDescriptor(provider, key) {
  return Object.getOwnPropertyDescriptor(provider, key);
};

utils.copyDescriptor = function copyDescriptor(receiver, provider, key) {
  var val = utils.getDescriptor(provider, key);
  if (val) utils.define(receiver, key, val);
};

utils.copy = function copy(receiver, provider, omit) {
  var props = Object.getOwnPropertyNames(provider);
  var keys = Object.keys(provider);
  var len = props.length, key;

  while (len--) {
    key = props[len];

    if (utils.has(keys, key)) {
      utils.define(receiver, key, provider[key]);
    } else if (!(key in receiver) && !utils.has(omit, key)) {
      utils.copyDescriptor(receiver, provider, key);
    }
  }
};

utils.inherit = function inherit(receiver, provider, omit) {
  if (!utils.isObject(receiver)) {
    throw new TypeError('expected receiver to be an object.');
  }
  if (!utils.isObject(provider)) {
    throw new TypeError('expected provider to be an object.');
  }

  var keys = [];
  for (var key in provider) {
    keys.push(key);
    utils.define(receiver, key, provider[key]);
  }

  if (receiver.prototype && provider.prototype) {
    utils.copy(receiver.prototype, provider.prototype, keys);
    utils.define(receiver, '__super__', provider.prototype);
  }
};

module.exports = lazy;
