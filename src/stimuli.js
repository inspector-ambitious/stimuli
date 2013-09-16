'use strict';

/**
 * Creates an instance of Stimuli
 * @constructor
 * @param {Object} options
 * @return {Stimuli} Fresh Stimuli instance
 */

var Stimuli = function(options) {
    options = options || {};
    this.devices = {};

    this.viewport = new Stimuli.core.Viewport(options.view);
    if (typeof Stimuli.device.Mouse !== 'undefined') {
        this.devices.mouse = new Stimuli.device.Mouse(this.viewport);
    }

};

Stimuli.prototype.getMouse = function() {
    return this.devices.mouse;
};

/**
 * @namespace Stimuli.core
 */

Stimuli.core = {};

/**
 * @namespace Stimuli.device
 */

Stimuli.device = {};

/**
 * @namespace Stimuli.interaction
 */

Stimuli.interaction = {
    mouse: {}
};

/**
 * @namespace Stimuli.event
 */

 Stimuli.event = {
    synthetizer: {}
 };

 Stimuli.$ = function(selector) {
    /* jshint newcap: false */
    return Sizzle(selector)[0];
 };

Stimuli.$$ = function(selector) {
    /* jshint newcap: false */
    return Sizzle(selector);
 };
