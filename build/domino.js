/*! domino - v0.0.1 - 2013-09-11 */
'use strict';

// Source: src/domino.js

/**
 * Creates an instance of Domino
 * @constructor
 * @param {Object} options
 * @return {Domino} Fresh Domino instance
 */

var Domino = function(options) {};

/**
 * @namespace Domino.mixins
 */

Domino.mixins = {};

/**
 * @namespace Domino.utils
 */
 
Domino.utils = {};

// Source: src/utils/object.js

/**
 * Various utilities to work with Objects.
 * @namespace Object
 * @memberof Domino.utils
 */

Domino.utils.Object = {
    /** @lends Domino.utils.Object */
    
    /**
     * Merge objects properties.     
     * @param {Object} dest The destination object
     * @param {Object} src The source object
     * @returns {Object} dest
     */
    merge: function(dest, src) {
        if (!src) {
            return dest;
        }
        for (var prop in src) {
            if (src.hasOwnProperty(prop)) {
                dest[prop] = src[prop];
            }
        }

        return dest;
    }

};

// Source: src/mixins/observable.js

/**
* This mixin allows Objects to subscribe and publish events. 
* @mixin
* @memberof Domino.mixins
*/

Domino.mixins.Observable = {
    
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

// Source: src/utils/scheduler.js

(function() {
        
    /**
     * This class allows to schedule events.
     * @constructor
     * @mixes Domino.mixins.Observable
     * @memberof Domino.utils
     * @param {Object} options
     * @returns {Scheduler}
     */

    Domino.utils.Scheduler = function(options) {
        this.options = options;
        this.queue = [];
        this.locked = false;
    };
    
    // Applies Observable mixin
    Domino.utils.Object.merge(Domino.utils.Scheduler.prototype, Domino.mixins.Observable);

    /**
     * Receives data to emit.
     * @param {Object} data The data to emit.
     */

    Domino.utils.Scheduler.prototype.receive = function(data) {

        var me = this;

        me.queue.push(data);

        emit(me);

    };
    
    
    // Schedules emission of received data   
    function emit(me) {

        if (me.locked || me.queue.length === 0) {
            return;
        }

        me.locked = true;

        var data = me.queue.shift(),
            fn = data.callback || function() {};
    
        delete data.callback;
        
        var callback = function() {
            var args = Array.prototype.slice.call(arguments, 0);

            // asynchronous action callback
            if (fn.length > args.length) {
                // adding a function as last argument to allow the execution
                // of the next device action
                args.push(function() {
                    me.locked = false;
                    emit(me);
                });

                fn.apply(me, args);
            // synchronous action callback
            } else {
                fn.apply(me, args);
                me.locked = false;
                emit(me);
            }

        };
        
        setTimeout(function() {
            me.publish('emit', data, callback);
        }, me.options.speed * me.options.interval);
        
    }
 
})();