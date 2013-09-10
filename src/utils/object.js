'use strict';

define(['domino'], function(Domino) {

    /**
     * Various utilities to work with Objects.
     * @namespace Object
     * @memberof Domino.utils
     */
    Domino.utils.Object = {
        /** @lends Domino.utils.Object */
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
    
    return Domino;
});