'use strict';

/**
 * @class Stimuli.virtual.Mouse
 * @alternateClassName Stimuli.Mouse
 * @mixins Stimuli.device.Generic
 * The virtual mouse interface.
 * @cfg {Stimuli.virtual.Browser} browser The browser to which the mouse is attached to.
 * @constructor
 * @param {Object} The config object
 */

(function() {

    Stimuli.virtual.Mouse = function(options) {
        this.viewport = options.viewport;
    };
    
    var Mouse = Stimuli.virtual.Mouse;

    // Extends Stimuli.Device.Abstract
    Stimuli.core.Class.mix(Mouse, Stimuli.core.Deferable);

    /**
     * Executes a simple click.
     * @param {Object} options
     */
    Mouse.prototype.click = function(options, callback) {
        return this.defer(this.generateCommand('click', options), callback);
    };

    /**
     * Executes a double click.
     * @param {Object} options
     */
    Mouse.prototype.dblclick = function(options, callback) {
        return this.defer(this.generateCommand('dblclick', options), callback);
    };

    Mouse.prototype.generateCommand = function(commandName, options) {
        var viewport = this.viewport;

        return function(callback) {
            var command = new Stimuli.command.mouse[commandName](options, viewport);
            command.execute(callback);
        };

    };



})();