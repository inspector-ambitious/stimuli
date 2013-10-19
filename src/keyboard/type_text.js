'use strict';

(function() {

    Stimuli.keyboard.TypeText = function() {
        var self = this;
        Stimuli.shared.Command.apply(this, arguments);
        self.layout = arguments[1];
        self.options = {};
        self.options.keys = arguments[2][0];
    };

    var TypeText = Stimuli.keyboard.TypeText;

    Stimuli.core.Class.mix(TypeText, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(TypeText, Stimuli.keyboard.Helper);

    TypeText.prototype.execute = function(done) {

        var self = this,
            Obj = Stimuli.core.Object,
            target = self.getTarget();

        Stimuli.core.Array.forEach(self.options.keys.split(''), function(key) {
            self.then(function(done) {
                var command = new Stimuli.keyboard.Type(self.viewport, self.layout, key);
                command.execute(done);
            });
        });

        self.then(function() {
            self.viewport.waitForReady(done);
        });

    };

})();