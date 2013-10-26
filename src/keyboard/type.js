'use strict';

(function() {

    Stimuli.keyboard.Type = function() {
        var self = this;
        Stimuli.shared.Command.apply(this, arguments);
        self.layout = arguments[1];
        self.options = {};
        self.options.key = arguments[2][0];
    };

    var Type = Stimuli.keyboard.Type;

    Stimuli.core.Class.mix(Type, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(Type, Stimuli.keyboard.Helper);

    Type.prototype.execute = function(done) {

        var self = this,
            target = self.getTarget(),
            key = self.options.key;

        var sequence = self.layout.getSequence(key, target);

        Stimuli.core.Array.forEach(sequence, function(frame) {

            if (typeof frame === 'function') {
                self.then(function() {
                    frame();
                });

            }  else {
                self.inject(function() {
                    return frame;
                }, 25);
            }

        });

        self.then(function() {
            self.viewport.waitForReady(done);
        });

    };

})();