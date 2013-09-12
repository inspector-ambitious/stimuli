'use strict';

/**
 * Creates an instance of Domino
 * @constructor
 * @param {Object} options
 * @return {Domino} Fresh Domino instance
 */

var Domino = function(options) {

    this.devices = {};

    if (typeof Domino.device.Mouse !== 'undefined') {
        this.devices.mouse = new Domino.device.Mouse();
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