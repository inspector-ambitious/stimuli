'use strict';

/**
 * Creates an instance of Domino
 * @constructor
 * @param {Object} options
 * @return {Domino} Fresh Domino instance
 */

var Domino = function(options) {
    options = options || {};
    this.devices = {};

    this.viewport = new Domino.core.Viewport(options.view);
    if (typeof Domino.device.Mouse !== 'undefined') {
        this.devices.mouse = new Domino.device.Mouse(this.viewport);
    }

};

Domino.prototype.getMouse = function() {
    return this.devices.mouse;
};

/**
 * @namespace Domino.core
 */

Domino.core = {};

/**
 * @namespace Domino.device
 */

Domino.device = {};

/**
 * @namespace Domino.interaction
 */

Domino.interaction = {
    mouse: {}
};

/**
 * @namespace Domino.event
 */

 Domino.event = {
    synthetizer: {}
 };

 Domino.$ = function(selector) {
    /* jshint newcap: false */
    return Sizzle(selector)[0];
 };

Domino.$$ = function(selector) {
    /* jshint newcap: false */
    return Sizzle(selector);
 };
