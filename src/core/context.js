'use strict';

/**
 * @class Stimuli.core.Context
 * @mixins Stimuli.core.Observable
 * This class provides an abstraction layer to manage a {Stimuli.virtual.Browser} execution contexts.
 */
(function() {

    Stimuli.core.Context = function() {
        this.win = null;
        this.loading = false;
    };

    var Context = Stimuli.core.Context;

    Stimuli.core.Class.mix(Context, Stimuli.core.Observable);

    /**
     * Sets a new context.
     * @param {Window} win The window object used as a context.
     */
    Context.prototype.setNew = function(win) {
        var self = this;
        // TODO: (yhwh) reroute onerror, alert to current window etc...
        self.win = win;
        self.loading = false;
        self.publish('new');
    };

    /**
     * Returns the current browser window.
     * @return {Window} The current window.
     */
    Context.prototype.getWindow = function() {
        return this.win;
    };

    /**
     * Sets the context in a loading state.
     */
    Context.prototype.setLoading = function() {
        var self = this;
        self.loading = true;
        self.win = null;
        self.publish('loading');
    };

    /**
     * Waits for the context to be ready (generally used after a navigation change).
     * @param {Function} callback The function to call when the context is ready.
     */
    Context.prototype.waitForReady = function(callback) {
        var self = this,
            tmp = [];

        function waitFor() {
            tmp.push(self.loading);
            // some browsers kicks the page loading right away, others do it on the next tick
            // so we have at least two consecutives loading === false before being completely
            // ready.
            if (tmp.length < 2 ||
                (tmp[tmp.length - 1] || tmp[tmp.length -2])) {
                setTimeout(waitFor, 1);
                return;
            }
            tmp = null;
            callback();
        }

        waitFor();
    };


    /**
     * Destroys the current context.
     */
    Context.prototype.destroy = function() {
        this.win = null;
    };

})();