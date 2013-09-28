'use strict';

/*
 * @class Stimuli.virtual.Mouse
 * @alternateClassName Stimuli.Mouse
 * @mixins Stimuli.device.Generic
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

    // Extends Stimuli.Device.Abstract
    Stimuli.core.Class.mix(Mouse, Stimuli.core.Chainable);

    /*
     * Executes a simple click.
     * @param {Object} options
     */
    Mouse.prototype.click = function(options) {
        return this.then(this.generateCommand('click', options));
    };

    /*
     * Executes a double click.
     * @param {Object} options
     */
    Mouse.prototype.dblclick = function(options) {
        return this.then(this.generateCommand('dblclick', options));
    };


    Mouse.prototype.generateCommand = function(commandName, options) {
        var self = this;
        return function(done) {
            var command = new Stimuli.command.mouse[commandName](self.viewport, options);
            command.execute(done);
        };
    };



})();