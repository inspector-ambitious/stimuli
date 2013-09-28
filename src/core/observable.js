'use strict';

/**
 * @class Stimuli.core.Observable
 * @singleton
 * @private
 * Base class that provides a common interface for publishing events.
 */

Stimuli.core.Observable = {

    /**
     * @protected
     * Publishes an event.
     * @param {String} eventName The event name.
     * @param {Mixed} [data] the data to be emitted.
     */
    publish: function(eventName) {
        var self = this;
        if (!self.listeners || !self.listeners[eventName]) {
            return;
        }

        var args = Array.prototype.slice.call(arguments, 1),
            listeners = self.listeners[eventName].slice(0),
            length = listeners.length,
            i = 0,
            listener;

        for (; i < length; i++) {
            listener = listeners[i];
            listener.fn.apply(listener.scope, args);
        }

    },

    once: function(eventName, fn, scope, sneak) {
        var self = this;

        function fnWrap() {
            self.unsubscribe(eventName, fnWrap);
            fn.apply(scope, arguments);
        }

        self.subscribe(eventName, fnWrap, scope, sneak);
    },

    /**
     * @protected
     * Subscribes to an event.
     * @param {String} eventName The event name.
     * @param {Function} fn The listener to bind.
     * @param {Object=} scope The listener execution scope.
     */
    subscribe: function(eventName, fn, scope, sneak) {
        var self = this,
            options;

        scope = scope || self;

        self.listeners = self.listeners || {};

        self.listeners[eventName] = self.listeners[eventName] || [];

        options = {

            fn: fn,

            scope: scope

        };

        if (sneak) {
            self.listeners[eventName].splice(0, 0, options);
        } else {
            self.listeners[eventName].push(options);
        }

    },

    /**
     * @protected
     * Unsubscribes to an event.
     * @param {String} eventName The event name.
     * @param {Function} fn The listener to unbind.
     */
    unsubscribe: function(eventName, fn) {
        var listeners = this.listeners[eventName],
            length = listeners.length,
            i = 0,
            listener;

        for (; i < length; i++) {
            listener = listeners[i];
            if (listeners[i].fn === fn) {
                listeners.splice(i, 1);
                break;
            }
        }

    }
};

Stimuli.core.Class.mix(Stimuli, Stimuli.core.Observable);