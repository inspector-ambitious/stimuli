'use strict';

/**
 * @class Stimuli
 * This class stimulates your browser! it's the entry point of all the framework.
 * @constructor
 * @param {Object} options
 */

var Stimuli = function(options) {
    var self = this;

    options = options || {};


    self.context = new Stimuli.shared.Context();

    self.browser = new Stimuli.virtual.Browser(self.context);

    self.viewport = new Stimuli.shared.Viewport(self.context);

    self.mouse = new Stimuli.virtual.Mouse(self.viewport);

    self.recorder = new Stimuli.shared.Recorder();

    self.synchronize(self.recorder);

    self.synchronize(self.browser);

    self.synchronize(self.mouse);

    function mix(obj) {
        obj.browser = self.browser;
        obj.mouse = self.mouse;
        obj.recorder = self.recorder;
    }

    mix(self.browser);

    mix(self.mouse);

    mix(self.recorder);

};

// Namespaces declaration

Stimuli.core = {};
Stimuli.shared = {};
Stimuli.event = {
    synthetizer: {}
};


Stimuli.virtual = {
    mouse: {},
    keyboard: {},
    touch:{}
};

Stimuli.browser = {};

Stimuli.mouse = {};




/**
 * Destroy the stimuli instance
 * @param {Object} options
 */
Stimuli.prototype.destroy = function(callback) {
    return this.browser.destroy(callback);
};

/**
 * Finds the dom element matching the css selector in the current virtual browser viewport.
 * @param {Object} options
 * @return {HTMLElement} The element.
 */
Stimuli.prototype.$ = function(selector) {
    return this.viewport.$(selector);
};

/**
 * Returns the current virtual browser window object.
 * @return {Window}
 */
Stimuli.prototype.getWindow = function() {
    return this.context.getWindow();
};

/**
 * Returns the current virtual browser document object.
 * @return {Object}
 */
Stimuli.prototype.getDocument = function() {
    return this.viewport.getDocument();
};
