'use strict';

/**
 * @class Stimuli.core.Scheduler
 * @mixins Stimuli.core.Observable
 * @private
 * Provides a convenient way to "buffer" the emission of data.
 * @cfg {Number} speed The emission speed
 * @cfg {Number} interval The emission interval in ms
 * @constructor
 * Creates a new scheduler
 * @param {Object} config The config object
 */

(function() {

    Stimuli.core.Scheduler = function(options) {
        this.options = options || {
            speed: 1.0,
            interval: 1
        };
        this.queue = [];
        this.locked = false;
    };

    var Scheduler = Stimuli.core.Scheduler;

    // Applies Observable mixin
    Stimuli.core.Class.mix(Stimuli.core.Scheduler, Stimuli.core.Observable);

    /**
     * Receives data to emit.
     * @param {Object} data The data to emit.
     */
    Scheduler.prototype.schedule = function(data) {

        var me = this;

        me.queue.push(data);

        emit(me);

    };

    /**
     * @private
     * Schedules emission of received data   
     */
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
            me.publish('newframe', data, callback);
        }, me.options.speed * me.options.interval);

    }

})();