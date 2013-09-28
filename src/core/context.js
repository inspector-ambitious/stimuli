'use strict';

/**
 * @class Stimuli.core.Context
 * @mixins Stimuli.core.Observable
 * This class provides an abstraction layer to manage a {Stimuli.virtual.Browser} execution contexts.
 */
(function() {

    Stimuli.core.Context = function() {
        this.win = null;
        this.winObserver = null;
        this.loading = false;
    };

    var Context = Stimuli.core.Context;

    Stimuli.core.Class.mix(Context, Stimuli.core.Observable);

    /**
     * Sets the current context.
     * @param {Window} win The window object used as a context.
     */
    Context.prototype.set = function(win) {
        var self = this;
        self.win = win;

        if (win) {
            self.winObserver = new Stimuli.view.event.Observer(win);
            self.winObserver.once('beforeunload', function() {
                self.loading = true;

            });
            self.winObserver.once('unload', function() {
                self.winObserver = null;
                self.win = null;

            });
            self.loading = false;
            self.publish('update');
        }

    };

    /**
     * Retrieves the current context.
     * @return {Window} The current context.
     */
    Context.prototype.get = function() {
        return this.win;
    };

    /**
     * Determines is the current context has changed and a new one is loading.
     * @return {Boolean} True if the a new context is loading.
     */
    Context.prototype.isLoading = function() {
        return this.loading;
    };
})();