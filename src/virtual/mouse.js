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

    Stimuli.virtual.Mouse = function(viewport) {
        this.viewport = viewport;
    };
    
    var Mouse = Stimuli.virtual.Mouse;

    // Extends Stimuli.Device.Abstract
    Stimuli.core.Class.mix(Mouse, Stimuli.core.Observable);

    /**
     * Executes a simple click.
     * @param {Object} options
     */
    Mouse.prototype.click = function(options, callback) {
        return send(this, 'click', options, callback);
    };

    /**
     * Executes a double click.
     * @param {Object} options
     */
    Mouse.prototype.dblclick = function(options, callback) {
        return send(this, 'dblclick', options, callback);
    };

    function send(me, commandName, options, callback) {
        var viewport = me.viewport;

        me.publish('command', {

            fn: function(next) {
                var command = new Stimuli.command.mouse[commandName](options, viewport);
                command.execute(next);
            },

            callback: callback

        });

        return me;
    }

})();