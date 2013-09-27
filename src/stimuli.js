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


    self.viewport = new Stimuli.view.Viewport();

    self.browser = new Stimuli.virtual.Browser();

    self.mouse = new Stimuli.virtual.Mouse();

    self.recorder = new Stimuli.core.Recorder();

    self.synchronize(self.viewport);

    self.synchronize(self.recorder);

    self.synchronize(self.browser);

    self.synchronize(self.mouse);

    function mix(obj) {
        obj.browser = self.browser;
        obj.viewport = self.viewport;
        obj.mouse = self.mouse;
        obj.recorder = self.recorder;
    }

    mix(self.viewport);

    mix(self.browser);

    mix(self.mouse);

    mix(self.recorder);

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
Stimuli.prototype.destroy = function(callback) {
    var self = this;
    return self.defer(function(next) {
        self.browser.destroy();
        next();
    }, callback);
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

