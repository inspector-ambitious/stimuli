'use strict';

/**
 * @class Stimuli.device.Mouse
 * @alternateClassName Stimuli.Mouse
 * @mixins Stimuli.device.Generic
 * Your virtual mouse.
 * @cfg {Window} [view=window] The target window where events will be injected
 * @constructor
 * @param {Object} The config object
 */

(function() {

    Stimuli.device.Mouse = function(options) {
    
        options = options = {};

        options.view = options.view || window;

        this.viewport = new Stimuli.browser.Viewport(options.view);

        this.name = 'mouse';

    };
    
    var Mouse = Stimuli.device.Mouse;

    /**
     * Executes a simple click.
     * @param {Object} options
     */
    Mouse.prototype.click = function(options, callback) {
        return this.send('click', options, callback);
    };

    /**
     * Executes a double click.
     * @param {Object} options
     */
    Mouse.prototype.dblclick = function(options, callback) {
        return this.send('dblclick', options, callback);
    };

    /**
     * Presses a button.
     * @param {Object} options
     */
    Mouse.prototype.down = function(options, callback) {
        return this.send('down', options, callback);
    };

    /**
     * Releases a button.
     * @param {Object} options
     */
    Mouse.prototype.up = function(options, callback) {
        return this.send('up', options, callback);
    };

    // Extends Stimuli.Device.Abstract
    Stimuli.utils.Object.merge(Mouse.prototype, Stimuli.device.Generic);

})();