'use strict';

/**
 * @class Stimuli.virtual.Keyboard
 * @alternateClassName Stimuli.Keyboard
 * @mixins Stimuli.core.Chainable
 * The virtual keyboard interface.
 * @cfg {Stimuli.virtual.Browser} browser The browser to which the keyboard is attached to.
 * @constructor
 * @param {Object} The config object
 */

(function() {

    Stimuli.virtual.Keyboard = function(viewport) {
        this.viewport = viewport;
    };

    var Keyboard = Stimuli.virtual.Keyboard;

    Stimuli.core.Class.mix(Keyboard, Stimuli.core.Chainable);

    /**
     * Types text.
     */
    Keyboard.prototype.typeText = function() {
        return this.then(this.generateCommand('TypeText', arguments));
    };

    /**
     * Abstract method to generate the corresponding keyboard command.
     * @param {String} commandName The command name
     * @param options
     * @returns {Function}
     */
    Keyboard.prototype.generateCommand = function(commandName, args) {
        var self = this;
        return function(done) {
            var command = new Stimuli.keyboard[commandName](self.viewport, args);
            command.execute(done);
        };
    };

})();