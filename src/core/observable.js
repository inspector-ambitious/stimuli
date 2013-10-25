'use strict';

/**
 * @class Stimuli.core.Observable
 * @singleton
 * This mixin provides a common interface to publish and to listen to events on objects.
 */
Stimuli.core.Observable = {

    /**
     * Publishes an event, which will result in a call to all suscribed listeners.
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

    /**
     * Attaches a listener to an event.
     * @param {String} eventName The event name.
     * @param {Function} fn The listener to attach.
     * @param {Object=} scope The listener execution scope.
     * @param {Boolean=} sneak If true the listener will be called first.
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
     * Attaches a listener to an event, but it will be called only once.
     * @param {String} eventName The event name.
     * @param {Function} fn The listener to attach.
     * @param {Object=} scope The listener execution scope.
     * @param {Boolean=} sneak If true the listener will be called first.
     */
    once: function(eventName, fn, scope, sneak) {
        var self = this;

        var fnWrap = function() {
            self.unsubscribe(eventName, fnWrap);
            fn.apply(scope, arguments);
        };

        fnWrap.origFn = fn;

        self.subscribe(eventName, fnWrap, scope, sneak);
    },

    /**
     * Detaches a listener on a specifi event.
     * @param {String} eventName The event name.
     * @param {Function} fn The listener to detach.
     */
    unsubscribe: function(eventName, fn) {
        var listeners = this.listeners[eventName],
            length = listeners.length,
            i = 0,
            listener;

        for (; i < length; i++) {
            listener = listeners[i];
            if (listeners[i].fn === fn ||
                listeners[i].fn.origFn === fn) {
                listeners.splice(i, 1);
                break;
            }
        }

    }
};

Stimuli.core.Class.mix(Stimuli, Stimuli.core.Observable);