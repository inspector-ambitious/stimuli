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
     * Waits for the context to be ready (generally used after a navigation change).
     * @param {Function} callback The function to call when the context is ready.
     */
    Context.prototype.waitForReady = function(callback) {
        var self = this,
            callbackWrapper = function() {
            self.unsubscribe('new', callbackWrapper);
            callback();
        };

        if (Stimuli.core.Support.isIOS) {

            self.once('new', callbackWrapper);

            self.win._callback = callbackWrapper;

            // there is no beforeunload, but if the page is loading this asynchronous ajax request in the next tick
            // will never complete :) (done a lot of manual testing on this one...)
            self.win.eval.call(self.win, [
                'setTimeout(function(){',
                '   var xhr = new XMLHttpRequest();',
                '   xhr.onload = function() {',
                '       xhr.onload = null;',
                '       _callback();',
                '   };',
                // the ? (new Date).getTime() + Math.random() is to prevent caching...
                '   xhr.open("get", "ios-stupid-hack?" + (new Date).getTime() + Math.random(), true);',
                '   xhr.send();',
                '}, 1);'
            ].join(''));

        } else {

            var buffer = [],
                tick = function () {
                buffer.push(self.loading);
                var length = buffer.length;
                // some browsers emit a beforeunload right away, others do it on the next tick (setTimeout 1)
                // so we need to be sure to have at least two loading states in the buffer before assuming anything.
                if (length < 2 || (buffer[length - 1] || buffer[length -2])) {
                    setTimeout(tick, 1);
                    return;
                }
                buffer = null;
                callbackWrapper();
            };

            tick();
        }

    };


})();