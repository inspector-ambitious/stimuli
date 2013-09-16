'use strict';

(function() {

    /**
     * This class allows to schedule events.
     * @constructor
     * @mixes Stimuli.core.Observable
     * @memberof Stimuli.core
     * @param {Object} options
     * @returns {Scheduler}
     */

    Stimuli.core.Scheduler = function(options) {
        this.options = options;
        this.queue = [];
        this.locked = false;
    };

    // Applies Observable mixin
    Stimuli.core.Object.merge(Stimuli.core.Scheduler.prototype, Stimuli.core.Observable);

    /**
     * Receives data to emit.
     * @param {Object} data The data to emit.
     */

    Stimuli.core.Scheduler.prototype.receive = function(data) {

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