'use strict';

/**
 * @class Stimuli
 * Creates a new stimuli
 * @constructor
 * @param {Object} options
 */

var Stimuli = function(options) {
    var self = this;

    options = options || {};

    self.initScheduler();

    self.viewport = new Stimuli.view.Viewport();

    self.browser = new Stimuli.virtual.Browser();

    self.mouse = new Stimuli.virtual.Mouse();

    function mix(obj) {
        obj.scheduler = self.scheduler;
        obj.browser = self.browser;
        obj.viewport = self.viewport;
        obj.mouse = self.mouse;
    }


    mix(self.browser);

    mix(self.mouse);

    self.mouse.destroy = self.destroy;

};

// Namespaces declaration
Stimuli.view = {
    event: {
        synthetizer: {}
    }
};

Stimuli.virtual = {
    mouse: {},
    keyboard: {},
    touch:{}
};

Stimuli.core = {};

Stimuli.command = {
    mouse: {}
};




/**
 * Destroy the stimuli instance
 * @param {Object} options
 */
Stimuli.prototype.destroy = function() {
    this.browser.destroy();
    return true;
};

/**
 * Finds the dom element matching the css selector.
 * @param {Object} options
 */
Stimuli.prototype.$ = function(selector) {
    return this.viewport.$(selector);
};

Stimuli.prototype.getWindow = function() {
    return this.viewport.getContext();
};

Stimuli.prototype.getDocument = function() {
    return this.viewport.getContext().document;
};

