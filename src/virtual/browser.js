'use strict';

/**
 * @class Stimuli.virtual.Browser
 * @mixins Stimuli.core.Chainable
 * A virtual browser implementation.
 * @constructor
 * @param {Stimuli.shared.Context} context The browser context.
 * @param {Object=} options
 * @param {Number/String} options.width The iframe width in px (Number) or in % (String)
 * @param {Number/String} options.height The iframe height in px (Number) or in % (String)
 */
(function() {
    
    Stimuli.virtual.Browser = function(context, options) {
        var self = this;

        self.context = context;

        self.options = options || {};

        self.iframe = self.options.iframe || new Stimuli.browser.Iframe(context, self.options);

        self.history = self.options.history || new Stimuli.browser.History(context);

    };

    var Browser = Stimuli.virtual.Browser;

    Stimuli.core.Class.mix(Browser, Stimuli.core.Chainable);

    /**
     * @chainable
     * Navigates to the specified url.
     * @param {String} url The page url to load.
     */
    Browser.prototype.navigateTo = function(url) {
        var self = this;

        return self.then(function(done) {
            self.iframe.load(url, done);
        });

    };

    /**
     * @chainable
     * Goes back to the previously visited page.
     */
    Browser.prototype.back = function() {
        var self = this;

        return self.then(function(done) {
            self.history.go(-1, done);
        });
    };

    /**
     * @chainable
     * Goes forward a page, if you have gone back first.
     */
    Browser.prototype.forward = function() {
        var self = this;

        return self.then(function(done) {
            self.history.go(1, done);
        });
    };

    /**
     * @chainable
     * Reloads current page.
     */
    Browser.prototype.reload = function() {
        var self = this;

        return self.then(function(done) {
            self.history.go(0, done);
        });
    };

    /**
     * @chainable
     * Destroys the virtual browser.
     */
    Browser.prototype.destroy = function(callback) {
        var self = this;
        return self.defer(function(done) {

            var history = self.history;
            var iframe = self.iframe;
            self.iframe = null;
            self.history = null;
            self.context = null;

            if (history) {
                history.destroy();

            }




            if (iframe) {
                iframe.destroy(done);

            }

        }, callback);
    };

})();