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
            listeners = self.listeners[eventName],
            length = listeners.length,
            i = 0,
            listener;

        for (; i < length; i++) {
            listener = listeners[i];
            listener.fn.apply(listener.scope, args);
        }

    },

    /**
     * @protected
     * Subscribes to an event.
     * @param {String} eventName The event name.
     * @param {Function} fn The listener to bind.
     * @param {Object=} scope The listener execution scope.
     */
    subscribe: function(eventName, fn, scope) {
        var me = this;

        scope = scope || me;

        me.listeners = me.listeners || {};

        me.listeners[eventName] = me.listeners[eventName] || [];

        me.listeners[eventName].push({

            fn: fn,

            scope: scope

        });

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