'use strict';

/**
 * @class Stimuli.core.Array
 * @singleton
 * A set of useful methods to deal with arrays.
 */
(function() {

    Stimuli.core.Array = {

        /**
         * Determines if an array contains a specified value.
         * @param {Array} array The array to inspect
         * @param {Mixed} value The value to look at
         * @return {Boolean} True is the array contains the passed value
         */
        contains: (function() {
            if (typeof [].indexOf === 'function')  {
                return function(array, value) {
                    return array.indexOf(value) !== -1;
                };
            }
            return function(array, value) {
                var length = array.length,
                    i = 0;

                for (; i < length; i++) {
                    if (array[i] === value) {
                        return true;
                    }
                }
                return false;
            };
        }()),

        /**
         * Iterates through all values of an array.
         * @param {Array} array
         * @param {Function} fn
         * @param fn.value The array value
         * @param fn.idx The array idx
         */
        forEach: (function() {
            if (typeof [].forEach === 'function') {
                return function(array, fn) {
                    array.forEach(fn);
                };
            }
            return function(array, fn) {

                var length = array.length,
                    i = 0;

                for (; i < length; i++) {
                    fn.call(array, array[i], i, array);
                }
            };
        }())

    };

})();