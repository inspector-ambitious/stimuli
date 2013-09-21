'use strict';

/**
 * @class Stimuli
 * Creates a new stimuli
 * @constructor
 * @param {Object} options
 */

var Stimuli = function(options) {
    options = options || {};


    if (typeof Stimuli.device.Mouse !== 'undefined') {
        this.mouse = new Stimuli.device.Mouse(options);
    }

};

/**
 * Returns a virtual mouse
 * @return {Stimuli.device.Mouse}
 */
Stimuli.prototype.getMouse = function() {
    return this.mouse;
};


// Namespaces declaration
Stimuli.browser = {};

Stimuli.device = {};

Stimuli.event = {
    synthetizer: {}
};

Stimuli.command = {
    mouse: {
        utils: {}
    }
};

Stimuli.utils = {};

