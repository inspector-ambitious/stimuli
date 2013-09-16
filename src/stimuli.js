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

/**
 * @static
 * Returns the first dom element matching the css selector.
 * @param {string} selector Css selector jquery styl
 * @return {HTMLElement}
 */
Stimuli.$ = function(selector) {
    /* jshint newcap: false */
    return Sizzle(selector)[0];
};

/**
 * @static
 * Returns all dom elements matching the css selector.
 * @param {string} selector Css selector jquery styl
 * @return {HTMLElement[]}
 */

Stimuli.$$ = function(selector) {
    /* jshint newcap: false */
    return Sizzle(selector);
};

// Namespaces declaration
Stimuli.core = {};

Stimuli.device = {};

Stimuli.interaction = {
    mouse: {}
};

Stimuli.event = {
    synthetizer: {}
};