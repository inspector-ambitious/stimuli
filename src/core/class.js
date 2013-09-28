'use strict';

/**
 * @class Stimuli.core.Class
 * @singleton
 * This singleton provide utilities to deal with classes inheritance and mixins.
 */
Stimuli.core.Class = {

    /**
     * Creates a class which has inherited constructor and prototype from another one.
     * @param {Mixed} clsSource The class to inherit from.
     * @return {Mixed} The subclass.
     */
    inherit: function(clsSource) {
        var cls = function() {
            return clsSource.apply(this, arguments);
        };

        Stimuli.core.Object.merge(cls.prototype, clsSource.prototype);

        return cls;
    },

    /**
     * Applies a mixin to a class prototype.
     * @param {Mixed} cls The destination class.
     * @param {Mixed} mixin The applied mixin.
     */
    mix: function(cls, mixin) {
        Stimuli.core.Object.merge(cls.prototype, mixin);
    }

};
