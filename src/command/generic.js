'use strict';

(function() {
    
    Stimuli.command.Generic = function(viewport, options) {
        var self = this;
        self.options = {};
        self.viewport = viewport;
        Stimuli.core.Object.merge(self.options, options);
    };

    var Generic = Stimuli.command.Generic;

    Stimuli.core.Class.mix(Generic, Stimuli.core.Deferable);

    Generic.prototype.configure = Generic.prototype.then;

    Generic.prototype.inject = function(generateEventConfig, delay) {
        var self = this,
            callback = function(event, canceled) {
                if (!self.events) {
                    self.events = [];
                }
                self.events.push({
                    src: event,
                    canceled: canceled
                });
            },
            options;

        if (!isNaN(delay)) {
            options = {delay: delay};
        }

        return self.defer(function(next) {
            var eventConfig = generateEventConfig();
            eventConfig.view = self.viewport.getWindow();
            Stimuli.view.event.Emitter.emit(eventConfig, next);
        }, callback, options);

    };

})();