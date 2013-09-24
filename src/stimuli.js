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

    self.browser = new Stimuli.virtual.Browser({
        viewport: self.viewport
    });

    self.mouse = new Stimuli.virtual.Mouse({
        viewport: self.viewport
    });

    self.initScheduler();
    self.browser.attachScheduler(self.scheduler);
    self.mouse.attachScheduler(self.scheduler);

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
 * Navigates to an url
 * @param {Object} options
 */
Stimuli.prototype.navigateTo = function() {
    var browser = this.browser;
    browser.navigateTo.apply(browser, arguments);
    return this;
};

/**
 * Executes a mouse click.
 * @param {Object} options
 */
Stimuli.prototype.click = function() {
    var mouse = this.mouse;
    mouse.click.apply(mouse, arguments);
    return this;
};

/**
 * Executes a mouse double click.
 * @param {Object} options
 */
Stimuli.prototype.dblclick = function() {
    var mouse = this.mouse;
    mouse.dblclick.apply(mouse, arguments);
    return this;
};

/**
 * Destroy the stimuli instance
 * @param {Object} options
 */
Stimuli.prototype.destroy = function() {
    var browser = this.browser;
    browser.close();
    return this;
};

/**
 * Finds the dom element matching the css selector.
 * @param {Object} options
 */
Stimuli.prototype.$ = function(selector) {
    return this.viewport.$(selector);
};

/**
 * Returns the browser window
 * @return {window}
 */
Stimuli.prototype.getWindow = function() {
    return this.viewport.getWindow();
};



