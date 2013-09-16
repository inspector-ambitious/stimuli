'use strict';

/**
 * @class Stimuli.core.Object
 * @singleton
 * @private
 * A set of useful methods to deal with objects.
 */

Stimuli.core.Object = {

    /**
     * Merge objects properties.
     * @param {Object} dest The destination object
     * @param {Object=} src The source object
     * @return {Object} dest
     */
    merge: function(dest, src) {
        if (!src) {
            return dest;
        }
        for (var prop in src) {
            if (src.hasOwnProperty(prop)) {
                dest[prop] = src[prop];
            }
        }

        return dest;
    }

};