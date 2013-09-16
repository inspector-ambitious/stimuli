'use strict';

/**
 * @class
 * Allows to bind/unbind listeners to dom elements.
 */

(function() {

    Stimuli.event.Binder = function(element) {
        if (typeof element === 'string') {
            element = Stimuli.$(element);
        }

        this.element = element;

        this.listeners = {};
    };

    var Binder = Stimuli.event.Binder;

    Binder.prototype.on = function(type, listener, scope) {
        var me = this;

        scope = scope || me;

        function wrappedListener() {
            listener.apply(scope, arguments);
        }

        if (Stimuli.core.Support.isModern) {
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

    Binder.prototype.off = function(type, listener) {
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

        if (Stimuli.core.Support.isModern) {
            me.element.removeEventListener(type, wrappedListener, false);
        } else {
            me.element.detachEvent('on' + type, wrappedListener);
        }
    };

    Binder.prototype.allOff = function() {
        var me = this,
            type,
            listeners;

        for (type in me.listeners) {
            if (me.listeners.hasOwnProperty(type)) {
                listeners = me.listeners[type];
                while (listeners[0]) {
                    me.off(type, listeners[0].listener);
                }
            }
        }

    };

})();