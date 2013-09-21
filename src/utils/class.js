'use strict';

Stimuli.utils.Class = {

    inherit: function(clsSource) {
        var cls = function() {
            return clsSource.apply(this, arguments);
        };

        Stimuli.utils.Object.merge(cls.prototype, clsSource.prototype);

        return cls;
    },

    mix: function(cls, mixin) {
        Stimuli.utils.Object.merge(cls.prototype, mixin);
    }

};
