'use strict';

/**
 * @class Stimuli.core.Type
 * @singleton
 * @private
 * A set of useful methods to deal with objects types.
 */

Stimuli.core.Type = {

    /**
     * @param {Mixed} value The value to test
     * @return {Boolean} Returns true is the passed value is a boolean.
     */
    isBoolean: function(value) {
        return typeof value === 'boolean';
    }

};