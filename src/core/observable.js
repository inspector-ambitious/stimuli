'use strict';

/**
* This mixin allows Objects to subscribe and publish events. 
* @mixin
* @memberof Domino.core
*/

Domino.core.Observable = {
    
    /**
     * Publishes an event.
     * @param {String} eventName The event name.
     * @param {...Misc=} data the data to be emitted. 
     * @param {Object=} options Options
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
     * Subscribes to an event.
     * @param {String} eventName The event name.
     * @param {Function} fn The listener to bind to the event. 
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
     * Subscribes to an event.
     * @param {String} eventName The event name.
     * @param {Function} fn The listener to bind to the event. 
     * @param {Object=} scope The listener execution scope.
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