'use strict';

/**
 * @class Stimuli.utils.Observable
 * @singleton
 * @private
 * Base class that provides a common interface for publishing events.
 */

Stimuli.utils.Observable = {

    /**
     * @protected
     * Publishes an event.
     * @param {String} eventName The event name.
     * @param {Mixed} [data] the data to be emitted.
     */
    publish: function(eventName) {
        var me = this;
        if (!me.listeners || !me.listeners[eventName]) {
            return;
        }

        var args = Array.prototype.slice.call(arguments, 1),
            listeners = me.listeners[eventName],
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
                break;
            }
        }
        this.listeners = listeners.slice(0, i - 1).concat(listeners.slice(i + 1));

    }
};