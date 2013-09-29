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
     * Determines if the browser window is currently loading.
     * @return {Boolean} True if the a new context is loading.
     */
    Context.prototype.isLoading = function() {
        return this.loading;
    };


    /**
     * Destroys the current context.
     */
    Context.prototype.destroy = function() {
        this.win = null;
    };

})();