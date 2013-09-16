'use strict';

/**
 * Various utilities to work with Objects.
 * @namespace Object
 * @memberof Stimuli.core
 */

Stimuli.core.Object = {
    /** @lends Stimuli.core.Object */

    /**
     * Merge objects properties.
     * @param {Object} dest The destination object
     * @param {Object} src The source object
     * @returns {Object} dest
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