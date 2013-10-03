'use strict';

/**
 * @class Stimuli.virtual.Mouse
 * @alternateClassName Stimuli.Mouse
 * @mixins Stimuli.core.Chainable
 * The virtual mouse interface.
 * @cfg {Stimuli.virtual.Browser} browser The browser to which the mouse is attached to.
 * @constructor
 * @param {Object} The config object
 */

(function() {

    Stimuli.virtual.Mouse = function(viewport) {
        this.viewport = viewport;
    };
    
    var Mouse = Stimuli.virtual.Mouse;

    Stimuli.core.Class.mix(Mouse, Stimuli.core.Chainable);

    /**
     * Executes a simple click.
     */
    Mouse.prototype.click = function() {
        return this.then(this.generateCommand('Click', arguments));
    };

    /**
     * Executes a double click.
     */
    Mouse.prototype.dblclick = function() {
        return this.then(this.generateCommand('Dblclick', arguments));
    };

    /**
     * Abstract method to generate the corresponding mouse command.
     * @param {String} commandName The command name
     * @param options
     * @returns {Function}
     */
    Mouse.prototype.generateCommand = function(commandName, args) {
        var self = this;
        return function(done) {
            var command = new Stimuli.mouse[commandName](self.viewport, args);
            command.execute(done);
        };
    };



})();