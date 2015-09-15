'use strict';

var lazy = require('lazy-cache')(require);
lazy('set-value', 'set');
lazy('get-value', 'get');
lazy('unset-value', 'del');
lazy('collection-visit', 'visit');
lazy('define-property', 'define');

module.exports = lazy;
