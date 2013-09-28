'use strict';

/**
 * @class Stimuli.view.event.Observer
 * This class makes a the events on a target observable, and event target could be a dom element, the browser window,
 * an ajax request etc...
 * @constructor
 * @param {Mixed} eventTarget The event target
 */

(function() {

    Stimuli.view.event.Observer = function(eventTarget) {

        this.eventTarget = eventTarget;

        this.listeners = {};
    };

    var Observer = Stimuli.view.event.Observer;

    /**
     * Attaches a listener to an event.
     * @param {String} type The event type.
     * @param {Function} listener The listener to attach.
     * @param {Object=} scope The listener execution scope.
     */
    Observer.prototype.subscribe = function(type, listener, scope) {
        var self = this;

        scope = scope || self;

        function wrappedListener() {
            listener.apply(scope, arguments);
        }

        if (Stimuli.core.Support.documentAddEventListener) {
            self.eventTarget.addEventListener(type, wrappedListener, false);
        } else {
            self.eventTarget.attachEvent('on' + type, wrappedListener);
        }

        if (!self.listeners[type]) {
            self.listeners[type] = [];
        }

        self.listeners[type].push({
            type: type,
            listener: listener,
            wrappedListener: wrappedListener
        });
    };

    /**
     * Attaches a listener to an event, but it will be called only once.
     * @param {String} type The event type.
     * @param {Function} listener The listener to attach.
     * @param {Object=} scope The listener execution scope.
     */
    Observer.prototype.once = function(type, listener, scope) {
        var self = this;

        function listenerWrap() {
            self.unsubscribe(type, listenerWrap);
            listener.apply(scope, arguments);
        }

        self.subscribe(type, listenerWrap, scope);
    };

    /**
     * Detaches a listener on a specific event.
     * @param {String} type The event type.
     * @param {Function} listener The listener to detach.
     */
    Observer.prototype.unsubscribe = function(type, listener) {
        var self = this,
            listeners = self.listeners[type],
            length = listeners.length,
            i = 0,
            wrappedListener;

        for (; i < length; i++) {
            if (listeners[i].listener === listener) {
                wrappedListener = listeners[i].wrappedListener;
                listeners.splice(i, 1);
                break;
            }
        }

        if (Stimuli.core.Support.documentAddEventListener) {
            self.eventTarget.removeEventListener(type, wrappedListener, false);
        } else {
            self.eventTarget.detachEvent('on' + type, wrappedListener);
        }
    };

    /**
     * Detaches all listeners on all observed events.
     */
    Observer.prototype.unsubscribeAll = function() {
        var self = this,
            type,
            listeners;

        for (type in self.listeners) {
            if (self.listeners.hasOwnProperty(type)) {
                listeners = self.listeners[type];
                while (listeners[0]) {
                    self.unsubscribe(type, listeners[0].listener);
                }
            }
        }

    };

})();