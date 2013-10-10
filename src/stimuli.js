'use strict';

/**
 * @class Stimuli
 * This class stimulates your browser! it's the entry point of all the framework.
 * @constructor
 * @param {Object} options
 */

var Stimuli = function() {
    var self = this;

    self.context = new Stimuli.shared.Context();

    self.browser = new Stimuli.virtual.Browser(self.context);

    self.viewport = new Stimuli.shared.Viewport(self.context);

    self.mouse = new Stimuli.virtual.Mouse(self.viewport);

    self.keyboard = new Stimuli.virtual.Keyboard(self.viewport);

    self.recorder = new Stimuli.shared.Recorder();

    self.synchronize(self.recorder);

    self.synchronize(self.browser);

    self.synchronize(self.mouse);

    self.synchronize(self.keyboard);

    function mix(obj) {
        obj.browser = self.browser;
        obj.mouse = self.mouse;
        obj.keyboard = self.keyboard;
        obj.recorder = self.recorder;
    }

    mix(self.browser);

    mix(self.keyboard);

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

Stimuli.keyboard = {};

/**
 * Destroy the stimuli instance
 * @param {Object} options
 */
Stimuli.prototype.destroy = function(callback) {
    var self = this;

    this.context = null;
    this.viewport = null;
    this.mouse = null;
    this.keyboard = null;
    this.recorder = null;
    this.scheduler = null;
    this.listeners = null;
    this.browser.destroy();

    this.browser = null;
    if (callback) {
        callback();
    }
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
