'use strict';

/**
 * @class Stimuli.shared.Context
 * @mixins Stimuli.core.Observable
 * This class provides an abstraction layer to manage a {Stimuli.virtual.Browser} execution contexts.
 */
(function() {

    Stimuli.shared.Context = function() {
        this.win = null;
        this.loading = false;
    };

    var Context = Stimuli.shared.Context;

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
        var self = this;

        // since there is no beforeunload on IOS, the only method i found to wait enough to check if a navigation is
        // occuring in the stimuli window is to create an iframe wait for it to be loaded (it will always fire after
        // the stimuli iframe unload).
        if (Stimuli.core.Support.isIOS) {

            var doc = window.document,
                iframe = doc.createElement('iframe');

            iframe.src = Stimuli.blankPage || '/';

            iframe.style.display = 'none';

            iframe.onload = function() {
                iframe.onload = null;
                doc.body.removeChild(iframe);

                var waitForLoad = function() {

                    if (self.loading === false) {
                        callback();
                    } else {
                        setTimeout(waitForLoad, 1);
                    }
                };

                setTimeout(waitForLoad, 1);
            };

            doc.body.appendChild(iframe);

        // And now the "classic" navigation detection ^^
        } else {
            var tmp = [],
                waitForLoad = function () {

                    tmp.push(self.loading);
                    // some browsers kicks the beforeunload right away, others do it on the next tick (setTimeout, 1)
                    // so we need to be sure to have at least two consecutives loading === false before returning.
                    if (tmp.length < 2 ||
                        (tmp[tmp.length - 1] || tmp[tmp.length -2])) {
                        setTimeout(waitForLoad, 1);
                        return;
                    }
                    tmp = null;
                    callback();
                };

            waitForLoad();
        }

    };


    /**
     * Destroys the current context.
     */
    Context.prototype.destroy = function() {
        this.win = null;
    };

})();