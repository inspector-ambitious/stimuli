'use strict';

define(['domino', 'utils/object', 'mixins/observable'], function(Domino) {
        
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
    
    
    // private    
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
 
    return Domino;
});