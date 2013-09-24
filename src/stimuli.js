'use strict';

/**
 * @class Stimuli
 * Creates a new stimuli
 * @constructor
 * @param {Object} options
 */

var Stimuli = function(options) {

    var me = this;

    options = options || {};

    me.viewport = new Stimuli.view.Viewport();

    me.browser = new Stimuli.virtual.Browser({
        viewport: me.viewport
    });

    me.mouse = new Stimuli.virtual.Mouse({
        viewport: me.viewport
    });

    me.scheduler = new Stimuli.core.Scheduler({
        interval: 0
    });

    me.browser.subscribe('command', me.scheduler.schedule, me.scheduler);

    me.mouse.subscribe('command', me.scheduler.schedule, me.scheduler);

    me.scheduler.subscribe('newframe', function(frame, callback) {
        frame.fn(callback);
    });

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
    browser.close.apply(browser);
    return this;
};

/**
 * Finds the dom element matching the css selector.
 * @param {Object} options
 */
Stimuli.prototype.$ = function(selector) {
    return this.viewport.$(selector);
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


