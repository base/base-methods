'use strict';

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;
require('set-value', 'set');
require('get-value', 'get');
require('unset-value', 'del');
require('collection-visit', 'visit');
require('define-property', 'define');
require('component-emitter', 'Emitter');
require('class-utils', 'cu');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
