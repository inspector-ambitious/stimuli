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
        this.layout = Stimuli.keyboard.layout[Stimuli.core.Support.getOS()].us;
    };

    var Keyboard = Stimuli.virtual.Keyboard;

    Stimuli.core.Class.mix(Keyboard, Stimuli.core.Chainable);

    /**
     * Sets the keyboard layout.
     *
     * @param {String} name The layout name, see keyboard/layout folder to see a complete list
     * @param {String=} os The layout os can be windows, macosx or linux. (default to current os)
     */
    Keyboard.prototype.setLayout = function(name, os) {
        os = os || Stimuli.core.Support.getOS();
        this.layout = Stimuli.keyboard.layout[os][name];
    };

    /**
     * Types text in the active element.
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
            var command = new Stimuli.keyboard[commandName](self.viewport, self.layout, args);
            command.execute(done);
        };
    };

})();