'use strict';

(function() {

    Stimuli.keyboard.Down = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseOptions();
    };

    var Down = Stimuli.keyboard.Down;

    Stimuli.core.Class.mix(Down, Stimuli.shared.Command.prototype);

    Down.prototype.execute = function(done) {

        var self = this,
            Obj = Stimuli.core.Object,
            keys = self.options.keys,
            defaultConfig,
            target;

        self.configure(function() {
            defaultConfig = {
                bubbles: true,
                cancelable: true,
                data: keys,
                key: self.getKey(keys),
                location: self.getLocation(),
                locale: self.getLocale(),
                modifiers: self.viewport.getModifiers(),
                target: self.getTarget(),
                inputMethod: self.getInputMethod()
            };
        });

        self.inject(function() {
            return Obj.merge({
                type: 'keydown'
            }, defaultConfig);
        }, 1);

        if (keys.length === 1) {
            self.inject(function() {
                return Obj.merge({
                    type: 'keypress'
                }, defaultConfig);
            }, 1);
        }

        self.then(function() {
            self.viewport.waitForReady(done);
        });

    };

})();