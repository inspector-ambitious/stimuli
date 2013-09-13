/*! domino - v0.0.1 - 2013-09-13 */
'use strict';

// Source: src/domino.js

/**
 * Creates an instance of Domino
 * @constructor
 * @param {Object} options
 * @return {Domino} Fresh Domino instance
 */

var Domino = function(options) {

    this.devices = {};

    if (typeof Domino.device.Mouse !== 'undefined') {
        this.devices.mouse = new Domino.device.Mouse();
    }

};

Domino.prototype.getMouse = function() {
    return this.devices.mouse;
};

/**
 * @namespace Domino.core
 */

Domino.core = {};

/**
 * @namespace Domino.device
 */

Domino.device = {};

// Source: src/core/object.js

/**
 * Various utilities to work with Objects.
 * @namespace Object
 * @memberof Domino.core
 */

Domino.core.Object = {
    /** @lends Domino.core.Object */

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

// Source: src/core/observable.js

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

// Source: src/core/scheduler.js

(function() {

    /**
     * This class allows to schedule events.
     * @constructor
     * @mixes Domino.core.Observable
     * @memberof Domino.core
     * @param {Object} options
     * @returns {Scheduler}
     */

    Domino.core.Scheduler = function(options) {
        this.options = options;
        this.queue = [];
        this.locked = false;
    };

    // Applies Observable mixin
    Domino.core.Object.merge(Domino.core.Scheduler.prototype, Domino.core.Observable);

    /**
     * Receives data to emit.
     * @param {Object} data The data to emit.
     */

    Domino.core.Scheduler.prototype.receive = function(data) {

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

// Source: src/device/abstract.js

(function() {

    Domino.device.Abstract = {

        send: function(action, options, callback) {

            var me = this;

            callback = callback || function() {};

            if (typeof options === "undefined") {
                throw new Error(me.name + '.' + action + ' needs options as first argument.');
            }

            if (typeof callback === "undefined") {
                throw new Error(me.name + '.' + action + ' needs callback as second argument.');
            }

            me.publish('emit', {

                device: me.name,

                action: action,

                options: options,

                callback: callback

            });

            return this;
        }

    };

    Domino.core.Object.merge(Domino.device.Abstract, Domino.core.Observable);

})();

// Source: src/device/mouse.js

(function() {

    var Mouse = Domino.device.Mouse = function(options) {

        this.name = 'mouse';

    };


    Mouse.prototype.leftClick = function(options, callback) {
        return this.send('leftClick', options, callback);
    };

    Mouse.prototype.click = Mouse.prototype.leftClick;

    Mouse.prototype.rightClick = function(options, callback) {
        return this.send('rightClick', options, callback);
    };

    Mouse.prototype.context = Mouse.prototype.rightClick;

    Mouse.prototype.middleClick = function(options, callback) {
        return this.send('middleClick', options, callback);
    };

    // Extends Domino.Device.Abstract
    Domino.core.Object.merge(Mouse.prototype, Domino.device.Abstract);

})();