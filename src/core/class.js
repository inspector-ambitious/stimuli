'use strict';

Stimuli.core.Class = {

    inherit: function(clsSource) {
        var cls = function() {
            return clsSource.apply(this, arguments);
        };

        Stimuli.core.Object.merge(cls.prototype, clsSource.prototype);

        return cls;
    },

    mix: function(cls, mixin) {
        Stimuli.core.Object.merge(cls.prototype, mixin);
    }

};
