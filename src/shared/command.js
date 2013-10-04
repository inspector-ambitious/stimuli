'use strict';

/**
 * @class Stimuli.shared.Command
 * @mixins Stimuli.core.Chainable
 * Command device implementation.
 * @constructor
 * @param {Stimuli.shared.Viewport} viewport The viewport to which is the device attached.
 * @param {Object} options The device options if any.
 */
(function() {
    
    Stimuli.shared.Command = function(viewport, args) {
        var self = this;
        self.args = args;
        self.viewport = viewport;
    };

    var Command = Stimuli.shared.Command;

    Stimuli.core.Class.mix(Command, Stimuli.core.Chainable);

    Command.prototype.configure = Command.prototype.then;

    /**
     * @chainable
     * Injects the configured event into the dom.
     * @param {Function} generateEventConfig The event configuration to generate.
     * @param {Number=} delay The delay before in injection in ms
     */
    Command.prototype.inject = function(generateEventConfig, delay) {
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
            Stimuli.event.Emitter.emit(eventConfig, next);
        }, callback, options);

    };

})();