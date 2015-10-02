'use strict';

/**
 * Lazily required module dependencies
 */

var lazy = require('lazy-cache')(require);
var fn = require;

require = lazy;
require('set-value', 'set');
require('get-value', 'get');
require('unset-value', 'del');
require('collection-visit', 'visit');
require('define-property', 'define');
require('component-emitter', 'Emitter');
require('class-utils', 'cu');

/**
 * Expose `lazy` modules
 */

module.exports = lazy;
