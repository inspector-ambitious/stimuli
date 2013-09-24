'use strict';

/**
 * @class Stimuli.view.event.Observer
 * Allows to bind/unbind listeners to EventTargets.
 */

(function() {

    Stimuli.view.event.Observer = function(element) {

        this.element = element;

        this.listeners = {};
    };

    var Observer = Stimuli.view.event.Observer;

    Observer.prototype.subscribe = function(type, listener, scope) {
        var self = this;

        scope = scope || self;

        function wrappedListener() {
            listener.apply(scope, arguments);
        }

        if (Stimuli.core.Support.documentAddEventListener) {
            self.element.addEventListener(type, wrappedListener, false);
        } else {
            self.element.attachEvent('on' + type, wrappedListener);
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
            self.element.removeEventListener(type, wrappedListener, false);
        } else {
            self.element.detachEvent('on' + type, wrappedListener);
        }
    };

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