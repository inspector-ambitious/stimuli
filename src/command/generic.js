'use strict';

(function() {
    
    Stimuli.command.Generic = function(options, viewport) {
        var self = this;
        self.options = {};
        self.viewport = viewport;
        Stimuli.core.Object.merge(self.options, options);
        self.events = [];
        self.initScheduler();
    };

    var Generic = Stimuli.command.Generic;

    Stimuli.core.Class.mix(Generic, Stimuli.core.Deferable);

    Generic.prototype.configure = Generic.prototype.then;

    Generic.prototype.finish = function(callback) {
        var self = this;
        self.then(function() {
            if (callback) {
                callback(self.events);
            }
        });

        return self;
    };

    Generic.prototype.inject =  function(generateEventConfig, delay) {
        var self = this,
            callback = function(event, canceled) {
                self.events.push({
                    src: event,
                    canceled: canceled
                });
            },
            options;

        if (!isNaN(delay)) {
            options = {delay: delay};
        }

        self.defer(function(cb) {
            var eventConfig = generateEventConfig();
            eventConfig.view = self.viewport.getWindow();
            Stimuli.view.event.Emitter.emit(eventConfig, cb);
        }, callback, options);

        return self;
    };


})();