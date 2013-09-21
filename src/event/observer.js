'use strict';

/**
 * @class Stimuli.event.Observer
 * Allows to bind/unbind listeners to EventTargets.
 */

(function() {

    Stimuli.event.Observer = function(element) {

        this.element = element;

        this.listeners = {};
    };

    var Observer = Stimuli.event.Observer;

    Observer.prototype.subscribe = function(type, listener, scope) {
        var me = this;

        scope = scope || me;

        function wrappedListener() {
            listener.apply(scope, arguments);
        }

        if (Stimuli.browser.Support.documentAddEventListener) {
            me.element.addEventListener(type, wrappedListener, false);
        } else {
            me.element.attachEvent('on' + type, wrappedListener);
        }

        if (!me.listeners[type]) {
            me.listeners[type] = [];
        }

        me.listeners[type].push({
            type: type,
            listener: listener,
            wrappedListener: wrappedListener
        });
    };

    Observer.prototype.unsubscribe = function(type, listener) {
        var me = this,
            listeners = me.listeners[type],
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

        if (Stimuli.browser.Support.documentAddEventListener) {
            me.element.removeEventListener(type, wrappedListener, false);
        } else {
            me.element.detachEvent('on' + type, wrappedListener);
        }
    };

    Observer.prototype.unsubscribeAll = function() {
        var me = this,
            type,
            listeners;

        for (type in me.listeners) {
            if (me.listeners.hasOwnProperty(type)) {
                listeners = me.listeners[type];
                while (listeners[0]) {
                    me.unsubscribe(type, listeners[0].listener);
                }
            }
        }

    };

})();